import type { PostCardProps } from "@/types/post";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { Bookmark, ShareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import PostCardCategoryTag from "./PostCardCategoryTag";
import LikeButton from "./LikeButton";
import CommentButton from "./comment/CommentButton";
import { PostCardDropDown } from "./PostCardDropDown";
import { UserInfo } from "../user/components/UserInfo";
import { toast } from "sonner";

const PostCard = forwardRef<HTMLDivElement, PostCardProps>((post, ref) => {
  const navigate = useNavigate();
  return (
    <div
      ref={ref}
      className="group my-4 rounded-lg p-4 transition hover:bg-sidebar text-card-foreground"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <UserInfo
          avatar="https://github.com/shadcn.png"
          name="Ajay"
          description={<PostCardCategoryTag category={post.category.name} />}
          size="lg"
          time="9 days ago"
        />

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
        ></div>
      </div>

      {/* Image */}
      {post.attachments.length ? (
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