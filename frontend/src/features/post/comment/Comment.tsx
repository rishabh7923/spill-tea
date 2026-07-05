import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Bookmark, Heart, Reply, ShareIcon, TrashIcon } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { useAuth } from '@/features/auth/context/AuthContext';
import type { Comment as CommentType } from '@/types/comment';
import useDeleteComment from './hooks/useDeleteComment';
import AddComment from './CreateComment';
import dayjs from '@/utils/dayjs';
import UserIcon from './UserIcon';
import { useReply } from './context/ReplyProvider';
import RepliesList from './reply/RepliesList';


type CommentProps = {
    comment: CommentType;
} & { depth: number }

function Comment({ comment, depth }: CommentProps) {
    const [showReplies, setShowReplies] = useState(false);
    const { pid } = useParams();
    const setSearchParams = useSearchParams()[1];
    const { user } = useAuth();
    const { activeParentCommentId, openReplyBox, closeReplyBox, isReplyBoxOpen } = useReply();
    const { deleteComment } = useDeleteComment();

    const handleDelete = () => {
        deleteComment({
            postId: pid as string,
            commentId: comment.id,
        });
    };

    const handleReplyBox = () => {
        if (comment.id === activeParentCommentId) {
            closeReplyBox();
            setSearchParams({});
        } else {
            openReplyBox(comment.id);
            setSearchParams([["replyTo", comment.id.toLocaleString()]])
        }
    }

    const handleShowReplies = () => {
        setShowReplies(s => !s);
    }

    return (
        <li className="relative after:content-[''] after:absolute after:bottom-0 after:left-1/2  after:border">
            <div className="flex items-stretch gap-3 relative">
                <UserIcon url={comment.user.avatar_url!} />

                <div className="flex-1">
                    {/* Comment body */}
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="truncate text-sm font-semibold">
                                {comment.user.display_name}
                            </span>

                            <span className="text-xs text-muted-foreground">
                                • {dayjs(comment.created_at).fromNow()}
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
                            {/* Comment actions */}
                            <div className="mt-2 flex items-center justify-start gap-4">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 rounded-full hover:bg-red-100 hover:text-red-500"
                                >
                                    <Heart className="h-4 w-4" />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 rounded-full hover:bg-blue-100 hover:text-blue-500"
                                    onClick={handleReplyBox}
                                >
                                    <Reply className="h-4 w-4" />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 rounded-full hover:bg-green-100 hover:text-green-500"
                                >
                                    <ShareIcon className="h-4 w-4" />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 rounded-full hover:bg-yellow-100 hover:text-yellow-500"
                                >
                                    <Bookmark className="h-4 w-4" />
                                </Button>
                            </div>
                            {
                                isReplyBoxOpen(comment.id) ?
                                    <div className='mt-2'>
                                        <AddComment mode='reply' />
                                    </div> :
                                    null
                            }
                        </div>
                    </div>

                    {
                        !showReplies && comment.reply_count > 0 ?
                            <Button className="group p-0 hover:no-underline" variant="link" onClick={handleShowReplies}>
                                <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                                    View
                                </span>

                                <span className="font-medium">
                                    {comment.reply_count}{" "}
                                    {comment.reply_count > 1 ? "replies" : "reply"}
                                </span>
                            </Button> :
                            null
                    }
                </div>
            </div>
            {comment.reply_count > 0 ? <RepliesList show={showReplies} parentCommentId={comment.id} depth={depth + 1} /> : null}
        </li>
    )
}

export default Comment