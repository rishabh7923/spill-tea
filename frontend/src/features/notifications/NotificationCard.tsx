import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface NotificationCardProps {
    avatar: string;
    title: string;
    description?: string;
    time: string;
    unread?: boolean;
}

export function NotificationCard({
    avatar,
    title,
    description,
    time,
    unread,
}: NotificationCardProps) {
    return (
        <button
            className={cn(
                "w-full rounded-xl border p-4 text-left transition-colors",
                "hover:bg-muted/50"
            )}
        >
            <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={avatar} />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                        <p className="line-clamp-1 text-sm font-medium">
                            {title}
                        </p>

                        <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs text-muted-foreground">
                                {time}
                            </span>

                            {unread && (
                                <div className="size-2 rounded-full bg-primary" />
                            )}
                        </div>
                    </div>

                    {description && (
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </button>
    );
}