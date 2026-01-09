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
 * PoseMaster – src/types/bone.ts
 * 
 * ☐ Pure TypeScript interfaces/types only
 * ☐ No logic, no functions
 * ☐ Shared across engine, store, export
 * ☐ Versioned where applicable (e.g., pose)
 */

export interface BoneAlias {
  standard: string
  variations: string[]
}

export const boneAliasRegistry: Record<string, BoneAlias> = {
  Hips: {
    standard: 'Hips',
    variations: ['mixamorig:Hips', 'Armature|Hips'],
  },
  Spine: {
    standard: 'Spine',
    variations: ['mixamorig:Spine', 'Armature|Spine'],
  },
  Chest: {
    standard: 'Chest',
    variations: ['mixamorig:Chest', 'Armature|Chest'],
  },
  Neck: {
    standard: 'Neck',
    variations: ['mixamorig:Neck', 'Armature|Neck'],
  },
  Head: {
    standard: 'Head',
    variations: ['mixamorig:Head', 'Armature|Head'],
  },
}

export function normalizeBoneName(name: string): string {
  for (const [standard, alias] of Object.entries(boneAliasRegistry)) {
    if (alias.variations.includes(name)) {
      return standard
    }
  }
  return name
}
