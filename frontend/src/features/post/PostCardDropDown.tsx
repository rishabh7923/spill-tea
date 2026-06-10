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
import { useAuth } from "../auth/AuthContext"
import { usePostEditor } from "./create-edit-post/PostEditorProvider"
import type { Post, PostCardProps } from "@/types/post"

export function PostCardDropDown({ post }: { post: PostCardProps }) {
  const { user } = useAuth();
  const { openEdit } = usePostEditor();
  const userId = post.user.id;
  const postId = post.id;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full text-right" variant="ghost" size="icon">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>Go to post</DropdownMenuItem>
          <DropdownMenuItem>Copy link</DropdownMenuItem>
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
    </DropdownMenu>
  )
}
