import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import PostCardCategoryTag from "@/features/post/PostCardCategoryTag"

type UserInfoProps = {
    avatar?: string
    username: string,
    displayname: string,
    description?: React.ReactNode
    category?: string
    time?: string
    size?: "lg" | "md" | "sm"
}

export function UserInfo({
    avatar,
    username,
    displayname,
    time,
    category
}: UserInfoProps) {
    return (
        <div className="flex gap-3.5">
            <Avatar className="h-10 w-10">
                <AvatarImage src={avatar} alt="author avatar" />
                <AvatarFallback>UK</AvatarFallback>
            </Avatar>

            <div className="info">
                <span className="font-medium">{displayname || username}</span>  <span className="text-base text-muted-foreground">{"  "}@{username}</span>

                <div className="flex gap-2 items-center text-sm text-muted-foreground">
                    <span>{time}</span>
                    {category ?
                        <>
                            <span>•</span>
                            <PostCardCategoryTag category={category} />
                        </>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}