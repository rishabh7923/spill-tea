import React, { useEffect, useRef } from 'react'
import { useState } from "react"
import { Smile, Vote, X } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import AddImage from "./AddImage"
import useNavigateToLogin from "@/features/auth/hooks/useNavigateToLogin"
import { usePostEditor } from './PostEditorProvider'
import useCreatePost from '../hooks/useCreatePost'
import type { CreatePostSchema, PostImage } from '@/types/post'
import useEditPost from '../hooks/useEditPost';
import { UserInfo } from '@/features/user/components/UserInfo';
import { useAuth } from '@/features/auth/context/AuthContext';
import { Textarea } from '@/components/ui/textarea'
import Poll from './Poll'
import clsx from 'clsx'

const categories = [
    { value: 1, label: "Issue" },
    { value: 2, label: "Confession" },
    { value: 3, label: "Meme" },
    { value: 4, label: "Question" },
    { value: 5, label: "General" },
];
function CreateEditPostForm() {
    const [content, setContent] = useState<string>("");
    const [showPole, setShowPole] = useState(false);
    const [attachmentsToRemove, setAttachmentsToRemove] = useState<number[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [category, setCategory] = useState<string>("5");
    const [exitingImages, setExistingImages] = useState<PostImage[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { closeEdit, mode, editingPost } = usePostEditor();
    const navigateToLogin = useNavigateToLogin();
    const { createPost, status: creating } = useCreatePost();
    const { editPost, status: editing } = useEditPost({ onSuccess: cleanup, onError: cleanup });
    const { user } = useAuth();
    const images = files.map(file => URL.createObjectURL(file));

    const handleInput = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    function createOrEdit() {
        navigateToLogin();
        const formData = new FormData()

        formData.append("content", content);
        formData.append("category_id", category);

        if (mode === "create") {
            if (files[0]) {
                formData.append("attachments", files[0]);
            }
            createPost(formData as unknown as CreatePostSchema, {
                onSettled: () => { closeEdit(); cleanup(); setContent("") }
            });
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
                formData.append("attachments_to_remove", String(id));
            });

            formData.append("id", String(editingPost!.id))
            if (files[0]) {
                formData.append("attachments_to_add", files[0])
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

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setExistingImages(editingPost?.attachments || [])
    }, [editingPost])

    return (

        <>
            <div className="max-h-[80vh] flex flex-col gap-6 overflow-y-auto px-3 py-1 no-scrollbar">
                <UserInfo
                    avatar={user?.avatar?.url || ""}
                    name={user?.display_name || "Unknown"}
                    description={mode !== "edit" ? "What you have to share today?" : ""}
                />
                {/* Category */}
                <div className="flex justify-between w-full">
                    <Select value={category} onValueChange={(value) => setCategory(value)}>
                        <SelectTrigger className='p-4 rounded-2xl' type="button"
                            size="sm">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>

                        <SelectContent>
                            {categories.map(category => <SelectItem value={String(category.value)}>{category.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>

                {/* Body */}
                <div className="relative">
                    {!content && mode !== "edit" && (
                        <span className="pointer-events-none absolute left-3 top-2 text-xl font-medium text-muted-foreground/60">
                            What's the tea?
                        </span>
                    )}

                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onInput={handleInput}
                        ref={textareaRef}
                        defaultValue={mode === "edit" ? editingPost?.content : ""}
                        className={clsx("min-h-30 text-xl leading-none border-0 bg-transparent pt-3 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-transparent caret-primary")}
                    />
                </div>

                {showPole ? <Poll /> : null}
                {/* Actions */}
                <div className="flex w-full gap-2">
                    <AddImage onChange={handleImageChange} />
                    <Button
                        variant="outline"
                        size="icon-sm"
                        type="button"
                    >
                        <Smile />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon-sm"
                        type="button"
                        onClick={() => setShowPole(!showPole)}
                    >
                        <Vote />
                    </Button>
                    <Button className="ml-auto rounded-full"
                        size="sm"
                        disabled={creating === "pending" || editing === "pending" || (content.length === 0 && mode !== "edit")}
                        onClick={createOrEdit}>
                        <pre> </pre>{mode === "edit" ? "Save Changes" : "Post"}<pre> </pre>
                    </Button>
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
                    </div>
                </div>

                {/* <SingleImageNotice /> */}

            </div>
        </>

    )
}

export default CreateEditPostForm