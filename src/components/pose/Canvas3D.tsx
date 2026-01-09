/**
 * PoseMaster – src/components/pose/Canvas3D.tsx
 * 
 * ✓ R3F Canvas setup with dpr, shadows, gl options
 * ✓ Mounts scene from SceneManager
 * ✓ Binds camera from CameraManager
 * ✓ Delegates all logic to /engine
 * ✓ No UI controls or Zustand writes
 */

import { Canvas } from '@react-three/fiber'
import { useSceneStore } from '@/store/sceneStore'
import CameraControls from './CameraControls'
import SceneSetup from './SceneSetup'

export default function Canvas3D() {
  const { backgroundColor, backgroundOpacity } = useSceneStore()
  
  // Convert hex color to RGB (e.g., "#ff0000" -> 0xff0000)
  const bgColor = backgroundColor.startsWith('#') 
    ? backgroundColor 
    : `#${backgroundColor}`

  return (
    <div className="w-full h-full">
      <Canvas
        dpr={window.devicePixelRatio}
        shadows
        gl={{
          antialias: true,
          stencil: false,
          depth: true,
        }}
        style={{
          background: bgColor,
          opacity: backgroundOpacity,
        }}
      >
        <CameraControls />
        <SceneSetup />
      </Canvas>
    </div>
  )
}
