import Comment from "./Comment";
import useComments from "./hooks/useComments";
import { ReplyProvider } from "./context/ReplyProvider";

function CommentsList() {
    const { comments, status, } = useComments();
    return (
        <ReplyProvider>
            <div className="px-4 mt-2">
                <ul className="space-y-4">
                    {status === "pending" ? <>
                        <li className="w-full animate-pulse"></li>
                        <li className="w-full animate-pulse"></li>
                        <li className="w-full animate-pulse"></li>
                    </>
                        :
                        status === "error" ? "Something went wrong" : comments?.map(comment => comment.parent_id === null ? <Comment comment={comment} key={comment.id} /> : null)
                    }
                </ul>
            </div >
        </ReplyProvider>
    )
}

export default CommentsList