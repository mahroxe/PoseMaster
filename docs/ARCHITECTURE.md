# PoseMaster – Architecture Overview

## Layer Separation

```
┌─────────────────────────────────────────────────────┐
│  React UI Layer (PoseViewer, ControlPanel, etc.)    │
│  - React Components                                   │
│  - Tailwind Styling                                   │
│  - User Input Handling                                │
└─────────────────────────────────────────────────────┘
           ↓ binds to ↓
┌─────────────────────────────────────────────────────┐
│  State Layer (@react-three/fiber Canvas3D)          │
│  - Zustand Stores (poseStore, cameraStore, etc.)    │
│  - Subscriptions → engine state sync                 │
│  - Immer-based undo/redo                             │
└─────────────────────────────────────────────────────┘
           ↓ commands ↓
┌─────────────────────────────────────────────────────┐
│  Engine Layer (/engine - Pure Three.js)             │
│  - SceneManager (Three.js Scene)                     │
│  - CameraManager (PerspectiveCamera)                 │
│  - SkeletonManager (Bone hierarchy)                  │
│  - PoseApplier (Rotations)                           │
│  - AssetLoader (GLB/FBX loading)                     │
└─────────────────────────────────────────────────────┘
           ↓ renders ↓
┌─────────────────────────────────────────────────────┐
│  Export System (/export - Headless rendering)       │
│  - ExportManager (Orchestrator)                      │
│  - ImageExporter (PNG)                               │
│  - DepthExporter (Depth maps)                        │
│  - NormalExporter (Normal maps)                      │
│  - OpenPoseExporter (JSON keypoints)                 │
└─────────────────────────────────────────────────────┘
```

## Data Flow

1. **User Input** → React Component → `usePoseStore`
2. **State Change** → Zustand notify → R3F Canvas listens
3. **Canvas Update** → Calls engine managers
4. **Engine Update** → Updates Three.js objects
5. **Export Request** → ExportManager queries state + engine
6. **Deterministic Output** → Headless rendering

## Key Rules

- ❌ **NO Three.js in React components**
- ❌ **NO React imports in /engine**
- ❌ **NO non-serializable objects in stores**
- ✅ **Pure Three.js logic in /engine**
- ✅ **Serializable state in stores**
- ✅ **Headless-compatible exporters**

## File Responsibilities

| File | Responsibility |
|------|-----------------|
| SceneManager | Own and manage Three.js Scene |
| CameraManager | Manage camera state (position, FOV, etc.) |
| SkeletonManager | Parse and expose bones from SkinnedMesh |
| PoseApplier | Apply pose JSON to bones |
| poseStore | Persist bone rotations + undo/redo |
| cameraStore | Persist camera state |
| sceneStore | Persist props, reference images, settings |
| ExportManager | Orchestrate multi-pass rendering |
| Canvas3D | Mount R3F scene and bind stores |
| ControlPanel | UI for bone manipulation |

## Testing Strategy

- **Engine tests**: No DOM, no React, pure functions
- **Store tests**: Zustand snapshots, immer verification
- **UI tests**: Storybook previews, interaction tests
- **Export tests**: Deterministic output validation
