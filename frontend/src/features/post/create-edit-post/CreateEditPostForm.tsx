import React, { useEffect } from 'react'
import { useRef, useState } from "react"
import { X } from "lucide-react"
import DOMPurify from "dompurify";

import { Button } from "@/components/ui/button"
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import AddImage from "./AddImage"
import useNavigateToLogin from "@/features/auth/useNavigateToLogin"
import { usePostEditor } from './PostEditorProvider'
import SingleImageNotice from './SingleImageNotice'
import useCreatePost from '../hooks/useCreatePost'
import type { CreatePostSchema, PostImage } from '@/types/post'
import useEditPost from '../hooks/useEditPost';

const categories = [
    { value: 1, label: "Issue" },
    { value: 2, label: "Confession" },
    { value: 3, label: "Meme" },
    { value: 4, label: "Question" },
    { value: 5, label: "General" },
];
function CreateEditPostForm() {
    const [content, setContent] = useState<string>("");
    const [files, setFiles] = useState<File[]>([]);
    const [category, setCategory] = useState<string>("5");
    const navigateToLogin = useNavigateToLogin();
    const { closeEdit, mode, editingPost } = usePostEditor();
    const images = files.map(file => URL.createObjectURL(file));
    const editorRef = useRef<HTMLDivElement>(null);
    const { createPost, status: creating } = useCreatePost({ onSuccess: cleanup, onError: cleanup });
    const { editPost, status: editing } = useEditPost({ onSuccess: cleanup, onError: cleanup });
    const [exitingImages, setExistingImages] = useState<PostImage[]>([]);
    const [attachmentsToRemove, setAttachmentsToRemove] = useState<number[]>([]);
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
    });
    function createOrEdit() {
        navigateToLogin();
        const formData = new FormData()

        formData.append("content", content);
        formData.append("category_id", category);

        if (mode === "create") {
            if (files[0]) {
                formData.append("attachments", files[0]);
            }
            createPost(formData as unknown as CreatePostSchema);
        }
        else if (mode === "edit") {
            if (content === "") {
                formData.delete("content");
                formData.append("content", editingPost?.content as string);
            }
            const removeIds = [...attachmentsToRemove];
            formData.append("categoryId", category);
            if (
                files.length > 0 &&
                editingPost?.attachments?.length && removeIds.length === 0
            ) {
                const attachmentId = editingPost.attachments[0].id;

                if (attachmentId !== undefined) {
                    removeIds.push(Number(attachmentId));
                }
            }

            removeIds.forEach(id => {
                formData.append("attachmentsToRemove", id);
            });
            
            formData.append("id", String(editingPost!.id))
            if (files[0]) {
                formData.append("attachmentsToAdd", files[0])
            }
            editPost(formData);
        }
        closeEdit();
    }

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = Array.from(e.target.files || [])
        if (!files.length) return

        setFiles((prev) => [...prev, ...files])
        e.target.value = "";
    }

    const removeImage = (index: number) => {
        setFiles((prev) =>
            prev.filter((_, i) => i !== index)
        )
    }

    function cleanup() {
        images.forEach(img => URL.revokeObjectURL(img));
        setFiles([]);
        setContent("");
    }

    function updateToolbarState() {
        setActiveFormats({
            bold: document.queryCommandState("bold"),
            italic: document.queryCommandState("italic"),
        })
    }

    function toggleFormat(command: "bold" | "italic") {
        editorRef.current?.focus()
        document.execCommand(command)
        updateToolbarState()
    }

    useEffect(() => {
        const sanitized = DOMPurify.sanitize(
            editingPost?.content || ""
        );

        requestAnimationFrame(() => {
            if (editorRef.current) {
                editorRef.current.innerHTML = sanitized;
            }
        });
    }, [editingPost]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setExistingImages(editingPost?.attachments || [])
    }, [editingPost])

    return (

        <DialogContent className="p-0 overflow-hidden flex! flex-col! gap-2 max-h-[90vh] max-w-[95vw]" >
            <DialogHeader className="border-b px-6 py-4">
                <DialogTitle>
                    {mode === "edit" ? "Edit" : "Create"} Post
                </DialogTitle>
            </DialogHeader>

            <div className="max-h-[80vh] overflow-y-auto px-3 space-y-6 py-1 no-scrollbar">
                {/* Body */}
                <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    className="relative border-b pb-2 w-full min-h-24 outline-none"
                    onInput={(e) => {
                        setContent(e.currentTarget.innerHTML)
                        updateToolbarState()
                    }}
                    onKeyUp={updateToolbarState}
                    onMouseUp={updateToolbarState}
                >
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={activeFormats.bold ? "default" : "outline"}
                        size="icon-sm"
                        type="button"
                        onClick={() => toggleFormat("bold")}
                    >
                        B
                    </Button>
                    <Button
                        variant={activeFormats.italic ? "default" : "outline"}
                        className="italic"
                        size="icon-sm"
                        type="button"
                        onClick={() => toggleFormat("italic")}
                    >
                        I
                    </Button>
                </div>
                {/* Category */}
                <div className="flex justify-between">
                    <Select value={category} onValueChange={(value) => setCategory(value)}>
                        <SelectTrigger type="button"
                            size="sm">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>

                        <SelectContent>
                            {categories.map(category => <SelectItem value={String(category.value)}>{category.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>

                {/* Images */}
                <div className="space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {mode === "edit" && exitingImages.map((attachment, index) => <div
                            key={index}
                            className="relative overflow-hidden rounded-xl border aspect-square group"
                        >
                            <img
                                src={attachment.url}
                                alt="Post image"
                                className="h-full w-full object-cover"
                            />

                            <button
                                type="button"
                                onClick={() => {
                                    setExistingImages(exitingImages.filter(img => img.id !== attachment.id));
                                    setAttachmentsToRemove([...attachmentsToRemove, Number(attachment.id)]);
                                }
                                }
                                className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
                            >
                                <X className="size-4" />
                            </button>
                        </div>)}
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="relative overflow-hidden rounded-xl border aspect-square group"
                            >
                                <img
                                    src={image}
                                    alt="Post image"
                                    className="h-full w-full object-cover"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeImage(index)
                                    }
                                    className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
                                >
                                    <X className="size-4" />
                                </button>
                            </div>
                        ))}

                        {/* Add image card */}
                        <AddImage onChange={handleImageChange} />
                    </div>
                </div>
                <SingleImageNotice />
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 border-t px-6 py-4">
                <Button variant="destructive" onClick={() => closeEdit()} disabled={creating === "pending" || editing === "pending"}>
                    Cancel
                </Button>

                <Button disabled={creating === "pending" || editing === "pending"} onClick={createOrEdit}>
                    Save Changes
                </Button>
            </div>
        </DialogContent >
    )
}

export default CreateEditPostForm