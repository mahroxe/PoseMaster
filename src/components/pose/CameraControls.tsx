/**
 * PoseMaster – File Responsibility Checklist
 *
 * ☐ This file has a single responsibility
 * ☐ This file does NOT leak responsibilities from other layers
 * ☐ This file avoids circular dependencies
 * ☐ This file follows project architecture rules
 * ☐ Items below are struck-through when implemented
 */

/**
 * PoseMaster – src/components/pose/CameraControls.tsx
 * 
 * ✓ OrbitControls wrapper
 * ✓ Syncs cameraStore ↔ CameraManager
 * ✓ No pose or model logic
 * ✓ No rendering
 */

import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { PerspectiveCamera } from 'three'
import { OrbitControls } from '@react-three/drei'
import { useCameraStore } from '@/store/cameraStore'

export default function CameraControls() {
    const { gl, camera } = useThree()
    const orbitRef = useRef(null)

    const {
        position,
        target,
        fov,
        orbitLocked,
        setPosition,
        setTarget,
        setFOV
    } = useCameraStore()

    // Initialize camera position from store
    useEffect(() => {
        camera.position.set(position.x, position.y, position.z)
        camera.lookAt(target.x, target.y, target.z)
        if (camera instanceof PerspectiveCamera) {
            camera.fov = fov
            camera.updateProjectionMatrix()
        }
    }, [])

    // Sync store changes to camera
    useEffect(() => {
        camera.position.set(position.x, position.y, position.z)
        camera.updateProjectionMatrix()
    }, [position, camera])

    useEffect(() => {
        camera.lookAt(target.x, target.y, target.z)
    }, [target, camera])

    useEffect(() => {
        if (camera instanceof PerspectiveCamera) {
            camera.fov = fov
            camera.updateProjectionMatrix()
        }
    }, [fov, camera])

    // Sync camera changes to store via OrbitControls
    const handleChange = () => {
        if (orbitRef.current) {
            const { x, y, z } = camera.position
            setPosition(x, y, z)

            const targetVec = (orbitRef.current as any).target
            setTarget(targetVec.x, targetVec.y, targetVec.z)
            if (camera instanceof PerspectiveCamera) {
                setFOV(camera.fov)
            }
        }
    }

    return (
        <OrbitControls
            ref={orbitRef}
            args={[camera, gl.domElement]}
            enabled={!orbitLocked}
            onChange={handleChange}
        />
    )
}
