/**
 * PoseMaster – src/engine/__tests__/PoseApplier.test.ts
 * 
 * Unit tests for PoseApplier (no DOM required)
 */

import { describe, it, expect, beforeEach } from 'vitest'
import * as THREE from 'three'
import { PoseApplier } from '../PoseApplier'
import { Pose } from '@/types/pose'

describe('PoseApplier', () => {
  let bones: Map<string, THREE.Bone>

  beforeEach(() => {
    bones = new Map()
    
    // Create test bones
    const hipBone = new THREE.Bone()
    hipBone.name = 'Hips'
    
    const spineBone = new THREE.Bone()
    spineBone.name = 'Spine'
    
    const armBone = new THREE.Bone()
    armBone.name = 'LeftArm'

    bones.set('Hips', hipBone)
    bones.set('Spine', spineBone)
    bones.set('LeftArm', armBone)
  })

  it('should apply pose to bones', () => {
    const pose: Pose = {
      version: '1.0',
      rigType: 'humanoid-v2',
      bones: {
        Hips: { x: 0, y: 0, z: 0 },
        Spine: { x: 15, y: 0, z: 0 },
        LeftArm: { x: -45, y: 0, z: 0 },
      },
    }

    const result = PoseApplier.applyPose(pose, bones)

    expect(result.success).toBe(true)
    expect(result.appliedBones).toBe(3)
    expect(result.failedBones.length).toBe(0)
  })

  it('should handle missing bones gracefully', () => {
    const pose: Pose = {
      version: '1.0',
      rigType: 'humanoid-v2',
      bones: {
        Hips: { x: 0, y: 0, z: 0 },
        NonExistentBone: { x: 45, y: 0, z: 0 },
      },
    }

    const result = PoseApplier.applyPose(pose, bones)

    expect(result.appliedBones).toBe(1)
    expect(result.failedBones).toContain('NonExistentBone')
    expect(result.warnings.length).toBeGreaterThan(0)
  })

  it('should normalize angles', () => {
    const pose: Pose = {
      version: '1.0',
      rigType: 'humanoid-v2',
      bones: {
        Hips: { x: 360, y: -180, z: 720 },
        Spine: { x: 0, y: 0, z: 0 },
      },
    }

    const result = PoseApplier.applyPose(pose, bones)
    expect(result.success).toBe(true)
  })

  it('should get bone rotations', () => {
    const pose: Pose = {
      version: '1.0',
      rigType: 'humanoid-v2',
      bones: {
        Hips: { x: 0, y: 0, z: 0 },
        Spine: { x: 30, y: 45, z: 60 },
        LeftArm: { x: -45, y: 0, z: 0 },
      },
    }

    PoseApplier.applyPose(pose, bones)
    const rotations = PoseApplier.getBoneRotations(bones)

    expect(rotations.Spine).toBeDefined()
    expect(rotations.LeftArm).toBeDefined()
  })

  it('should reset bones to neutral', () => {
    const pose: Pose = {
      version: '1.0',
      rigType: 'humanoid-v2',
      bones: {
        Hips: { x: 45, y: 90, z: 135 },
        Spine: { x: 30, y: 45, z: 60 },
        LeftArm: { x: -45, y: -90, z: -135 },
      },
    }

    PoseApplier.applyPose(pose, bones)
    PoseApplier.resetBones(bones)

    bones.forEach((bone) => {
      expect(bone.quaternion.x).toBeCloseTo(0, 5)
      expect(bone.quaternion.y).toBeCloseTo(0, 5)
      expect(bone.quaternion.z).toBeCloseTo(0, 5)
      expect(bone.quaternion.w).toBeCloseTo(1, 5)
    })
  })

  it('should blend between two poses', () => {
    const poseA: Pose = {
      version: '1.0',
      rigType: 'humanoid-v2',
      bones: {
        Hips: { x: 0, y: 0, z: 0 },
        Spine: { x: 0, y: 0, z: 0 },
        LeftArm: { x: 0, y: 0, z: 0 },
      },
    }

    const poseB: Pose = {
      version: '1.0',
      rigType: 'humanoid-v2',
      bones: {
        Hips: { x: 0, y: 0, z: 0 },
        Spine: { x: 90, y: 0, z: 0 },
        LeftArm: { x: -90, y: 0, z: 0 },
      },
    }

    // Blend halfway
    PoseApplier.blendPoses(poseA, poseB, bones, 0.5)
    const rotations = PoseApplier.getBoneRotations(bones)

    expect(rotations.Spine.x).toBeCloseTo(45, 1) // halfway between 0 and 90
    expect(rotations.LeftArm.x).toBeCloseTo(-45, 1) // halfway between 0 and -90
  })

  it('should handle pose blending with missing bones', () => {
    const poseA: Pose = {
      version: '1.0',
      rigType: 'humanoid-v2',
      bones: {
        Hips: { x: 0, y: 0, z: 0 },
        Spine: { x: 0, y: 0, z: 0 },
      },
    }

    const poseB: Pose = {
      version: '1.0',
      rigType: 'humanoid-v2',
      bones: {
        Hips: { x: 0, y: 0, z: 0 },
        Spine: { x: 90, y: 0, z: 0 },
      },
    }

    expect(() => PoseApplier.blendPoses(poseA, poseB, bones, 0.5)).not.toThrow()
  })
})
