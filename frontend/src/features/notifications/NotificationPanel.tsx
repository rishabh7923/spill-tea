import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight, X } from "lucide-react"
import type { ReactNode } from "react"
import { NotificationCard } from "./NotificationCard"

const notifications = [
    {
        id: "1",
        type: "like",
        avatar: "https://i.pravatar.cc/150?img=1",
        title: "Arjun liked your post",
        description: '"Just shipped a new project! 🚀"',
        time: "2m",
        unread: true,
    },
    {
        id: "2",
        type: "comment",
        avatar: "https://i.pravatar.cc/150?img=2",
        title: "Sneha commented on your post",
        description: '"This is super helpful, thanks! 🙌"',
        time: "10m",
        unread: true,
    },
    {
        id: "3",
        type: "repost",
        avatar: "https://i.pravatar.cc/150?img=3",
        title: "Rohan reposted your post",
        description: '"React Server Components are game changers"',
        time: "30m",
        unread: true,
    },
    {
        id: "4",
        type: "follow",
        avatar: "https://i.pravatar.cc/150?img=4",
        title: "Meera started following you",
        time: "1h",
        unread: true,
    },
    {
        id: "5",
        type: "mention",
        avatar: "https://i.pravatar.cc/150?img=5",
        title: "Karan mentioned you in a comment",
        description: "@ajay check this out!",
        time: "Yesterday",
        unread: false,
    },
    {
        id: "6",
        type: "mention",
        avatar: "https://i.pravatar.cc/150?img=6",
        title: "Karan mentioned you in a comment",
        description: "@ajay check this out!",
        time: "Yesterday",
        unread: false,
    },
];

function NotificationPanel({ children }: { children: ReactNode }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-105 p-0 max-w-full"
            >
                <div className="flex items-center justify-between border-b p-4">
                    <h3 className="font-semibold">Notifications</h3>
                    <X className="size-4" />
                </div>

                <ScrollArea className="h-100">
                    <div className="p-4 space-y-4">
                        {notifications.map((notification) => (
                            <NotificationCard
                                key={notification.id}
                                {...notification}
                            />
                        ))}
                    </div>
                </ScrollArea>

                <div className="border-t p-2 text-center">
                    <Button className="mx-auto text-neutral flex justify-center items-center gap-2" variant="link">
                        View All Notifications <ChevronRight />
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default NotificationPanel