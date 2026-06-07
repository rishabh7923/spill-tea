import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import useDeletPost from './hooks/useDeletPost'

function PostCardDeleteButton({postId}:{postId:string|number}) {
    const {mutate, status} = useDeletPost();
  return (
        <DropdownMenuItem variant="destructive" disabled={status=="pending"} onClick={()=> mutate(postId)}>Delete</DropdownMenuItem>
  )
}

export default PostCardDeleteButton