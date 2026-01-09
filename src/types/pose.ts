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
 * PoseMaster – src/types/pose.ts
 * 
 * ☐ Pure TypeScript interfaces/types only
 * ☐ No logic, no functions
 * ☐ Shared across engine, store, export
 * ☐ Versioned where applicable (e.g., pose)
 */

import { z } from 'zod'

export const BoneRotationSchema = z.object({
  x: z.number().min(-180).max(180),
  y: z.number().min(-180).max(180),
  z: z.number().min(-180).max(180),
})

export const PoseSchema = z.object({
  version: z.string().default('1.0'),
  rigType: z.string().default('humanoid-v2'),
  metadata: z.object({
    author: z.string().optional(),
    createdAt: z.string().datetime().optional(),
  }).optional(),
  bones: z.record(BoneRotationSchema),
})

export type BoneRotation = z.infer<typeof BoneRotationSchema>
export type Pose = z.infer<typeof PoseSchema>
