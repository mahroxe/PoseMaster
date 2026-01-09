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
 * PoseMaster – src/utils/math.ts
 * 
 * ☐ Pure functions only
 * ☐ No side effects
 * ☐ No external dependencies
 * ☐ Fully testable in isolation
 */

export function normalizeAngle(angle: number): number {
  let normalized = angle % 360
  if (normalized > 180) normalized -= 360
  if (normalized < -180) normalized += 360
  return normalized
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180
}

export function radiansToDegrees(radians: number): number {
  return (radians * 180) / Math.PI
}
