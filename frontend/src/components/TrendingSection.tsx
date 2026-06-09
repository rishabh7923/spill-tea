import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ScrollArea } from "./ui/scroll-area"

function TrendingSection() {
    return (
        <aside className='hidden border min-w-76 max-h-96 max-w-80 bg-popover rounded-lg my-2 text-foreground lg:block lg:py-4 sticky top-20'>
            <ScrollArea className='h-full'>
                <h3 className='text-xl mb-3 tracking-wide capitalize font-bold px-4'>
                    Trending Discussions
                </h3>
                <div className="divide-y">
                    <article className="items-start text-sm p-2 lg:p-4">
                        <div className="flex gap-2 mb-2">
                            <Avatar size="sm">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <span>Chad029</span>
                            <div className="text-muted-foreground">
                                19 mins ago
                            </div>
                        </div>

                        <p className="font-medium mb-2">
                            Lorem ipsum dolor si Impedit suscipit totam perferendis culpa. Dolore!
                        </p>

                        <div className='space-x-2 text-sm'>
                            <span>123 likes</span> <span>12 comments</span>
                        </div>

                    </article>

                    <article className="items-start text-sm p-2 lg:p-4">

                        <div className="flex gap-2 mb-2">
                            <Avatar size="sm">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <span>Chad029</span>
                            <div className="text-muted-foreground">
                                19 mins ago
                            </div>
                        </div>
                        <p className="font-medium mb-2">
                            Lorem ipsum dolor si Impedit suscipit totam perferendis culpa. Dolore!
                        </p>
                        <div className='space-x-2 text-sm'>
                            <span>123 likes</span> <span>12 comments</span>
                        </div>
                    </article>
                    <article className="items-start text-sm p-2 lg:p-4">

                        <div className="flex gap-2 mb-2">
                            <Avatar size="sm">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <span>Chad029</span>
                            <div className="text-muted-foreground">
                                19 mins ago
                            </div>
                        </div>
                        <p className="font-medium mb-2">
                            Lorem ipsum dolor si Impedit suscipit totam perferendis culpa. Dolore!
                        </p>
                        <div className='space-x-2 text-sm'>
                            <span>123 likes</span> <span>12 comments</span>
                        </div>
                    </article>
                </div>
            </ScrollArea>
        </aside>)
}

export default TrendingSection