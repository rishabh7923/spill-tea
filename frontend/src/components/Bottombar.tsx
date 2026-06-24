import { HeartPlus, Home, Laugh, NewspaperIcon, Plus } from "lucide-react"
import { Button } from "./ui/button"
import { usePostEditor } from "@/features/post/create-edit-post/PostEditorProvider"
import { Link } from "react-router-dom";

function Bottombar() {
    const { openCreate } = usePostEditor();
    return (
        <div className="md:hidden h-10 jutify-self-end bg-background">
            <div className="flex justify-around">
                <Button variant="ghost" size="icon">
                    <Link to="/">
                        <Home />
                    </Link>
                </Button>
                <Button variant="ghost" size="icon">
                    <HeartPlus />
                </Button>
                <div>
                    <Button className="h-10 w-10 rounded-full relative -top-1/2 z-10" size="icon" onClick={openCreate}>
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
    )
}

export default Bottombar