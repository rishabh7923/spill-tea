import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import clsx from "clsx"

type UserInfoProps = {
    avatar?: string
    name: string
    description?: React.ReactNode
    time?: string
    size?: "lg" | "md" | "sm"
}

export function UserInfo({
    avatar,
    name,
    description,
    time,
    size = "md",
}: UserInfoProps) {
    return (
        <div className="flex items-center gap-3">
            <Avatar
                className={clsx(
                    "shrink-0",
                    size === "sm" && "h-8 w-8",
                    size === "md" && "h-9 w-9",
                    size === "lg" && "h-12 w-12"
                )}
            >
                <AvatarImage src={avatar} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex flex-col">
                <div className="flex items-center gap-1.5">
                    <span className="truncate text-sm font-semibold">
                        {name}
                    </span>

                    {time && (
                        <span className="text-xs text-muted-foreground">
                            • {time}
                        </span>
                    )}
                </div>

                {description && (
                    <div className="mt-1">
                        {description}
                    </div>
                )}
            </div>
        </div>
    )
}