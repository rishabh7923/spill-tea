import type { Comment } from '@/types/comment';

function useReplies(): Record<"replies", Comment[]> {
    const replies = [
        {
            id: "1",
            content: "This feature looks really clean 🔥 Great work!",
            created_at: new Date("2026-06-14T10:15:00"),
            user: {
                id: "u1",
                email: "alex@example.com",
                displayname: "Alex Johnson",
                displayName: "Alex Johnson",
                username: "alexj",
                bio: "Frontend developer & coffee addict ☕",
                verified: 1,
                avatar: {
                    id: 1,
                    name: "avatar-1.png",
                    url: "https://i.pravatar.cc/150?img=1",
                    publicId: "avatar_1",
                },
            },
            replies: 1
        },
        {
            id: "2",
            content: "I think the spacing between cards can be improved a bit.",
            created_at: new Date("2026-06-14T11:30:00"),
            user: {
                id: "u2",
                email: "sarah@example.com",
                displayname: "Sarah Lee",
                displayName: "Sarah Lee",
                username: "sarahlee",
                bio: "UI/UX Designer",
                verified: 0,
                avatar: {
                    id: 2,
                    name: "avatar-2.png",
                    url: "https://i.pravatar.cc/150?img=5",
                    publicId: "avatar_2",
                },
            },
            replies: 0
        },
        {
            id: "3",
            content: "Damn, this actually feels smooth. Looking forward to more updates!",
            created_at: new Date("2026-06-14T12:45:00"),
            user: {
                id: "u3",
                email: "mike@example.com",
                displayname: "Mike Ross",
                displayName: "Mike Ross",
                username: "mikeross",
                bio: "Fullstack dev 🚀",
                verified: 1,
                avatar: {
                    id: 3,
                    name: "avatar-3.png",
                    url: "https://i.pravatar.cc/150?img=8",
                    publicId: "avatar_3",
                },
            },
            replies: 0
        },
        {
            id: "4",
            content: "Can you add dark mode support too?",
            created_at: new Date("2026-06-14T14:20:00"),
            user: {
                id: "u4",
                email: "emma@example.com",
                displayname: "Emma Wilson",
                displayName: "Emma Wilson",
                username: "emmaw",
                bio: "Building cool things ✨",
                verified: 0,
                avatar: {
                    id: 4,
                    name: "avatar-4.png",
                    url: "https://i.pravatar.cc/150?img=10",
                    publicId: "avatar_4",
                },
            },
            replies: 0
        },
        {
            id: "5",
            content: "Nice implementation. The animations feel subtle and not overdone.",
            created_at: new Date("2026-06-14T15:50:00"),
            user: {
                id: "u5",
                email: "david@example.com",
                displayname: "David Kim",
                displayName: "David Kim",
                username: "davidk",
                bio: "React + TypeScript enthusiast",
                verified: 1,
                avatar: {
                    id: 5,
                    name: "avatar-5.png",
                    url: "https://i.pravatar.cc/150?img=12",
                    publicId: "avatar_5",
                },
            },
            replies: 0
        },
    ];
    return { replies };
}

export default useReplies