import useReplies from "./hooks/useReplies";
import Comment from "./Comment"
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Replies({ commentId }: { commentId: string }) {
    const { replies } = useReplies();
    const [show, setShow] = useState(false);
    return (
        !show ? <Button variant="link" onClick={() => setShow(s => !s)}>Show replies</Button> :
            <ul className="mt-3 ml-2 border-l border-border pl-4 space-y-3">
                {replies.map(reply => <Comment comment={reply} key={reply.id} />)}
            </ul>
    )
}