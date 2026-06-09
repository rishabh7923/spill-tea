import React, { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import type { CreatePostSchema } from "@/types/post"
import { SelectPostCategory } from "./SelectPostCategory"
import ImageInput from "@/components/ImageInput"
import useCreatePost from "./hooks/useCreatePost"
import useNavigateToLogin from "../auth/useNavigateToLogin"

export default function CreatePost() {
  const [content, setContent] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [category, setCategory] = useState<string>("5");
  const navigateToLogin = useNavigateToLogin();
  const { createPost, status } = useCreatePost({ onSuccess: cleanup, onError: cleanup });
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
  })

  const editorRef = useRef<HTMLDivElement>(null)

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

  function cleanup() {
    images.forEach(img => URL.revokeObjectURL(img));
    setFiles([]);
    setImages([]);
    setContent("");
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    images.forEach(img => URL.revokeObjectURL(img));
    const selectedFiles = Array.from(e.target.files)
    setFiles(selectedFiles)
    setImages(selectedFiles.map(file => URL.createObjectURL(file)))
  }

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value)
    if (!e.target) return
    const el = e.target;
    el.style.height = "auto"
    el.style.height = el.scrollHeight + "px"

  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigateToLogin();
    const formData = new FormData()

    formData.append("content", content);
    formData.append("category_id", category);
    files.forEach(file => {
      formData.append("attachments", file)
    })
    createPost(formData as unknown as CreatePostSchema);
  }

  return (
    <div className="flex gap-3">

      {/* Avatar */}
      <Avatar>
        <AvatarImage src="/avatar.png" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>

      <form className="flex-1 space-y-3" onSubmit={handleSubmit}>

        {/* Textarea */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          className="border-b pb-2 w-full min-h-24 outline-none"
          onInput={(e) => {
            setContent(e.currentTarget.innerHTML)
            updateToolbarState()
          }}
          onKeyUp={updateToolbarState}
          onMouseUp={updateToolbarState}
        />

        {/* Formatting toolbar */}
        <div className="flex gap-2 mb-2">
          <Button
            size="icon-sm"
            type="button"
            variant={activeFormats.bold ? "default" : "outline"}
            onClick={() => toggleFormat("bold")}
          >
            B
          </Button>

          <Button
            className="italic"
            size="icon-sm"
            type="button"
            variant={activeFormats.italic ? "default" : "outline"}
            onClick={() => toggleFormat("italic")}
          >
            I
          </Button>
        </div>

        {/* Image preview */}

        {images.length > 0 &&
          <div className="h-80 w-full">
            {images.map((img, index) => (
              <img key={index} className="h-full w-full object-cover" src={img} alt="Gallery" />
            ))}
          </div>
        }

        {/* Bottom Row */}
        <div className="flex items-center justify-between">

          {/* Actions */}
          <div className="flex items-center gap-4 ">
            <ImageInput onChange={handleChange} />
            <SelectPostCategory setCategory={setCategory} category={category} />
          </div>

          {/* Post Button */}
          <Button className="rounded-full" disabled={!content.trim() || status === "pending"}>
            Post
          </Button>

        </div>

      </form>
    </div>
  )
}