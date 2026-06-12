import type { ReactNode } from "react"
import Topbar from "./Topbar"
import Container from "./Container"
import Bottombar from "./Bottombar"
import FloatingSidebar from "./FloatingSidebar"
import TrendingSection from "./TrendingSection"

function Layout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Topbar />
            <Container>
                <div className='top-16 relative flex md:px-2 gap-6'>
                    <FloatingSidebar />
                    <div className='flex-1 w-full mx-auto min-h-screen'>
                        {children}
                    </div>
                    <TrendingSection />
                </div>
                <Bottombar />
            </Container>
        </div>
    )
}

export default Layout
