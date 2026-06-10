import { Globe, Home, Plus, Shapes } from "lucide-react"
import { Button } from "./ui/button"
import SideBarLink from "./SideBarLink"
import { usePostEditor } from "@/features/post/create-edit-post/PostEditorProvider"

function FloatingSidebar() {
    const { openCreate } = usePostEditor();
    return (
        <div className="hidden mt-2 w-60 self-start sticky top-20 h-auto md:block">
            <div className="bg-popover md:flex flex-col gap-16 rounded-lg border">
                <ul className="p-2 lg:p-4 space-y-4">
                    <SideBarLink to="/">
                        <Home /> Home
                    </SideBarLink>
                    <SideBarLink to="/explore">
                        <Globe />Explore
                    </SideBarLink>
                    <SideBarLink to="/communities">
                        <Shapes /> Communities
                    </SideBarLink>
                </ul>
                <div className="justify-self-end p-2 space-y-2">
                    <Button className='w-full  rounded-full' onClick={()=> openCreate()}>
                        <Plus />
                        <span>
                            Create
                        </span>
                    </Button>
                </div>
            </div>
            <div className="hidden px-3 py-2 bg-popover space-y-4 md:block mt-8 rounded-lg border">
                <h3 className="font-medium tracking-wide uppercase text-base">Spill pro</h3>
                <p className="text-sm text-foreground">Unlock advanced features and multiple image uploads.</p>
                <Button className="w-full">Upgrade</Button>
            </div>
        </div>

    )
}


export default FloatingSidebar