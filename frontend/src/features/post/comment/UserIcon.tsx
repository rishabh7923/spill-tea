import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function UserIcon({ url }: { url: string }) {
    return (
        <div>
            <Avatar>
                <AvatarImage src={url} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}

export default UserIcon