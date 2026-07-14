import type { ReactNode } from "react"
import Topbar from "./Topbar"
import Container from "./Container"
import FloatingSidebar from "./FloatingSidebar"
import Row from "./Row"

function Layout({ children }: { children: ReactNode }) {

    return (
        <div>
            <Topbar />
            <Container>
                <Row className="gap-16 mt-2 md:mt-4">
                    <FloatingSidebar />
                    <div className="grow">
                        {children}
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default Layout
