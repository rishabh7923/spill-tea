import { Heart, MessageCircle } from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "./ui/avatar"
import { ScrollArea } from "./ui/scroll-area"
import { Link } from "react-router-dom"

const discussions = [
    {
        id: 1,
        username: "Chad029",
        time: "19 mins ago",
        content:
            "Best way to master DSA without burning out?",
        likes: 123,
        comments: 12,
    },
    {
        id: 2,
        username: "Alex",
        time: "34 mins ago",
        content:
            "React Query or Zustand for large apps?",
        likes: 82,
        comments: 23,
    },
    {
        id: 3,
        username: "Sarah",
        time: "1 hour ago",
        content:
            "How are freshers getting internships lately?",
        likes: 201,
        comments: 41,
    },
]

function TrendingDiscussions() {
    return (
        <aside className="mt-4 hidden h-fit min-w-76 max-w-80 rounded-lg bg-sidebar text-foreground lg:block border">
            <div className="px-5 py-3">
                <h3 className="text-lg font-bold tracking-tight">
                    Trending Discussions
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                    Popular conversations right now
                </p>
            </div>

            <ScrollArea className="max-h-[28rem] px-3 pb-4">
                <div className="mt-2"></div>
                <div className="space-y-2">
                    {discussions.map((discussion) => (
                        <article
                            key={discussion.id}
                            className="
                group rounded-xl border border-transparent
                p-3 transition-all duration-200
                hover:border-border
                hover:-translate-y-1
                hover:bg-accent/30
              "
                        >
                            {/* top */}
                            <div className="flex items-start gap-3">
                                <Avatar className="h-9 w-9 shrink-0">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>
                                        {discussion.username[0]}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="truncate text-sm font-medium">
                                            {discussion.username}
                                        </span>

                                        <span className="text-xs text-muted-foreground">
                                            • {discussion.time}
                                        </span>
                                    </div>

                                    {/* content */}
                                    <Link to="" className="mt-2 line-clamp-2 text-sm leading-6 text-foreground transition-colors group-hover:text-primary group-hover:underline">
                                        {discussion.content}
                                    </Link>

                                    {/* stats */}
                                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                                        <div className="flex gap-1 items-center">
                                            <Heart className="w-3 h-3 transition active:scale-125 duration-100 ease-in-out" />
                                            <span>
                                                {discussion.likes}
                                            </span>
                                        </div>

                                        <div className="flex gap-1 items-center">
                                            <MessageCircle className="w-3 h-3 transition active:scale-125 duration-100 ease-in-out" />
                                            <span>
                                                {discussion.likes}
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </ScrollArea>
        </aside>
    )
}

export default TrendingDiscussions