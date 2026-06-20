import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from "lucide-react"
import PostCardDeleteButton from "./PostCardDeleteButton"
import { useAuth } from "../auth/context/AuthContext"
import { usePostEditor } from "./create-edit-post/PostEditorProvider"
import type { Post, PostCardProps } from "@/types/post"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export function PostCardDropDown({ post }: { post: PostCardProps }) {
  const { user } = useAuth();
  const { openEdit } = usePostEditor();
  const userId = post.user.id;
  const postId = post.id;
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full text-right" variant="ghost" size="icon">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate(`/p/${postId}`)}>Go to post</DropdownMenuItem>
          <DropdownMenuItem onClick={async () => {
            await navigator.clipboard.writeText(window.location.host + "p/" + post.id)
            toast.success("Link copied!")
          }}>Copy link</DropdownMenuItem>
          <DropdownMenuItem>Report</DropdownMenuItem>
          {userId === user?.id && (
            <DropdownMenuItem onSelect={() => openEdit(post as unknown as Post)}>
              Edit Post
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        {userId === user?.id && <>
          <DropdownMenuSeparator />
          <PostCardDeleteButton postId={postId} />
        </>}
      </DropdownMenuContent>
    </DropdownMenu >
  )
}
