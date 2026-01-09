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
 * PoseMaster – src/types/camera.ts
 * 
 * ☐ Pure TypeScript interfaces/types only
 * ☐ No logic, no functions
 * ☐ Shared across engine, store, export
 * ☐ Versioned where applicable (e.g., pose)
 */

export interface CameraState {
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  fov: number
  near: number
  far: number
  aspect: number
}

export interface SavedView {
  name: string
  camera: CameraState
  createdAt: string
}
