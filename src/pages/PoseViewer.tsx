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
 * PoseMaster – src/pages/PoseViewer.tsx
 * 
 * ✓ Main application screen
 * ✓ Composes Canvas3D + ControlPanel + ExportPanel
 * ✓ Reads state from stores only
 * ✓ No direct Three.js logic
 * ✓ No engine instantiation beyond R3F binding
 */

import Canvas3D from '@/components/pose/Canvas3D'
import ControlPanel from '@/components/pose/ControlPanel'

export default function PoseViewer() {
    return (
        <div className="w-screen h-screen flex">
            {/* 3D Canvas - 70% width */}
            <div className="flex-1 bg-gray-950">
                <Canvas3D />
            </div>

            {/* Control Panel - 30% width */}
            <div className="w-80 bg-gray-900 border-l border-gray-700 overflow-y-auto">
                <div className="sticky top-0 bg-gray-800 px-4 py-3 border-b border-gray-700">
                    <h2 className="text-lg font-semibold text-white">Pose Control</h2>
                </div>
                <ControlPanel />
            </div>
        </div>
    )
}
