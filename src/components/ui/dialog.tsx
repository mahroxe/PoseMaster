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
 * PoseMaster – src/components/ui/dialog.tsx
 * 
 * ☐ Headless UI component (no built-in styling)
 * ☐ Accessible by default (ARIA, keyboard nav)
 * ☐ No Three.js imports
 * ☐ No Zustand usage
 * ☐ Stateless or fully controlled via props
 * ☐ Reusable across app contexts
 * ☐ Follows shadcn/ui composition pattern
 */

import React from 'react'

export interface DialogProps extends React.DialogHTMLAttributes<HTMLDialogElement> { }

const Dialog = React.forwardRef<HTMLDialogElement, DialogProps>(
    ({ className = '', ...props }, ref) => (
        <dialog
            ref={ref}
            className={`backdrop:bg-black/50 rounded-lg p-4 ${className}`}
            {...props}
        />
    ),
)
Dialog.displayName = 'Dialog'

export { Dialog }
