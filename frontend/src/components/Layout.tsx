import type { ReactNode } from "react"
import Topbar from "./Topbar"
import Container from "./Container"
import Bottombar from "./Bottombar"
import FloatingSidebar from "./FloatingSidebar"
import TrendingDiscussions from "./TrendingSection"
import { ScrollArea } from "./ui/scroll-area"

function Layout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Topbar />
            <Container>
                <div className='flex md:px-2 gap-6'>
                    <FloatingSidebar />
                    <ScrollArea className="max-h-screen flex-1 w-full mx-auto">
                        {children}
                    </ScrollArea>
                    <TrendingDiscussions />
                </div>
                <Bottombar />
            </Container>
        </div>
    )
}

export default Layout
