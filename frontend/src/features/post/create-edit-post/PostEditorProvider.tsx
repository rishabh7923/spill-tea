import type { Post } from "@/types/post"
import {
    createContext,
    useContext,
    useState,
} from "react"
import { useNavigate } from "react-router-dom"

type Mode = "create" | "edit" | ""

type PostEditorContextType = {
    mode: Mode
    editingPost: Post | null

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
    const [mode, setMode] =
        useState<Mode>("create")

    const navigate =
        useNavigate()

    const [editingPost, setEditingPost] =
        useState<Post | null>(null)

    const openCreate = () => {
        setMode("create")
        setEditingPost(null)
        navigate("/create")
    }

    const openEdit = (post: Post) => {
        setMode("edit")
        setEditingPost(post)
        navigate("/edit")

    }

    const closeEdit = () => {
        setEditingPost(null);
    }

    return (
        <PostEditorContext.Provider
            value={{
                mode,
                editingPost,
                openCreate,
                openEdit,
                closeEdit,
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