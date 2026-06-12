import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil } from "lucide-react"
import { useState } from "react";
import useAvatars from "@/features/avatars/hooks/useAvatars";

const a = new Array({ length: 10 })
function AvatarPicker(
    { value, onChange }:
        { value: number, onChange: (avatarId: number) => void }
) {
    const { avatars, status } = useAvatars();
    const [open, setOpen] = useState(false);
    return (
        <div className="self-start mt-3 w-full">
            <div className="relative inline-block">
                <Avatar className="h-16 w-16">
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <Button
                    className="absolute -bottom-1 -right-1 flex items-center justify-center h-6 w-6 rounded-4xl border-2 shadow"
                    type="button"
                    size="icon"
                    onClick={() => setOpen(s => !s)}
                >
                    <Pencil />
                </Button>
            </div>
            {open && <ScrollArea className="h-40 border rounded mt-4 w-full">
                <div className="flex flex-wrap p-3 gap-4">
                    {
                        status === "pending" ?
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            a.map(_ => <Skeleton className="rounded-full h-16 w-16" />) :
                            <>
                                <Avatar className="h-16 w-16 border" key="0-av" onClick={() => onChange(0)}>
                                    <AvatarImage
                                        src={""}
                                        alt={"UN"}
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                    {<AvatarBadge className="bg-green-600 dark:bg-green-800" />}
                                </Avatar>
                                {
                                    avatars?.map(av =>
                                        <Avatar className="h-16 w-16 border" key={`${av.name}-${av.id}`} onClick={() => onChange(av.id)}>
                                            <AvatarImage
                                                src={av.url}
                                                alt={av.name}
                                            />
                                            <AvatarFallback>CN</AvatarFallback>
                                            {<AvatarBadge className="bg-green-600 dark:bg-green-800" />}
                                        </Avatar>)
                                }
                            </>
                    }

                </div>
            </ScrollArea>}
        </div>
    )
}

export default AvatarPicker