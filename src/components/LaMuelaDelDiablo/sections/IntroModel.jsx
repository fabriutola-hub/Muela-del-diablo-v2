import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

export default function IntroModel() {
  const gltf = useGLTF('/imagenes/models/MuelaDelDiablo_v1.glb');
  
  useEffect(() => {
    console.log('✅ Modelo cargado');
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        console.log('🎨 Mesh:', child.name);
      }
    });
  }, [gltf]);
  
  return <primitive object={gltf.scene} />;
}

// Preload del modelo
useGLTF.preload('/imagenes/models/MuelaDelDiablo_v1.glb');
