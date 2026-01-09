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
PoseMaster – vite.config.ts checklist

☐ Vite configured for React + TS
☐ Alias support (@/src → src/)
☐ Optimized for Three.js bundling (no minification issues)
☐ No production hacks or environment leaks
☐ Supports .glb/.gltf asset imports
*/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.fbx'],
})
