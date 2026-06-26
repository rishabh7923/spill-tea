import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import PostCardCategoryTag from "@/features/post/PostCardCategoryTag"

type UserInfoProps = {
    avatar?: string
    name: string
    description?: React.ReactNode
    category?: string
    time?: string
    size?: "lg" | "md" | "sm"
}

export function UserInfo({
    avatar,
    name,
    time,
    category
}: UserInfoProps) {
    return (
        <div className="flex gap-3.5">
            <Avatar className="h-12 w-12">
                <AvatarImage src={avatar} alt="author avatar" />
                <AvatarFallback>UK</AvatarFallback>
            </Avatar>

            <div className="info">
                <h3 className="font-medium">{name}</h3>

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