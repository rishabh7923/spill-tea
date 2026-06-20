import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function UserIcon({ url }: { url: string }) {
    return (
        <div>
            <Avatar className="h-8 w-8 shrink-0 mt-3">
                <AvatarImage src={url} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}

export default UserIcon