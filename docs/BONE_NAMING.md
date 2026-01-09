# PoseMaster – Bone Naming Standard

## Humanoid Skeleton (Standard)

```
                    Head
                     |
              Neck---+---Neck
             /               \
    LeftShoulder           RightShoulder
           |                    |
        LeftArm              RightArm
           |                    |
       LeftForeArm         RightForeArm
           |                    |
        LeftHand             RightHand
           |
        Chest
           |
         Spine
           |
          Hips
          / \
    LeftUpLeg RightUpLeg
        |          |
     LeftLeg   RightLeg
        |          |
    LeftFoot   RightFoot
```

## Complete Bone List (Humanoid v2)

| Bone | Parent | Purpose |
|------|--------|---------|
| **Hips** | Root | Center of mass |
| **Spine** | Hips | Lower spine |
| **Chest** | Spine | Upper spine |
| **Neck** | Chest | Neck |
| **Head** | Neck | Head |
| **LeftShoulder** | Chest | Left shoulder joint |
| **LeftArm** | LeftShoulder | Left upper arm |
| **LeftForeArm** | LeftArm | Left forearm |
| **LeftHand** | LeftForeArm | Left hand |
| **RightShoulder** | Chest | Right shoulder joint |
| **RightArm** | RightShoulder | Right upper arm |
| **RightForeArm** | RightArm | Right forearm |
| **RightHand** | RightForeArm | Right hand |
| **LeftUpLeg** | Hips | Left thigh |
| **LeftLeg** | LeftUpLeg | Left shin |
| **LeftFoot** | LeftLeg | Left foot |
| **RightUpLeg** | Hips | Right thigh |
| **RightLeg** | RightUpLeg | Right shin |
| **RightFoot** | RightLeg | Right foot |

## Rig Alias Registry

When loading a GLB/FBX, the `SkeletonManager` normalizes rig-specific names using this registry:

```typescript
{
  "Hips": ["mixamorig:Hips", "Armature|Hips", "root"],
  "Spine": ["mixamorig:Spine", "Armature|Spine"],
  "Chest": ["mixamorig:Chest", "Armature|Chest"],
  "Neck": ["mixamorig:Neck", "Armature|Neck"],
  "Head": ["mixamorig:Head", "Armature|Head"],
  // ... full list in src/types/bone.ts
}
```

**Why this matters**: Users can apply a saved pose to different models with different naming conventions.

## OpenPose Keypoint Mapping

PoseMaster maps humanoid skeleton to OpenPose 25-keypoint format:

| Index | OpenPose Name | PoseMaster Bone |
|-------|---------------|-----------------|
| 0 | Nose | Head |
| 1 | Neck | Neck |
| 2-3 | Shoulders | LeftShoulder, RightShoulder |
| 4-5 | Elbows | LeftForeArm, RightForeArm |
| 6-7 | Wrists | LeftHand, RightHand |
| 8-9 | Hips | Hips (center) |
| 10-11 | Knees | LeftLeg, RightLeg |
| 12-13 | Ankles | LeftFoot, RightFoot |
| 14-21 | Hands (optional) | Hand bones × 8 |
| 22-24 | Ear, Eye (optional) | Head × 3 |

## Adding Custom Rigging Support

To support a new rig format (e.g., Rigify, Advanced Skeleton):

1. **Extract bone names** from sample GLB
2. **Add to alias registry** in `src/types/bone.ts`:
   ```typescript
   "Hips": [
     "mixamorig:Hips",
     "Armature|Hips",
     "root",
     "rig|hips",  // ← New
   ]
   ```
3. **Test with `PoseApplier`**: Load pose → apply → verify bone transforms
4. **Document in CHANGELOG.md**

## Testing Bone Names

```typescript
import { normalizeBoneName } from '@/types/bone'

test('should normalize Mixamo names', () => {
  expect(normalizeBoneName('mixamorig:Hips')).toBe('Hips')
  expect(normalizeBoneName('mixamorig:Spine')).toBe('Spine')
})
```
