import { useReplies } from "./hooks/useReplies";
import Comment from "../Comment";

type RepliesProps = {
    show: boolean,
    parentCommentId: number | string
}

export default function RepliesList({ show, parentCommentId }: RepliesProps) {
    const { data } = useReplies({ parentCommentId });
    const replies = data?.pages.map(page => page.replies).flat();

    return (

        show && <ul className="mt-3 ml-2 border-l border-border pl-4 space-y-3">
            {replies && replies.map(reply => <Comment comment={reply} key={reply.id} />)}
        </ul>
    )
}