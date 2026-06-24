import type { PostCardProps } from "@/types/post";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, ShareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import PostCardCategoryTag from "./PostCardCategoryTag";
import LikeButton from "./LikeButton";
import CommentButton from "./comment/CommentButton";
import { PostCardDropDown } from "./PostCardDropDown";
import { UserInfo } from "../user/components/UserInfo";
import { toast } from "sonner";
import dayjs from "@/utils/dayjs";
import MarkdownRenderer from "./create-edit-post/MarkdownRenderer";

const PostCard = forwardRef<HTMLDivElement, PostCardProps>((post, ref) => {
  const navigate = useNavigate();
  return (
    <div
      ref={ref}
      className="group rounded-lg p-4 transition hover:bg-sidebar text-card-foreground my-2"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <UserInfo
          avatar={post.user?.avatar?.url || ""}
          name={post.user?.display_name || ""}
          description={<PostCardCategoryTag category={post.category?.name || ""} />}
          size="lg"
          time={dayjs(post.createdAt).fromNow()}
        />

        <PostCardDropDown post={post} />
      </div>

      {/* Content */}
      <div>
        <p className="text-sm leading-relaxed whitespace-pre-line">
        </p>
        <div className="mt-3">
          <MarkdownRenderer content={post.content} />
        </div>
      </div>

      {/* Image */}
      {post.attachments.length > 0 ? (
        <div className="mt-3 overflow-hidden rounded-xl border">
          <img
            src={post.attachments[0].url}
            className="w-full max-h-[420px] object-cover transition group-hover:scale-[1.01]"
            alt="post"
          />
        </div>
      ) : null}

      {/* Actions */}
      <div className="mt-3 flex items-center justify-between text-muted-foreground">
        <div className="flex items-center gap-5">
          <LikeButton
            likes={post.likesCount}
            liked={post.liked}
            postId={post.id}
          />

          <CommentButton
            onClick={() =>
              navigate(`/p/${post.id}`, {
                state: { post }
              })
            }
          />
          <Button variant="ghost" size="icon" className="transition-all hover:text-green-500 rounded-full hover:bg-green-100" onClick={async () => {
            await navigator.clipboard.writeText(window.location.host + "p/" + post.id);
            toast.success("Link copied!")
          }}>
            <ShareIcon className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="transition-all hover:text-yellow-500 rounded-full hover:bg-yellow-100">
          <Bookmark
            className={`h-4 w-4 transition ${post.saved ? "fill-yellow-500 text-yellow-500" : ""
              }`}
          />
        </Button>
      </div>
    </div>
  );
});
export default PostCard;