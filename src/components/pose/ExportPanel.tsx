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
 * PoseMaster – src/components/pose/ExportPanel.tsx
 * 
 * ☐ Export UI only (resolution, format, preview)
 * ☐ Calls ExportManager methods on user action
 * ☐ No rendering or canvas logic
 * ☐ No Three.js imports
 */

export default function ExportPanel() {
    return (
        <div className="p-4">
            <p>ExportPanel placeholder – Phase 0.1</p>
        </div>
    )
}
