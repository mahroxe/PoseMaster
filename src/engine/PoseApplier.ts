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
 * PoseMaster – src/engine/PoseApplier.ts
 * 
 * ~~☐ Applies versioned pose JSON to bones~~
 * ~~☐ Handles Euler angle normalization (-180° to 180°)~~
 * ☐ Validates rig compatibility
 * ☐ No state management
 * ☐ Pure function: (pose, skeleton) → void
 */

import * as THREE from 'three'
import { Pose } from '@/types/pose'
import { normalizeAngle } from '@/utils/math'

export interface PoseApplicationResult {
  success: boolean
  appliedBones: number
  failedBones: string[]
  warnings: string[]
}

export class PoseApplier {
  /**
   * Apply pose JSON to bones with validation
   */
  static applyPose(pose: Pose, bones: Map<string, THREE.Bone>): PoseApplicationResult {
    const result: PoseApplicationResult = {
      success: true,
      appliedBones: 0,
      failedBones: [],
      warnings: [],
    }

    Object.entries(pose.bones).forEach(([boneName, rotation]) => {
      const bone = bones.get(boneName)
      if (!bone) {
        result.failedBones.push(boneName)
        result.warnings.push(`Bone not found in rig: ${boneName}`)
        return
      }

      try {
        PoseApplier.applyBoneRotation(bone, rotation)
        result.appliedBones++
      } catch (error) {
        result.success = false
        result.failedBones.push(boneName)
        result.warnings.push(
          `Failed to apply rotation to ${boneName}: ${error instanceof Error ? error.message : 'unknown error'}`
        )
      }
    })

    return result
  }

  /**
   * Apply rotation to a single bone
   */
  private static applyBoneRotation(
    bone: THREE.Bone,
    rotation: { x: number; y: number; z: number }
  ): void {
    const euler = new THREE.Euler(
      THREE.MathUtils.degToRad(normalizeAngle(rotation.x)),
      THREE.MathUtils.degToRad(normalizeAngle(rotation.y)),
      THREE.MathUtils.degToRad(normalizeAngle(rotation.z)),
      'XYZ'
    )
    bone.quaternion.setFromEuler(euler)
  }

  /**
   * Get current bone rotations in Euler degrees
   */
  static getBoneRotations(bones: Map<string, THREE.Bone>): Record<string, { x: number; y: number; z: number }> {
    const rotations: Record<string, { x: number; y: number; z: number }> = {}

    bones.forEach((bone, name) => {
      const euler = new THREE.Euler().setFromQuaternion(bone.quaternion, 'XYZ')
      rotations[name] = {
        x: THREE.MathUtils.radToDeg(euler.x),
        y: THREE.MathUtils.radToDeg(euler.y),
        z: THREE.MathUtils.radToDeg(euler.z),
      }
    })

    return rotations
  }

  /**
   * Reset all bones to neutral rotation
   */
  static resetBones(bones: Map<string, THREE.Bone>): void {
    bones.forEach((bone) => {
      bone.quaternion.identity()
      bone.rotation.order = 'XYZ'
    })
  }

  /**
   * Blend between two poses
   */
  static blendPoses(
    poseA: Pose,
    poseB: Pose,
    bones: Map<string, THREE.Bone>,
    alpha: number = 0.5
  ): void {
    const clampedAlpha = Math.max(0, Math.min(1, alpha))

    Object.keys(poseA.bones).forEach((boneName) => {
      const bone = bones.get(boneName)
      if (!bone) return

      const rotA = poseA.bones[boneName]
      const rotB = poseB.bones[boneName]

      if (!rotB) {
        PoseApplier.applyBoneRotation(bone, rotA)
        return
      }

      // Blend Euler angles
      const blended = {
        x: rotA.x + (rotB.x - rotA.x) * clampedAlpha,
        y: rotA.y + (rotB.y - rotA.y) * clampedAlpha,
        z: rotA.z + (rotB.z - rotA.z) * clampedAlpha,
      }

      PoseApplier.applyBoneRotation(bone, blended)
    })
  }
}
