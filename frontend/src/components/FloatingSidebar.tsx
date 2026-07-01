import { Globe, Home, Plus, Shapes } from "lucide-react"
import { Button } from "./ui/button"
import SideBarLink from "./SideBarLink"
import { usePostEditor } from "@/features/post/create-edit-post/PostEditorProvider"

function FloatingSidebar() {
    const { openCreate } = usePostEditor();
    return (
        <div className="hidden w-60 self-start mt-4 md:block">
            <div className="bg-sidebar md:flex flex-col gap-16 rounded-lg p-3 border">
                <ul className="space-y-4">
                    <SideBarLink to="/">
                        <Home /> Home
                    </SideBarLink>
                    <SideBarLink to="/explore">
                        <Globe />Explore
                    </SideBarLink>
                    <SideBarLink to="/communities">
                        <Shapes /> Communities
                    </SideBarLink>
                </ul>
                <div className="justify-self-end space-y-2">
                    <Button className='w-full' onClick={() => openCreate()}>
                        <Plus />
                        <span>
                            Create
                        </span>
                    </Button>
                </div>
            </div>


            <div
                className="
    relative
    mt-8
    hidden
    overflow-hidden
    border
    border-border
    bg-card
    p-5
    text-card-foreground
    md:block
  "
            >
                {/* Glow */}
                <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />

                {/* Shine */}
                <div
                    className="
      absolute inset-0
      bg-[linear-gradient(120deg,rgba(255,255,255,0.08),transparent_40%,rgba(255,255,255,0.02))]
      dark:bg-[linear-gradient(120deg,rgba(255,255,255,0.04),transparent_40%,rgba(255,255,255,0.01))]
    "
                />

                {/* Top Border */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                {/* Content */}
                <div className="relative z-10 space-y-5">
                    <div
                        className="
        inline-flex
        items-center
        gap-1
        rounded-full
        border
        border-border
        bg-secondary
        px-3
        py-1
        text-xs
        font-medium
        text-secondary-foreground
      "
                    >
                        ✨ Spill Pro
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xl font-bold tracking-tight">
                            Unlock More
                        </h3>

                        <p className="text-sm leading-relaxed text-muted-foreground">
                            Enhance your profile, upload more content and get access to
                            upcoming features before everyone else.
                        </p>
                    </div>

                    {/* <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                            <span className="text-primary">✓</span>
                            Multiple image uploads
                        </li>

                        <li className="flex items-center gap-2">
                            <span className="text-primary">✓</span>
                            Profile customization
                        </li>

                        <li className="flex items-center gap-2">
                            <span className="text-primary">✓</span>
                            Priority media processing
                        </li>

                        <li className="flex items-center gap-2">
                            <span className="text-primary">✓</span>
                            Early access features
                        </li>
                    </ul> */}

                    <Button
                        className="
        w-full
        bg-primary
        text-primary-foreground
        hover:bg-primary/90
      "
                    >
                        Upgrade to Pro
                    </Button>
                </div>
            </div>

        </div>

    )
}


export default FloatingSidebar