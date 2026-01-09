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
 * PoseMaster – src/types/export.ts
 * 
 * ☐ Pure TypeScript interfaces/types only
 * ☐ No logic, no functions
 * ☐ Shared across engine, store, export
 * ☐ Versioned where applicable (e.g., pose)
 */

export type ExportFormat = 'png' | 'depth' | 'normal' | 'openpose' | 'json'

export interface ExportOptions {
  format: ExportFormat
  width: number
  height: number
  quality?: number
  lockCamera?: boolean
  includeGrid?: boolean
  includeReferenceImages?: boolean
}

export interface ExportResult {
  format: ExportFormat
  data: Blob | string
  timestamp: string
}
