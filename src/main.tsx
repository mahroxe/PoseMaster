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
 * PoseMaster – src/main.tsx
 * 
 * ☐ React root created via createRoot
 * ☐ StrictMode enabled
 * ☐ Global styles imported (index.css)
 * ☐ No app logic here
 * ☐ No conditional rendering
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
