import { useReplies } from "./hooks/useReplies";
import Comment from "../Comment";
import clsx from "clsx";

type RepliesProps = {
    show: boolean,
    parentCommentId: number | string
    depth: number
}

export default function RepliesList({ show, parentCommentId, depth }: RepliesProps) {
    const { data } = useReplies({ parentCommentId });
    const replies = data?.pages.map(page => page.replies).flat();

    return (
        show &&
        <ul className={clsx("mt-3 space-y-3 top-full", depth < 4 ? "ml-5" : "")}>
            {replies && replies.map(reply => <Comment comment={reply} key={reply.id} depth={depth} />)}
        </ul>
    )
}