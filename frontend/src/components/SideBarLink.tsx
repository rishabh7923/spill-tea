import type { ReactNode } from "react"
import { NavLink } from "react-router-dom"

function SideBarLink({ to, children }: { to: string, children: ReactNode }) {
    return (
        <li>
            <NavLink
                className={({ isActive }) =>
                    `
      block w-full rounded-lg p-2 transition-all duration-300
      ${isActive
                        ? "bg-(--sidebar-link-active) text-sidebar-foreground font-medium"
                        : "text-muted-foreground hover:bg-(--sidebar-link-hover) hover:text-sidebar-foreground"
                    }
    `
                }
                to={to}
            >
                <div className="flex items-center gap-2 h-6">
                    {children}
                </div>
            </NavLink>
        </li>
    )
}

export default SideBarLink