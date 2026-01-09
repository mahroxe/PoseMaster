# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [0.0.1] – 2026-01-09

### Added
- Initial project scaffolding (Phase 0.0)
- Complete folder structure with checklist comments
- Configuration files (vite, tsconfig, tailwind, postcss)
- Entry point and placeholder pages
- **Phase 0.1 – Engine Layer Isolation**:
  - ✅ SceneManager: Full Three.js scene management with lights, grid, reference images
  - ✅ CameraManager: Perspective camera with saved views, position/FOV/clip plane control
  - ✅ SkeletonManager: Bone extraction with normalization via alias registry
  - ✅ PoseApplier: Pose application with angle normalization, blending, reset
  - ✅ AssetLoader: Asset loading stub (Phase 1 upgrade planned)
  - ✅ Unit tests: Comprehensive test suite for all engine managers (Vitest)
  - ✅ TypeScript strict mode enforced (no implicit any)
  - ✅ Export system skeleton
  - ✅ Type definitions and utilities
  - ✅ Documentation structure

### Status
- ✅ Phase 0.0 (Scaffolding) complete
- ✅ Phase 0.1 (Engine isolation) complete
- 🔄 Phase 0.2 (State layer isolation) pending
