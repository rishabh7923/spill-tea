import { Heart } from "lucide-react"
import useLike from "./hooks/useLike";
import useUnlike from "./hooks/useUnlike";
import useNavigateToLogin from "../auth/hooks/useNavigateToLogin";
import { Button } from "@/components/ui/button";

function LikeButton({ likes, liked, postId }: { likes: number, liked: boolean, postId: string | number }) {
    const { like, status: likeStatus } = useLike(postId);
    const { unlike, status: unlikeStatus } = useUnlike(postId);
    const status = likeStatus && unlikeStatus
    const navigateToLogin = useNavigateToLogin();
    function handleClick() {
        navigateToLogin();
        if (liked) return unlike(postId);
        like(postId)
    };

    return (
        <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="transition-all hover:text-red-500 rounded-full hover:bg-red-100" onClick={handleClick} disabled={status == "pending"}>
                <Heart
                    className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : ""} transition active:scale-125 duration-100 ease-in-out`}
                />
            </Button>
            <span>
                {likes}

            </span>
        </div>
    )
}

export default LikeButton