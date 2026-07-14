import type { PostCardProps } from "@/types/post";
import { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bookmark,
  Share2Icon,
  SparklesIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PostCardCategoryTag from "./PostCardCategoryTag";
import LikeButton from "./LikeButton";
import CommentButton from "./comment/CommentButton";
import { PostCardDropDown } from "./PostCardDropDown";
import { UserInfo } from "../user/components/UserInfo";
import { toast } from "sonner";
import MarkdownRenderer from "./create-edit-post/MarkdownRenderer";
import clsx from "clsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import timeAgo from "@/utils/timeAgo";

const PostCard = forwardRef<HTMLDivElement, PostCardProps>((post, ref) => {
  const navigate = useNavigate();

  const [showSummary, setShowSummary] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [displayedSummary, setDisplayedSummary] = useState("");

  useEffect(() => {
    if (!showSummary) return;

    let index = 0;

    setDisplayedSummary("");

    const interval = setInterval(() => {
      setDisplayedSummary(post.summary.slice(0, index));
      index++;

      if (index > post.summary.length) {
        clearInterval(interval);
      }
    }, 5);

    return () => clearInterval(interval);
  }, [post.summary, showSummary]);

  const handleSummary = async () => {
    if (showSummary) {
      setShowSummary(false);
      return;
    }

    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsGenerating(false);
    setShowSummary(true);
  };

  return (
    <Card
      ref={ref}
      className={clsx(
        "group my-2 rounded-lg border-0 bg-transparent shadow-none transition-all duration-200 ease-in-out hover:bg-sidebar"
      )}
    >
      <CardHeader className="flex items-start justify-between">
        <UserInfo
          avatar={post.user?.avatar?.url || ""}
          username={post.user.username}
          displayname={post.user?.display_name ?? post.user.username}
          description={
            <PostCardCategoryTag category={post.category?.name || ""} />
          }
          size="sm"
          category={post.category.name}
          time={timeAgo(post.createdAt)}
        />

        <PostCardDropDown post={post} />
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div
            className={clsx(
              "transition-opacity duration-300",
              isGenerating && "opacity-40"
            )}
          >
            <MarkdownRenderer content={post.content} />
            {!showSummary ? null :
              <div className="mt-2 p-4 bg-muted/40 border rounded-xl">
                <div className="flex gap-2 items-center mb-3 font-medium text-primary text-sm">
                  <SparklesIcon className="size-4" />
                  AI Summary
                </div>

                <p className="leading-relaxed text-sm whitespace-pre-wrap">
                  {displayedSummary}

                  {displayedSummary.length < post.summary.length && (
                    <span className="animate-pulse">|</span>
                  )}
                </p>
              </div>
            }
          </div>

          {isGenerating && (
            <div className="p-4 space-y-2 border rounded-xl">
              <div className="h-4 bg-muted animate-pulse rounded" />
              <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
              <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
            </div>
          )}

          {(post.summary && !showSummary) &&
            <Button
              size="sm"
              variant="ghost"
              disabled={isGenerating}
              onClick={handleSummary}
              className="gap-2"
            >
              <SparklesIcon className="size-4" />
              AI Summary
            </Button>}
        </div>

        {post.attachments.length > 0 && (
          <div className="overflow-hidden mt-4 bg-foreground border rounded-xl">
            <img
              src={post.attachments[0].url}
              alt="post"
              className="
                object-contain
                max-h-105
                w-full
                transition
                aspect-square
                group-hover:scale-[1.01]
              "
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between mt-2 text-muted-foreground">
        <div className="flex gap-5 items-center">
          <LikeButton
            likes={post.likesCount}
            liked={post.liked}
            postId={post.id}
          />

          <CommentButton
            onClick={() =>
              navigate(`/p/${post.id}`, {
                state: { post },
              })
            }
          />

          <Button
            variant="ghost"
            size="icon"
            className="transition-all hover:bg-green-100 hover:text-green-500 rounded-full"
            onClick={async () => {
              await navigator.clipboard.writeText(
                `${window.location.origin}/p/${post.id}`
              );

              toast.success("Link copied!");
            }}
          >
            <Share2Icon className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="transition-all hover:bg-yellow-100 hover:text-yellow-500 rounded-full"
        >
          <Bookmark
            className={clsx(
              "h-4 w-4 transition", post.saved ? "fill-yellow-500 text-yellow-500" : ""
            )}
          />
        </Button>
      </CardFooter>
    </Card>
  );
});

PostCard.displayName = "PostCard";

export default PostCard;

