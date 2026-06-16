import { useState, } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Comment from "../Comment"
import { useReplies } from "./hooks/useReplies";

type RepliesProps = { commentId: string | number }

export default function Replies({ commentId }: RepliesProps) {
    const params = useParams();
    const { data } = useReplies({ postId: params.pid as string, commentId });
    const replies = data?.pages.map(page => page.replies).flat()

    const [show, setShow] = useState(false);
    return (

        !show ? <Button variant="link" onClick={() => setShow(s => !s)}>Show replies</Button> :
            <ul className="mt-3 ml-2 border-l border-border pl-4 space-y-3">
                {replies && replies.map(reply => <Comment comment={reply} />)}
            </ul>
    )
}