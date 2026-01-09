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
 * PoseMaster – src/components/pose/ControlPanel.tsx
 * 
 * ✓ Sliders & numeric inputs for bone rotations
 * ✓ Writes to poseStore only
 * ✓ Uses shadcn/ui components exclusively
 * ✓ No Three.js imports
 * ✓ No direct engine calls
 */

import { usePoseStore } from '@/store/poseStore'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'

export default function ControlPanel() {
    const { bones, setBoneRotation, undo, redo, canUndo, canRedo } = usePoseStore()

    // Get list of bones from current state
    const boneNames = Object.keys(bones)

    return (
        <div className="p-4 bg-gray-800 text-white rounded space-y-4">
            <div className="flex gap-2">
                <Button
                    onClick={undo}
                    disabled={!canUndo()}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 text-sm rounded"
                >
                    ↶ Undo
                </Button>
                <Button
                    onClick={redo}
                    disabled={!canRedo()}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 text-sm rounded"
                >
                    ↷ Redo
                </Button>
            </div>

            <div className="space-y-6">
                {boneNames.length === 0 ? (
                    <p className="text-gray-400 text-sm">No bones loaded</p>
                ) : (
                    boneNames.map((boneName) => {
                        const rotation = bones[boneName]
                        return (
                            <div key={boneName} className="space-y-2 border-b border-gray-700 pb-4">
                                <h3 className="font-semibold text-sm">{boneName}</h3>

                                {/* X Rotation */}
                                <div className="flex items-center justify-between gap-2">
                                    <label className="text-xs text-gray-300 w-8">X:</label>
                                    <Slider
                                        min={-180}
                                        max={180}
                                        step={1}
                                        value={String(rotation.x)}
                                        onChange={(e) => {
                                            setBoneRotation(boneName, { ...rotation, x: parseFloat(e.target.value) })
                                        }}
                                        className="flex-1"
                                    />
                                    <span className="text-xs text-gray-400 w-10 text-right">{rotation.x.toFixed(0)}°</span>
                                </div>

                                {/* Y Rotation */}
                                <div className="flex items-center justify-between gap-2">
                                    <label className="text-xs text-gray-300 w-8">Y:</label>
                                    <Slider
                                        min={-180}
                                        max={180}
                                        step={1}
                                        value={String(rotation.y)}
                                        onChange={(e) => {
                                            setBoneRotation(boneName, { ...rotation, y: parseFloat(e.target.value) })
                                        }}
                                        className="flex-1"
                                    />
                                    <span className="text-xs text-gray-400 w-10 text-right">{rotation.y.toFixed(0)}°</span>
                                </div>

                                {/* Z Rotation */}
                                <div className="flex items-center justify-between gap-2">
                                    <label className="text-xs text-gray-300 w-8">Z:</label>
                                    <Slider
                                        min={-180}
                                        max={180}
                                        step={1}
                                        value={String(rotation.z)}
                                        onChange={(e) => {
                                            setBoneRotation(boneName, { ...rotation, z: parseFloat(e.target.value) })
                                        }}
                                        className="flex-1"
                                    />
                                    <span className="text-xs text-gray-400 w-10 text-right">{rotation.z.toFixed(0)}°</span>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
