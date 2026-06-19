import { useParams } from "react-router-dom";
import { useReplies } from "./hooks/useReplies";
import Comment from "../Comment";

type RepliesProps = { commentId: string | number, show: boolean }

export default function Replies({ commentId, show }: RepliesProps) {
    const params = useParams();
    const { data } = useReplies({ postId: params.pid as string, commentId });
    const replies = data?.pages.map(page => page.replies).flat()

    return (

        show && <ul className="mt-3 ml-2 border-l border-border pl-4 space-y-3">
            {replies && replies.map(reply => <Comment comment={reply} />)}
        </ul>
    )
}