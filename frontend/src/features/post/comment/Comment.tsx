import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Bookmark, Heart, Reply, ShareIcon, TrashIcon } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { useAuth } from '@/features/auth/context/AuthContext';
import type { Comment as CommentType } from '@/types/comment';
import useDeleteComment from './hooks/useDeleteComment';
import AddComment from './CreateComment';
import UserIcon from './UserIcon';
import { useReply } from './context/ReplyProvider';
import RepliesList from './reply/RepliesList';
import timeAgo from '@/utils/timeAgo';


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
        <li className="
            relative
            after:absolute
            after:border
            after:bottom-0
            after:content-['']
            after:left-1/2
        ">
            <div className="flex gap-3 items-stretch relative">
                <UserIcon url={comment.user.avatar_url!} />

                <div className="flex-1">
                    {/* Comment body */}
                    <div>
                        <div className="flex gap-2 items-center">
                            <span className="font-semibold text-sm truncate">
                                {comment.user.display_name}
                            </span>

                            <span className="text-muted-foreground text-xs">
                                • {timeAgo(comment.created_at)}
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

                        <p className="mt-1 text-foreground/90 text-sm">
                            {comment.content}
                        </p>

                        <div>
                            {/* Comment actions */}
                            <div className="flex gap-4 items-center justify-start mt-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 hover:bg-red-100 hover:text-red-500 rounded-full"
                                >
                                    <Heart className="h-4 w-4" />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 hover:bg-blue-100 hover:text-blue-500 rounded-full"
                                    onClick={handleReplyBox}
                                >
                                    <Reply className="h-4 w-4" />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 hover:bg-green-100 hover:text-green-500 rounded-full"
                                >
                                    <ShareIcon className="h-4 w-4" />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 hover:bg-yellow-100 hover:text-yellow-500 rounded-full"
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
                            <Button className="p-0 group hover:no-underline" variant="link" onClick={handleShowReplies}>
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