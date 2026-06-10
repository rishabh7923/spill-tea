import { HeartPlus, Home, Laugh, NewspaperIcon, Plus } from "lucide-react"
import { Button } from "./ui/button"
import { usePostEditor } from "@/features/post/create-edit-post/PostEditorProvider"

function Bottombar() {
    const {openCreate} = usePostEditor();
    return (
        <div className='md:hidden relative top-16 h-10 border'>
            <div className="h-10 left-0 right-0 bottom-0 border-b-blue-800 fixed bg-background">
                <div className="flex justify-around">
                    <Button variant="ghost" size="icon">
                        <Home />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <HeartPlus />
                    </Button>
                    <div>
                        <Button className="h-10 w-10 rounded-full relative -top-1/2" size="icon" onClick={openCreate}>
                            <Plus />
                        </Button>
                    </div>
                    <Button variant="ghost" size="icon">
                        <Laugh />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <NewspaperIcon />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Bottombar