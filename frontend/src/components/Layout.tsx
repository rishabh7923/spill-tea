import type { ReactNode } from "react"
import Topbar from "./Topbar"
import Container from "./Container"
import FloatingSidebar from "./FloatingSidebar"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { Link } from "react-router-dom"

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="h-vh">
            <Topbar />
            <Container>
                <div className='flex md:px-2 gap-6'>
                    <FloatingSidebar />
                    <div className="p-2 border-t-0 border-b-0  flex-1 w-full mx-auto">
                        {children}
                    </div>
                </div>
            </Container>
            {/* <Bottombar /> */}
            <Button className="fixed md:hidden bottom-4 right-4" size="icon">
                <Link to="/create">
                    <Plus />
                </Link>
            </Button>
        </div>
    )
}

export default Layout
