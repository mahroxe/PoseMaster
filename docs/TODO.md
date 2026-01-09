# PoseMaster – Development Checklist

**Living TODO list—strike through items as they're implemented. Never delete rows.**

## Phase 0: Foundation & Isolation ✅ (Complete)

### Phase 0.0 – Scaffolding

- ✅ Create complete folder structure
- ✅ Populate every file with checklist comments
- ✅ Install npm dependencies
- ✅ Verify project builds without errors
- ✅ Initialize git repo
- ✅ Create initial commit + push
- 🔄 **Current checkpoint**: Phase 1 – Pose Core (Load GLB model, extract skeleton, bind components)

### Phase 0.1 – Engine Layer Isolation ✅

- ✅ ~~Implement `SceneManager` with full Three.js setup~~
- ✅ ~~Implement `CameraManager` with orbit control foundation~~
- ✅ ~~Implement `SkeletonManager` bone parsing~~
- ✅ ~~Implement `PoseApplier` with Euler rotation logic~~
- ✅ ~~Verify engine compiles without React~~
- ✅ ~~Add unit tests for engine layer (28 tests)~~
- ✅ ~~Create commit: `engine: implement core managers`~~

### Phase 0.2 – State Layer Isolation ✅

- ✅ ~~Implement `poseStore` with undo/redo (Immer middleware)~~
- ✅ ~~Implement `cameraStore` with saved views (snapshots)~~
- ✅ ~~Implement `sceneStore` with props + reference images~~
- ✅ ~~Verify stores compile without Three.js~~
- ✅ ~~Add unit tests for store logic (28 tests)~~
- ✅ ~~Create commit: `store: implement Zustand stores`~~

### Phase 0.3 – UI Component Integration ✅

- ✅ ~~Implement `Canvas3D` with R3F setup~~
- ✅ ~~Implement `ControlPanel` with bone rotation sliders~~
- ✅ ~~Implement `CameraControls` syncing with cameraStore~~
- ✅ ~~Implement `SceneSetup` with lighting/background~~
- ✅ ~~Confirm engine compiles independently~~
- ✅ ~~Confirm stores compile independently~~
- ✅ ~~Confirm `npm run build` succeeds (142.95 KB)~~
- ✅ ~~Confirm zero TypeScript errors in source~~
- ✅ ~~All 56 tests passing (28 engine + 28 store)~~
- ✅ ~~Create commit: `feat: Phase 0.3 - UI component integration`~~

---

## Phase 1: Pose Core

- ☐ Load GLB model via `AssetLoader`
- ☐ Extract skeleton via `SkeletonManager`
- ☐ Apply versioned pose via `PoseApplier`
- ✅ ~~Build `ControlPanel` with bone rotation sliders~~ (Phase 0.3)
- ✅ ~~Bind R3F `Canvas3D` to pose/camera stores~~ (Phase 0.3)
- ☐ Implement `PoseLibrary` with preset loading
- ☐ Add pose validation (Zod schema)
- ☐ Create commit: `feat: implement pose core`

---

## Phase 2: Non-Destructive Scene

- ☐ Implement undo/redo history persistence
- ☐ Add reference image upload + 3D placement
- ☐ Add prop system (cube, chair, etc.)
- ☐ Implement "reset pose" (with undo)
- ☐ Implement "clear scene" (with undo)
- ☐ Add scene state serialization → JSON
- ☐ Create commit: `feat: implement non-destructive workflow`

---

## Phase 3: Export Engine

- ☐ Implement `ImageExporter` (PNG color pass)
- ☐ Implement `DepthExporter` (linear depth map)
- ☐ Implement `NormalExporter` (world-space normals)
- ☐ Implement `OpenPoseExporter` (JSON keypoints)
- ☐ Add resolution presets (1:1, 9:16, 4K, custom)
- ☐ Add multi-pass rendering pipeline
- ☐ Add export preview mode
- ☐ Create commit: `feat: implement export engine`

---

## Phase 4: UI Binding

- ☐ Complete `Canvas3D` with R3F mounting
- ☐ Complete `CameraControls` with OrbitControls
- ☐ Complete `ControlPanel` with full bone sliders
- ☐ Complete `ExportPanel` with format/resolution options
- ☐ Add camera gizmo + grid visualization
- ☐ Add model/prop selection highlighting
- ☐ Add responsive layout (desktop + tablet)
- ☐ Create commit: `feat: complete UI binding`

---

## Phase 5: Scalability & Polish

- ☐ Implement Dexie local DB for offline persistence
- ☐ Add performance profiling (frame rate, memory)
- ☐ Optimize Three.js rendering (frustum culling, LOD)
- ☐ Add Storybook for all UI components
- ☐ Add unit tests for engine, store, utils
- ☐ Add E2E tests for core workflows
- ☐ Optimize bundle size
- ☐ Create commit: `feat: add scalability & polish`

---

## Phase 6: Pro Tier

- ☐ Implement `IKSolver` (CCD algorithm)
- ☐ Implement `IKSolver` (FABRIK algorithm)
- ☐ Add animation timeline (FBX/GLB clip playback)
- ☐ Add cloud sync (Dexie → encrypted backend)
- ☐ Add AI pose suggestion (Vercel Edge Function)
- ☐ Add hand tracking integration
- ☐ Create commit: `feat: implement pro tier`

---

## Documentation

- ✅ `docs/ARCHITECTURE.md` – Layer separation + data flow
- ✅ `docs/POSE_SCHEMA.md` – Pose JSON v1.0 spec
- ✅ `docs/BONE_NAMING.md` – Standard skeleton + aliases
- ☐ `docs/SETUP.md` – Local development guide
- ☐ `docs/API.md` – Public API reference
- ☐ `docs/MIGRATION.md` – Pose version migration guide

---

## Deployment & Release

- ☐ Set up CI/CD pipeline (GitHub Actions)
- ☐ Configure production build
- ☐ Deploy to Vercel / Netlify
- ☐ Set up analytics
- ☐ Create release notes (v0.1.0)
- ☐ Public beta launch

---

## Long-term Roadmap

- 🚀 **v0.2**: IK solver + animation
- 🚀 **v0.3**: Cloud sync + collaboration
- 🚀 **v1.0**: Stable API + pro features
- 🚀 **v2.0**: WebGPU renderer backend
- 🚀 **v3.0**: Native Tauri desktop app
