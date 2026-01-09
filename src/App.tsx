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
 * PoseMaster – src/App.tsx
 * 
 * ☐ App layout composition only
 * ☐ Routing container (if used later)
 * ☐ No Three.js code
 * ☐ No business logic
 * ☐ Only renders pages/
 */
import PoseViewer from './pages/PoseViewer'

function App() {
    return <PoseViewer />
}

export default App
