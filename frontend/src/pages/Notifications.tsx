import Layout from "@/components/Layout"
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { NotificationCard } from "@/features/notifications/NotificationCard";

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

export default function Notifications() {
    return (
        <Layout>
            <h1 className="p-2 text-3xl font-bold">Notifications</h1>
            <div className="m-2">
                <Tabs defaultValue="all" className="mt-4">
                    <TabsList className="gap-4 my-2">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="unread">Unread</TabsTrigger>
                        <TabsTrigger value="read">Read</TabsTrigger>
                    </TabsList>
                </Tabs>
                <section>
                    <div className="p-4 space-y-4">
                        {notifications.map((notification) => (
                            <NotificationCard
                                key={notification.id}
                                {...notification}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </Layout >
    )
}