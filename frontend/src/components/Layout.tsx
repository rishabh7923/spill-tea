import type { ReactNode } from "react"
import Topbar from "./Topbar"
import Container from "./Container"
import Bottombar from "./Bottombar"
import FloatingSidebar from "./FloatingSidebar"
import TrendingDiscussions from "./TrendingSection"
import { ScrollArea } from "./ui/scroll-area"

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="h-dvh flex flex-col">
            <Topbar />
            <Container>
                <div className='flex md:px-2 gap-6'>
                    <FloatingSidebar />
                    <ScrollArea className="max-h-[calc(100dvh-5.5rem)] md:max-h-[calc(100dvh-3.5rem)] border border-t-0 border-b-0  flex-1 w-full mx-auto">
                        {children}
                    </ScrollArea>
                    <TrendingDiscussions />
                </div>
            </Container>
            <Bottombar />
        </div>
    )
}

export default Layout
