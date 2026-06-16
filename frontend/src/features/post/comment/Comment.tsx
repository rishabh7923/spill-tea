import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bookmark, Heart, Reply, ShareIcon, TrashIcon } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/features/auth/context/AuthContext';
import type { Comment as CommentType } from '@/types/comment';
import useDeleteComment from './hooks/useDeleteComment';
import AddComment from './CreateComment';
import Replies from './reply/Replies';

function Comment({ comment }: { comment: CommentType }) {
    const { user } = useAuth();
    const [showReplyBox, setShowReplyBox] = useState(false);
    const { deleteComment } = useDeleteComment();
    const params = useParams();
    const handleDelete = () => {
        deleteComment({
            postId: params.pid as string,
            commentId: comment.id,
        });
    };
    return (
        <li>
            <div className="flex gap-3">
                <div>
                    <Avatar className="h-8 w-8 shrink-0 mt-3">
                        <AvatarImage src={comment.user.avatar_url || ""} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>

                <div className="flex-1">
                    {/* Comment body */}
                    <div className="rounded-xl bg-muted/40 p-3 border">
                        <div className="flex items-center gap-2">
                            <span className="truncate text-sm font-semibold">
                                {comment.user.display_name || "Freak"}
                            </span>

                            <span className="text-xs text-muted-foreground">
                                • {"2h ago"}
                            </span>

                            {comment.user.id === user?.id && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="ml-auto h-7 w-7 hover:bg-red-200 hover:text-red-500"
                                    onClick={handleDelete}
                                    aria-label="Delete comment"
                                >
                                    <TrashIcon className="h-4 w-4" />
                                </Button>
                            )}
                        </div>

                        <p className="mt-1 text-sm text-foreground/90">
                            {comment.content}
                        </p>

                        <div>
                            <div className="mt-2 flex items-center justify-start gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full hover:bg-red-100 hover:text-red-500"
                                >
                                    <Heart className="h-4 w-4" />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full hover:bg-blue-100 hover:text-blue-500"
                                    onClick={() => setShowReplyBox(s => !s)}
                                >
                                    <Reply className="h-4 w-4" />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full hover:bg-green-100 hover:text-green-500"
                                >
                                    <ShareIcon className="h-4 w-4" />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full hover:bg-yellow-100 hover:text-yellow-500"
                                >
                                    <Bookmark className="h-4 w-4" />
                                </Button>
                            </div>
                            {showReplyBox ?
                                <div className='mt-2'>
                                    <AddComment postId={params.pis as string} commentId={comment.id as number} mode='reply' />
                                </div>
                                : null}
                        </div>
                    </div>

                </div>
            </div>
            {/* Replies */}
            {comment.reply_count > 0 ? <Replies commentId={comment.id} /> : null}
        </li>
    )
}

export default Comment