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
 * PoseMaster – src/components/ui/slider.tsx
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

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> { }

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
    ({ className = '', ...props }, ref) => (
        <input
            ref={ref}
            type="range"
            className={`w-full ${className}`}
            {...props}
        />
    ),
)
Slider.displayName = 'Slider'

export { Slider }
