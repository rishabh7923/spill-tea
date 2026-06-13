import { Dialog } from "@/components/ui/dialog";
import CreateEditPostForm from "./CreateEditPostForm"
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { usePostEditor } from "./PostEditorProvider"

export default function EditCreatePost() {
    const { open, setOpen, mode } = usePostEditor();
    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogContent className="p-0 overflow-hidden flex! flex-col! gap-2 max-h-[90vh] max-w-[95vw]" >

                <DialogHeader className="border-b px-6 py-4">
                    <DialogTitle>
                        {mode === "edit" ? "Edit" : "Create"} Post
                    </DialogTitle>
                </DialogHeader>
                <CreateEditPostForm />
            </DialogContent >
        </Dialog>
    )
}