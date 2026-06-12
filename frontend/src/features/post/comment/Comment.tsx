import { EllipsisVertical, PencilIcon, ShareIcon, TrashIcon } from 'lucide-react';
import dayjs from "@/lib/day";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { Comment as CommentType } from '@/types/comment';
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from '@/features/auth/context/AuthContext';
import useDeleteComment from './hooks/useDeleteComment';
import { useParams } from 'react-router-dom';


function Comment({ comment }: { comment: CommentType }) {
    const { user } = useAuth();
    const sameUser = user?.id === comment.user.id;
    const { deleteComment } = useDeleteComment();
    const params = useParams();
    return (
        <div className='p-2'>
            <div className='flex gap-2 items-center'>
                <Avatar>
                    <AvatarImage src={""} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="font-semibold text-sm">{comment.user.username}</span>
                <div className='text-muted-foreground text-xs'>
                    {dayjs(comment.created_at).fromNow()}
                </div>
                <div className='ml-auto'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className='rounded-full' size="icon" variant="ghost"><EllipsisVertical /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                {sameUser && <DropdownMenuItem>
                                    <PencilIcon />
                                    Edit
                                </DropdownMenuItem>}
                                <DropdownMenuItem>
                                    <ShareIcon />
                                    Share
                                </DropdownMenuItem>
                                {sameUser && <DropdownMenuSeparator />
                                }</DropdownMenuGroup>
                            {sameUser && <DropdownMenuGroup>
                                <DropdownMenuItem variant="destructive" onClick={() => deleteComment({ postId: params.pid as string, commentId: comment.id })} >
                                    <TrashIcon />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuGroup>}
                        </DropdownMenuContent>
                    </DropdownMenu>                </div>
            </div>
            <p className='mt-1 text-sm'>
                {comment.content}
            </p>
        </div>
    )
}

export default Comment