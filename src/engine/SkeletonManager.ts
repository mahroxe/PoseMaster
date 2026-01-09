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
 * PoseMaster – src/engine/SkeletonManager.ts
 * 
 * ~~☐ Parses SkinnedMesh from GLB~~
 * ~~☐ Extracts bone hierarchy~~
 * ☐ Normalizes bone names via alias registry
 * ☐ Exposes bone transform interface
 * ☐ No rendering or animation logic
 */

import * as THREE from 'three'
import { normalizeBoneName } from '@/types/bone'

export interface BoneInfo {
  name: string
  normalizedName: string
  index: number
  parent: THREE.Bone | null
}

export class SkeletonManager {
  private skeleton: THREE.Skeleton | null = null
  private bones: Map<string, THREE.Bone> = new Map()
  private normalizedBones: Map<string, THREE.Bone> = new Map()
  private boneInfo: BoneInfo[] = []

  loadFromMesh(mesh: THREE.SkinnedMesh): void {
    this.skeleton = mesh.skeleton
    this.extractBones()
  }

  private extractBones(): void {
    if (!this.skeleton) return

    this.bones.clear()
    this.normalizedBones.clear()
    this.boneInfo = []

    this.skeleton.bones.forEach((bone: THREE.Bone, index: number) => {
      const normalized = normalizeBoneName(bone.name)
      
      this.bones.set(bone.name, bone)
      this.normalizedBones.set(normalized, bone)

      this.boneInfo.push({
        name: bone.name,
        normalizedName: normalized,
        index,
        parent: bone.parent as THREE.Bone | null,
      })
    })
  }

  /**
   * Get bone by original name
   */
  getBone(name: string): THREE.Bone | undefined {
    return this.bones.get(name)
  }

  /**
   * Get bone by normalized name
   */
  getBoneByNormalizedName(name: string): THREE.Bone | undefined {
    return this.normalizedBones.get(name)
  }

  /**
   * Get all bones map
   */
  getBones(): Map<string, THREE.Bone> {
    return this.bones
  }

  /**
   * Get all bones by normalized names
   */
  getNormalizedBones(): Map<string, THREE.Bone> {
    return this.normalizedBones
  }

  /**
   * Get bone info (metadata)
   */
  getBoneInfo(): BoneInfo[] {
    return this.boneInfo
  }

  /**
   * Get skeleton
   */
  getSkeleton(): THREE.Skeleton | null {
    return this.skeleton
  }

  /**
   * Check if bone exists by original name
   */
  hasBone(name: string): boolean {
    return this.bones.has(name)
  }

  /**
   * Check if bone exists by normalized name
   */
  hasNormalizedBone(name: string): boolean {
    return this.normalizedBones.has(name)
  }

  /**
   * Get bone parent
   */
  getBoneParent(boneName: string): THREE.Bone | null {
    const bone = this.bones.get(boneName)
    return bone?.parent as THREE.Bone | null || null
  }

  /**
   * Get all child bones of a bone
   */
  getBoneChildren(boneName: string): THREE.Bone[] {
    const bone = this.bones.get(boneName)
    if (!bone) return []
    
    const children: THREE.Bone[] = []
    bone.children.forEach((child) => {
      if (child instanceof THREE.Bone) {
        children.push(child)
      }
    })
    return children
  }

  /**
   * Get bone hierarchy depth
   */
  getBoneHierarchyDepth(boneName: string): number {
    let depth = 0
    let bone = this.bones.get(boneName)
    while (bone?.parent && bone.parent instanceof THREE.Bone) {
      depth++
      bone = bone.parent
    }
    return depth
  }
}
