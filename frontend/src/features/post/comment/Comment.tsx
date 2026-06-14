import { useParams } from 'react-router-dom';
import { Bookmark, Heart, Reply, ShareIcon, TrashIcon } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/features/auth/context/AuthContext';
import type { Comment as CommentType } from '@/types/comment';
import useDeleteComment from './hooks/useDeleteComment';


function Comment({ comment }: { comment: CommentType }) {
    const { user } = useAuth();
    const { deleteComment } = useDeleteComment();
    const params = useParams();
    return (
        <li className="flex gap-3">
            <Avatar className="h-8 w-8 shrink-0">
                <AvatarImage src={comment.user.avatar?.url || ""} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex-1">
                {/* Comment body */}
                <div className="rounded-xl bg-muted/40 p-3">
                    <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-semibold">
                            {comment.user.displayName || "Freak"}
                        </span>

                        <span className="text-xs text-muted-foreground">
                            • {"2h ago"}
                        </span>

                        {comment.user.id === user?.id && (
                            <TrashIcon
                                className="ml-auto h-3.5 w-3.5 cursor-pointer hover:text-destructive"
                                onClick={() =>
                                    deleteComment({
                                        postId: params.pid as string,
                                        commentId: comment.id,
                                    })
                                }
                            />
                        )}
                    </div>

                    <p className="mt-1 text-sm text-foreground/90">
                        {comment.content}
                    </p>

                    <div className="mt-2 flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:text-red-500"
                        >
                            <Heart className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:text-blue-500"
                        >
                            <Reply className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:text-green-500"
                        >
                            <ShareIcon className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:text-yellow-500"
                        >
                            <Bookmark className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Replies */}
                <ul className="mt-3 ml-4 border-l border-border pl-4 space-y-3">
                    <li className="flex gap-3">
                        <Avatar className="h-8 w-8 shrink-0">
                            <AvatarImage src={comment.user.avatar?.url || ""} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 rounded-xl bg-muted/30 p-3">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold">
                                    Reply User
                                </span>

                                <span className="text-xs text-muted-foreground">
                                    1h ago
                                </span>
                            </div>

                            <p className="mt-1 text-sm text-foreground/90">
                                This is a nested reply comment.
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </li>
    )
}

export default Comment