import { Globe, Home, Plus, Shapes } from "lucide-react"
import { Button } from "./ui/button"
import SideBarLink from "./SideBarLink"
import { usePostEditor } from "@/features/post/create-edit-post/PostEditorProvider"

function FloatingSidebar() {
    const { openCreate } = usePostEditor();
    return (
        <div className="hidden self-start sticky top-16 w-60 md:block md:top-18">
            <div className="flex-col gap-16 p-3 bg-sidebar border md:flex rounded-lg">
                <ul className="space-y-4">
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
                <div className="justify-self-end space-y-2">
                    <Button className='w-full' onClick={() => openCreate()}>
                        <Plus />
                        <span>
                            Create
                        </span>
                    </Button>
                </div>
            </div>

        </div>

    )
}


export default FloatingSidebar