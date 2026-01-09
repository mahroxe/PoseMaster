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
import CameraControls from './CameraControls'
import SceneSetup from './SceneSetup'

export default function Canvas3D() {
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
            >
                <CameraControls />
                <SceneSetup />
            </Canvas>
        </div>
    )
}
