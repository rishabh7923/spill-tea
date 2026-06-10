import { Dialog } from "@/components/ui/dialog";
import CreateEditPostForm from "./CreateEditPostForm"
import { usePostEditor } from "./PostEditorProvider"

export default function EditCreatePost() {
    const { open, setOpen } = usePostEditor();
    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <CreateEditPostForm />
        </Dialog>
    )
}