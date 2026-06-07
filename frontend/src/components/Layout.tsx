import type { ReactNode } from "react"
import Topbar from "./Topbar"
import Container from "./Container"
import Bottombar from "./Bottombar"
import FloatingSidebar from "./FloatingSidebar"

function Layout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Topbar />
            <Container>
                <div className='top-16 relative flex md:px-2'>
                    <FloatingSidebar />
                    {children}
                </div>
                <Bottombar />
            </Container>
        </div>
    )
}

export default Layout
