import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Comment from "./comment/Comment";
import AddComment from "./comment/CreateComment";
import { ScrollArea } from "@/components/ui/scroll-area";
import useComments from "./comment/hooks/useComments";
import usePost from "./hooks/usePost";
import { useParams } from "react-router-dom";

function PostDialog() {
    const params = useParams();
    const { comments, status } = useComments();
    const { post } = usePost(params.pid as unknown as string);
    return (
        <div className="hidden md:block h-full p-4 overflow-hidden">
            <div className="h-full w-4/5 mx-auto flex min-h-0 bg-background rounded-sm overflow-hidden gap-2">
                {/* Post image */}
                <div className="w-full h-full">
                    {post?.attachments[0] && (
                        <div className="h-full">
                            <img
                                src={post.attachments[0].url}
                                className="w-full h-full object-fill"
                            />
                        </div>
                    )}
                </div>
                <div className="w-full h-full flex flex-col pb-2 min-h-0 overflow-x-hidden">
                    {/* USER INFO */}
                    <div className="flex items-center gap-3 p-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col leading-none">
                            <span className="font-semibold text-sm">{post?.user.username}</span>
                            <span className="text-xs text-muted-foreground">
                                {"3 days ago"}
                            </span>
                        </div>
                    </div>

                    {/* Post content */}
                    <div className="p-2 text-sm text-accent-foreground">
                        <p>{post?.content}</p>
                    </div>


                    {/* Comments */}
                    <ScrollArea className="flex-1 overflow-y-auto min-h-0">
                        <div className="p-2">
                            <h3 className="font-medium">Comments</h3>
                        </div>

                        <ul className="divide-y">
                            {status == "success" && comments!.map(c => <Comment comment={c} />)}
                        </ul>
                    </ScrollArea>

                    {/* Add comment */}
                    <div className="border-t py-2">
                        <AddComment />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDialog