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
 * PoseMaster – src/engine/IK/constraints.ts
 * 
 * ☐ Joint limit definitions
 * ☐ Pole vector helpers
 * ☐ Pure data + utilities
 */

export interface JointLimit {
  min: { x: number; y: number; z: number }
  max: { x: number; y: number; z: number }
}

export const defaultLimits: Record<string, JointLimit> = {
  Shoulder: {
    min: { x: -90, y: -120, z: -45 },
    max: { x: 90, y: 120, z: 45 },
  },
  Elbow: {
    min: { x: 0, y: -90, z: 0 },
    max: { x: 180, y: 0, z: 0 },
  },
  Hip: {
    min: { x: -90, y: -45, z: -45 },
    max: { x: 90, y: 45, z: 45 },
  },
}
