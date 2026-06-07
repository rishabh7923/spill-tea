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

export function PostCardDropDown({ postId, userId }: { postId: string|number, userId: string }) {
  const { user } = useAuth();
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
        </DropdownMenuGroup>
        {userId === user?.id && <>
          <DropdownMenuSeparator />
          <PostCardDeleteButton postId={postId} />
        </>}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
