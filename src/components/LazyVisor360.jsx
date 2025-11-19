import { lazy, Suspense, memo } from 'react';

// ===== CONSTANTS =====
const LOADING_CONFIG = {
  containerHeight: 'h-[600px]',
  spinnerSize: 'w-20 h-20',
  animationDuration: 'animate-spin',
};

// ===== COMPONENTS =====

/**
 * Loading fallback component for 360° viewer
 * Provides visual feedback while the viewer is loading
 */
const VisorFallback = memo(() => (
  <div 
    className={`w-full ${LOADING_CONFIG.containerHeight} bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-2xl flex flex-col items-center justify-center backdrop-blur-sm border border-white/10`}
    role="status"
    aria-label="Cargando visor 360"
  >
    <div className="text-center space-y-6 px-6">
      {/* Animated spinner */}
      <div className="relative">
        <div 
          className={`${LOADING_CONFIG.spinnerSize} border-4 border-white/20 border-t-white rounded-full ${LOADING_CONFIG.animationDuration} mx-auto`}
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl" aria-hidden="true">🌐</span>
        </div>
      </div>
      
      {/* Loading text */}
      <div className="space-y-2">
        <p className="text-white/90 font-semibold text-lg animate-pulse">
          Cargando visor 360°...
        </p>
        <p className="text-white/50 text-sm">
          Preparando experiencia inmersiva
        </p>
      </div>
    </div>
  </div>
));
VisorFallback.displayName = 'VisorFallback';

/**
 * Error fallback component for failed 360° viewer loads
 * Provides retry functionality and user-friendly error message
 */
const VisorErrorFallback = memo(({ onRetry }) => (
  <div 
    className={`w-full ${LOADING_CONFIG.containerHeight} bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-2xl flex flex-col items-center justify-center backdrop-blur-sm border border-red-500/30`}
    role="alert"
    aria-live="assertive"
  >
    <div className="text-center space-y-6 px-6 max-w-md">
      {/* Error icon */}
      <div className="text-7xl animate-bounce">⚠️</div>
      
      {/* Error message */}
      <div className="space-y-3">
        <h3 className="text-white font-bold text-xl">
          Error al cargar el visor 360°
        </h3>
        <p className="text-white/70 text-base leading-relaxed">
          No se pudo cargar la experiencia inmersiva. Por favor, verifica tu conexión e intenta nuevamente.
        </p>
      </div>
      
      {/* Retry button */}
      <button 
        onClick={onRetry}
        className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2 mx-auto"
        aria-label="Reintentar carga del visor"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Reintentar
      </button>
    </div>
  </div>
));
VisorErrorFallback.displayName = 'VisorErrorFallback';

/**
 * Lazy loaded 360° viewer component with error handling
 * Implements dynamic import with comprehensive error recovery
 */
const Visor360 = lazy(() => 
  import('./VR360Viewer')
    .catch((error) => {
      console.error('Error al cargar VR360Viewer:', error);
      
      // Return error component as fallback
      return {
        default: (props) => (
          <VisorErrorFallback 
            onRetry={() => window.location.reload()} 
          />
        )
      };
    })
);

/**
 * Main lazy wrapper for 360° viewer
 * Handles lazy loading with proper fallback states and error boundaries
 * 
 * @param {Object} props - Props to pass to the 360° viewer
 * @param {string} props.src - Source URL of the 360° image
 * @param {string} props.caption - Caption for the 360° view
 */
const LazyVisor360 = memo((props) => {
  return (
    <Suspense fallback={<VisorFallback />}>
      <Visor360 {...props} />
    </Suspense>
  );
});

LazyVisor360.displayName = 'LazyVisor360';

export default LazyVisor360;
