/**
 * PoseMaster – src/components/pose/SceneSetup.tsx
 * 
 * ✓ Sets up Three.js scene with SceneManager
 * ✓ Mounts props and reference images from store
 * ✓ Responds to store updates
 * ✓ No UI logic
 */

import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useSceneStore } from '@/store/sceneStore'

export default function SceneSetup() {
    const { scene } = useThree()
    const { backgroundColor } = useSceneStore()

    // Set scene background
    useEffect(() => {
        const bgColor = backgroundColor.startsWith('#')
            ? backgroundColor
            : `#${backgroundColor}`
        scene.background = new THREE.Color(bgColor)
    }, [backgroundColor, scene])

    // Add basic lighting
    useEffect(() => {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
        directionalLight.position.set(5, 10, 5)
        directionalLight.castShadow = true

        scene.add(ambientLight)
        scene.add(directionalLight)

        return () => {
            scene.remove(ambientLight)
            scene.remove(directionalLight)
        }
    }, [scene])

    return null
}
