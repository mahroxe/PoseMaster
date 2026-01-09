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
 * PoseMaster – src/components/ui/button.tsx
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

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', ...props }, ref) => (
        <button
            ref={ref}
            className={`px-4 py-2 rounded bg-primary text-foreground hover:opacity-90 ${className}`}
            {...props}
        />
    ),
)
Button.displayName = 'Button'

export { Button }
