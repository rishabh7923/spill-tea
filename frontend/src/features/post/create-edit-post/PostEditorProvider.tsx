import type { Post } from "@/types/post"
import {
    createContext,
    useContext,
    useState,
} from "react"

type Mode = "create" | "edit" | ""

type PostEditorContextType = {
    open: boolean
    mode: Mode
    editingPost: Post | null

    setOpen: (open: boolean) => void
    openCreate: () => void
    openEdit: (post: Post) => void
    closeEdit: () => void
}

const PostEditorContext =
    createContext<
        PostEditorContextType | null
    >(null)

export function PostEditorProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [open, setOpen] =
        useState(false)

    const [mode, setMode] =
        useState<Mode>("create")

    const [editingPost, setEditingPost] =
        useState<Post | null>(null)

    const openCreate = () => {
        setMode("create")
        setEditingPost(null)
        setOpen(true)
    }

    const openEdit = (post: Post) => {
        setMode("edit")
        setEditingPost(post)
        setOpen(true)
    }

    const closeEdit = () => {
        setOpen(false);
        setMode("");
        setEditingPost(null);
    }

    return (
        <PostEditorContext.Provider
            value={{
                open,
                mode,
                editingPost,
                setOpen,
                openCreate,
                openEdit,
                closeEdit
            }}
        >
            {children}
        </PostEditorContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePostEditor() {
    const context = useContext(
        PostEditorContext
    )

    if (!context) {
        throw new Error(
            "usePostEditor must be used inside PostEditorProvider"
        )
    }

    return context
}