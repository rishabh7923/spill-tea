import type { PostCardProps } from "@/types/post";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bookmark, Dot, ShareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import PostCardCategoryTag from "./PostCardCategoryTag";
import LikeButton from "./LikeButton";
import CommentButton from "./comment/CommentButton";
import { PostCardDropDown } from "./PostCardDropDown";

const PostCard = forwardRef<HTMLDivElement, PostCardProps>((post, ref) => {
  const navigate = useNavigate();
  return (
    <div
      ref={ref}
      className="group border my-4 rounded-sm p-4 transition bg-muted/40"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center justify-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage className="object-cover" src={post.avatar || "https://github.com/shadcn.png"} />
            <AvatarFallback>
              {post.user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-center">
              <span className="font-medium text capitalize">
                {post.user.username}
              </span>
              <Dot className="text-muted-foreground m-0" />
              <span className="text-sm text-muted-foreground">
                {post.createdAt}
              </span>
            </div>
            <div>
              <PostCardCategoryTag category={post.category.name} />
            </div>
          </div>
        </div>

        <PostCardDropDown post={post} />
      </div>

      {/* Content */}
      <div>
        <p className="text-sm leading-relaxed whitespace-pre-line">
        </p>
        <div className="mt-3"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        />
      </div>

      {/* Image */}
      {post.image && (
        <div className="mt-3 overflow-hidden rounded-xl border">
          <img
            src={post.image}
            className="w-full max-h-[420px] object-cover transition group-hover:scale-[1.01]"
            alt="post"
          />
        </div>
      )}

      {/* Actions */}
      <div className="mt-3 flex items-center justify-between text-muted-foreground">
        <div className="flex items-center gap-5">
          <LikeButton
            likes={post.likes}
            liked={Boolean(post.liked)}
            postId={post.id}
          />

          <CommentButton
            onClick={() =>
              navigate(`/p/${post.id}`, {
                state: { post }
              })
            }
          />
          <button className="flex items-center gap-2 text-sm transition hover:text-foreground">
            <ShareIcon className="h-4 w-4" />
          </button>
        </div>

        <Button variant="ghost" size="icon" className="transition-all hover:text-yellow-500 rounded-full hover:bg-yellow-300">
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