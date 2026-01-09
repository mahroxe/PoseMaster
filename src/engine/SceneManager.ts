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
 * PoseMaster – src/engine/SceneManager.ts
 * 
 * ~~☐ Creates and owns Three.js Scene~~
 * ~~☐ Manages ambient/directional lights~~
 * ☐ Adds/removes reference images as planes
 * ☐ No React imports
 * ☐ No UI logic
 */

import * as THREE from 'three'

export interface SceneConfig {
  backgroundColor?: number
  ambientIntensity?: number
  directionalIntensity?: number
}

export class SceneManager {
  private scene: THREE.Scene
  private ambientLight: THREE.AmbientLight
  private directionalLight: THREE.DirectionalLight
  private gridHelper: THREE.GridHelper | null = null
  private referenceImages: Map<string, THREE.Mesh> = new Map()

  constructor(config: SceneConfig = {}) {
    const {
      backgroundColor = 0x1a1a1a,
      ambientIntensity = 0.8,
      directionalIntensity = 0.6,
    } = config

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(backgroundColor)

    // Ambient light for even illumination
    this.ambientLight = new THREE.AmbientLight(0xffffff, ambientIntensity)
    this.scene.add(this.ambientLight)

    // Directional light for depth/shadows
    this.directionalLight = new THREE.DirectionalLight(
      0xffffff,
      directionalIntensity
    )
    this.directionalLight.position.set(5, 10, 5)
    this.directionalLight.castShadow = true
    this.scene.add(this.directionalLight)
  }

  /**
   * Get the underlying Three.js Scene
   */
  getScene(): THREE.Scene {
    return this.scene
  }

  /**
   * Set scene background color
   */
  setBackgroundColor(color: number): void {
    this.scene.background = new THREE.Color(color)
  }

  /**
   * Get scene background color
   */
  getBackgroundColor(): THREE.Color | null {
    return this.scene.background instanceof THREE.Color ? this.scene.background : null
  }

  /**
   * Set ambient light intensity
   */
  setAmbientIntensity(intensity: number): void {
    this.ambientLight.intensity = Math.max(0, Math.min(1, intensity))
  }

  /**
   * Set directional light intensity
   */
  setDirectionalIntensity(intensity: number): void {
    this.directionalLight.intensity = Math.max(0, Math.min(1, intensity))
  }

  /**
   * Add grid helper to scene
   */
  addGridHelper(size: number = 10, divisions: number = 10): void {
    if (this.gridHelper) {
      this.scene.remove(this.gridHelper)
    }
    this.gridHelper = new THREE.GridHelper(size, divisions, 0x444444, 0x222222)
    this.scene.add(this.gridHelper)
  }

  /**
   * Remove grid helper
   */
  removeGridHelper(): void {
    if (this.gridHelper) {
      this.scene.remove(this.gridHelper)
      this.gridHelper = null
    }
  }

  /**
   * Add reference image as 3D plane
   */
  addReferenceImage(
    id: string,
    textureUrl: string,
    position: THREE.Vector3,
    scale: number = 1.0,
    opacity: number = 0.7
  ): void {
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(textureUrl, (texture) => {
      const geometry = new THREE.PlaneGeometry(texture.image.width, texture.image.height)
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
      })

      const plane = new THREE.Mesh(geometry, material)
      plane.position.copy(position)
      plane.scale.multiplyScalar(scale)
      plane.userData.referenceImageId = id

      this.scene.add(plane)
      this.referenceImages.set(id, plane)
    })
  }

  /**
   * Remove reference image by ID
   */
  removeReferenceImage(id: string): void {
    const image = this.referenceImages.get(id)
    if (image) {
      this.scene.remove(image)
      this.referenceImages.delete(id)
    }
  }

  /**
   * Update reference image properties
   */
  updateReferenceImage(
    id: string,
    updates: {
      position?: THREE.Vector3
      scale?: number
      opacity?: number
    }
  ): void {
    const image = this.referenceImages.get(id)
    if (!image) return

    if (updates.position) {
      image.position.copy(updates.position)
    }
    if (updates.scale !== undefined) {
      image.scale.setScalar(updates.scale)
    }
    if (updates.opacity !== undefined && image.material instanceof THREE.MeshBasicMaterial) {
      image.material.opacity = updates.opacity
    }
  }

  /**
   * Add custom mesh to scene
   */
  add(object: THREE.Object3D): void {
    this.scene.add(object)
  }

  /**
   * Remove custom mesh from scene
   */
  remove(object: THREE.Object3D): void {
    this.scene.remove(object)
  }

  /**
   * Clear all non-light objects from scene
   */
  clear(): void {
    const objectsToRemove: THREE.Object3D[] = []
    this.scene.traverse((child) => {
      if (!(child instanceof THREE.Light) && child !== this.scene) {
        objectsToRemove.push(child)
      }
    })
    objectsToRemove.forEach((obj) => this.scene.remove(obj))
    this.referenceImages.clear()
  }

  /**
   * Dispose scene and free resources
   */
  dispose(): void {
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose())
        } else {
          child.material.dispose()
        }
      }
    })
  }
}
