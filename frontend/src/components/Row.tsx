import clsx from 'clsx'
import type { ReactNode } from 'react'

function Row({ className, children }: { className?: string, children: ReactNode }) {
    return (
        <div className={clsx("flex gap-2", className)}>
            {children}
        </div>
    )
}

export default Row