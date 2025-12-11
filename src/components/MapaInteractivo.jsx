import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import Map, { Source, Layer, NavigationControl, FullscreenControl, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

// Optimización: Memoizar estilos de capa fuera del componente
const geoJsonLayerStyle = {
  id: 'puntos-muela',
  type: 'circle',
  paint: {
    'circle-color': '#e63946', 
    'circle-radius': 8,
    'circle-stroke-width': 2,
    'circle-stroke-color': '#ffffff'
  }
};

// Estilos de mapa como constantes
const STYLE_2D = 'mapbox://styles/mapbox/streets-v12';
const STYLE_3D = 'mapbox://styles/mapbox/satellite-streets-v12';

export default function MapaInteractivo() {
  const mapRef = useRef(null);
  
  // 1. Detección de móvil para optimizaciones
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Chequeo inicial
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  const [viewState, setViewState] = useState({
    longitude: -68.05, 
    latitude: -16.565,
    zoom: 14.5, 
    pitch: 0, 
    bearing: 0 
  });

  const [is3D, setIs3D] = useState(false);
  const [clickedPoint, setClickedPoint] = useState(null);

  // Optimización: useCallback para evitar recrear funciones
  const toggleMapStyle = useCallback(() => {
    const nextIs3D = !is3D;
    setIs3D(nextIs3D);
    
    // Usar método de animación suave del mapa directamente
    if (mapRef.current) {
      mapRef.current.easeTo({
        pitch: nextIs3D ? 75 : 0,
        zoom: nextIs3D ? 15 : 14.5,
        duration: 1000
      });
    } else {
      setViewState(prev => ({
        ...prev,
        pitch: nextIs3D ? 75 : 0,
        zoom: nextIs3D ? 15 : 14.5
      }));
    }
  }, [is3D]);

  // Optimización: Manejar movimiento del mapa con useCallback
  const handleMove = useCallback((evt) => {
    setViewState(evt.viewState);
  }, []);

  // Optimización: useCallback para el manejador de clicks
  const handleMapClick = useCallback((event) => {
    setClickedPoint(null);
    
    if (event.features && event.features.length > 0) {
      const feature = event.features.find(f => f.layer.id === 'puntos-muela');
      if (feature) {
        setClickedPoint(feature);
      }
    }
  }, []);

  // Optimización: useCallback para cerrar popup
  const handleClosePopup = useCallback(() => {
    setClickedPoint(null);
  }, []);

  // Optimización: Memoizar configuración del terreno
  // En móvil usamos menos exageración para aligerar la carga visual si activan 3D
  const terrainConfig = useMemo(() => 
    is3D ? { source: 'mapbox-dem', exaggeration: isMobile ? 1.0 : 1.5 } : null,
    [is3D, isMobile]
  );

  // Optimización: Memoizar estilo del mapa
  const mapStyle = useMemo(() => 
    is3D ? STYLE_3D : STYLE_2D,
    [is3D]
  );

  // Optimización: Memoizar el contenido del popup
  const popupContent = useMemo(() => {
    if (!clickedPoint) return null;

    return (
      <div style={{ maxWidth: '200px' }}>
        {clickedPoint.properties.imagenUrl && (
          <img 
            src={clickedPoint.properties.imagenUrl} 
            alt={clickedPoint.properties.LUGAR} 
            className="w-full h-32 object-cover rounded-md"
            loading="lazy"
          />
        )}
        <h3 className="text-lg text-black font-bold my-2">
          {clickedPoint.properties.LUGAR}
        </h3>
        {clickedPoint.properties.descripcion && (
          <p className="text-xs text-gray-700 italic mb-2">
            {clickedPoint.properties.descripcion}
          </p>
        )}
        <p className="text-sm text-gray-700">
          <strong>Norte:</strong> {clickedPoint.properties.Norte}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Sur:</strong> {clickedPoint.properties.Sur}
        </p>
      </div>
    );
  }, [clickedPoint]);

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <Map
        ref={mapRef}
        {...viewState}
        onMove={handleMove}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle={mapStyle}
        style={{ width: '100%', height: '100%' }}
        maxPitch={85}
        terrain={terrainConfig}
        interactiveLayerIds={['puntos-muela']}
        onClick={handleMapClick}
        
        // --- OPTIMIZACIONES DE RENDIMIENTO ---
        // Desactiva antialias en móvil (gran mejora de FPS)
        antialias={!isMobile}
        // Permite scroll de página con 1 dedo, mapa con 2 dedos (UX estándar móvil)
        cooperativeGestures={true}
        // Evita recálculos al esconderse la barra del navegador móvil
        trackResize={!isMobile}
        // Renderizado asíncrono
        renderWorldCopies={false}
        // Reutilizar contexto WebGL
        reuseMaps
      >
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />

        {/* Fuente de relieve - solo cargar en modo 3D */}
        {is3D && (
          <Source
            id="mapbox-dem"
            type="raster-dem"
            url="mapbox://mapbox.mapbox-terrain-dem-v1"
            tileSize={512}
            maxzoom={14}
          />
        )}

        {/* Fuente de puntos */}
        <Source 
          id="muela-geojson" 
          type="geojson" 
          data="/data/puntos_muela.geojson"
          generateId={true}
        >
          <Layer {...geoJsonLayerStyle} />
        </Source>

        {/* Popup optimizado */}
        {clickedPoint && (
          <Popup
            longitude={clickedPoint.geometry.coordinates[0]}
            latitude={clickedPoint.geometry.coordinates[1]}
            onClose={handleClosePopup}
            closeOnClick={false}
            anchor="bottom"
            maxWidth="220px"
            offset={15}
          >
            {popupContent}
          </Popup>
        )}
      </Map>

      {/* Botón 2D/3D optimizado */}
      <button
        onClick={toggleMapStyle}
        className="absolute top-5 left-5 z-10 px-4 py-2 bg-white text-[#1a3a5f] border-none rounded-full cursor-pointer font-semibold font-sans shadow-md hover:shadow-lg transition-shadow duration-200"
        style={{ willChange: 'box-shadow' }}
      >
        {is3D ? '🗺️ Ver en 2D' : '🌍 Ver en 3D'}
      </button>
    </div>
  );
}
