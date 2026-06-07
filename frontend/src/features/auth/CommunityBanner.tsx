import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function CommunityBanner() {
  return (
    <div className="flex items-center gap-8">
      <div className="flex -space-x-3">
        <Avatar size="lg" className="border-2 border-background">
          <AvatarImage src="https://i.pravatar.cc/100?img=1" />
          <AvatarFallback>U1</AvatarFallback>
        </Avatar>

        <Avatar size="lg" className="border-2 border-background">
          <AvatarImage src="https://i.pravatar.cc/100?img=2" />
          <AvatarFallback>U2</AvatarFallback>
        </Avatar>

        <Avatar size="lg" className="border-2 border-background">
          <AvatarImage src="https://i.pravatar.cc/100?img=3" />
          <AvatarFallback>U3</AvatarFallback>
        </Avatar>

        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted text-sm font-medium">
          +5k
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Join <span className="font-semibold">5,000+</span> students from
        <span className="font-medium"> Obsidian University</span>
      </p>
    </div>
  );
}

export default CommunityBanner;