# PoseMaster – Pose JSON Schema

## Version 1.0 Specification

### Full Schema

```json
{
  "version": "1.0",
  "rigType": "humanoid-v2",
  "metadata": {
    "author": "Artist Name",
    "createdAt": "2026-01-09T12:00:00Z",
    "description": "Standing neutral pose"
  },
  "bones": {
    "Hips": { "x": 0, "y": 0, "z": 0 },
    "Spine": { "x": 5, "y": 0, "z": 0 },
    "Chest": { "x": 0, "y": 0, "z": 0 },
    "Neck": { "x": 0, "y": 0, "z": 0 },
    "Head": { "x": 0, "y": 0, "z": 0 },
    "LeftShoulder": { "x": -10, "y": 0, "z": 0 },
    "LeftArm": { "x": 0, "y": 0, "z": 0 },
    "LeftForeArm": { "x": -45, "y": 0, "z": 0 },
    "LeftHand": { "x": 0, "y": 0, "z": 0 },
    "RightShoulder": { "x": -10, "y": 0, "z": 0 },
    "RightArm": { "x": 0, "y": 0, "z": 0 },
    "RightForeArm": { "x": -45, "y": 0, "z": 0 },
    "RightHand": { "x": 0, "y": 0, "z": 0 },
    "LeftUpLeg": { "x": 0, "y": 0, "z": 0 },
    "LeftLeg": { "x": 0, "y": 0, "z": 0 },
    "LeftFoot": { "x": 0, "y": 0, "z": 0 },
    "RightUpLeg": { "x": 0, "y": 0, "z": 0 },
    "RightLeg": { "x": 0, "y": 0, "z": 0 },
    "RightFoot": { "x": 0, "y": 0, "z": 0 }
  }
}
```

### Field Definitions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | string | ✅ | Semantic version (e.g., "1.0", "1.1", "2.0") |
| `rigType` | string | ✅ | Rig type (e.g., "humanoid-v2", "quadruped-v1") |
| `metadata.author` | string | ❌ | Artist name |
| `metadata.createdAt` | ISO 8601 | ❌ | Creation timestamp |
| `metadata.description` | string | ❌ | Pose description |
| `bones[name]` | object | ✅ | Bone rotation in Euler degrees |
| `bones[name].x` | number | ✅ | X rotation (-180 to 180) |
| `bones[name].y` | number | ✅ | Y rotation (-180 to 180) |
| `bones[name].z` | number | ✅ | Z rotation (-180 to 180) |

### Versioning Rules

- **1.0 → 1.1** (minor bump): New optional bones, new metadata fields
  - ✅ Backward compatible: Old 1.0 poses load in 1.1
  - ✅ Auto-migration: Missing bones default to {x:0, y:0, z:0}

- **1.0 → 2.0** (major bump): Breaking rig changes
  - ❌ Not backward compatible
  - 🔧 Migration script required: `migrate-v1-to-v2.ts`

### Validation (Zod Schema)

```typescript
import { z } from 'zod'

export const PoseSchema = z.object({
  version: z.string().regex(/^\d+\.\d+$/),
  rigType: z.string(),
  metadata: z.object({
    author: z.string().optional(),
    createdAt: z.string().datetime().optional(),
    description: z.string().optional(),
  }).optional(),
  bones: z.record(
    z.object({
      x: z.number().min(-180).max(180),
      y: z.number().min(-180).max(180),
      z: z.number().min(-180).max(180),
    })
  ),
})
```

### Migration Example (v1 → v2)

```typescript
export function migrateV1toV2(poseV1: any): Pose {
  // Example: Rename "RightArm" → "RightUpperArm", add "RightLowerArm"
  const poseV2 = {
    version: '2.0',
    rigType: 'humanoid-v2-extended',
    bones: {
      ...poseV1.bones,
      RightUpperArm: poseV1.bones.RightArm,
      RightLowerArm: { x: 0, y: 0, z: 0 }, // Default
    },
  }
  delete poseV2.bones.RightArm // Remove old key
  return poseV2
}
```

## Standard Bone Naming

See [BONE_NAMING.md](BONE_NAMING.md) for humanoid skeleton standard.
