import Comment from "./Comment";
import useComments from "./hooks/useComments";


function PostComments() {
    const { comments, status, } = useComments();

    return (
        <div className="px-4 mt-2">
            <ul className="space-y-4">
                {status === "pending" ? <>
                    <li className="w-full animate-pulse"></li>
                    <li className="w-full animate-pulse"></li>
                    <li className="w-full animate-pulse"></li>
                </>
                    :
                    status === "error" ? "Something went wrong" : comments!.map(c => <Comment comment={c} />)
                }
            </ul>
        </div >
    )
}

export default PostComments