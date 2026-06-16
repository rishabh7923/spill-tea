import { Globe, Home, Plus, Shapes } from "lucide-react"
import { Button } from "./ui/button"
import SideBarLink from "./SideBarLink"
import { usePostEditor } from "@/features/post/create-edit-post/PostEditorProvider"

function FloatingSidebar() {
    const { openCreate } = usePostEditor();
    return (
        <div className="hidden mt-2 w-60 self-start sticky top-20 h-auto md:block">
            <div className="bg-sidebar md:flex flex-col gap-16 rounded-lg p-3">
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


            <div className="relative hidden overflow-hidden rounded-lg border px-3 py-2 md:block mt-8
    border-black/10 
    dark:border-white/10
     bg-linear-to-br
    from-neutral-50
    via-neutral-100
    to-neutral-200
    dark:from-neutral-900
    dark:via-neutral-950
    dark:to-black"
            >
                <div className="absolute -top-20 -left-20 h-44 w-44 rounded-full bg-black/4 blur-3xl dark:hidden" />

                <div className="absolute -top-20 -left-20 hidden h-44 w-44 rounded-full bg-white/10 blur-3xl dark:block" />

                <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.45),transparent_40%,rgba(0,0,0,0.03))]
        dark:bg-[linear-gradient(115deg,rgba(255,255,255,0.08),transparent_45%,rgba(255,255,255,0.02))]" />

                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-black/10 to-transparent dark:via-white/20" />

                <div className="absolute inset-0 opacity-[0.015] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                <div className="relative z-10 space-y-4">
                    <div className="inline-flex items-center rounded-full border border-black/10 bg-black/3 px-2 py-0.5 text-[10px] font-medium text-muted-foreground dark:border-white/10 dark:bg-white/5">
                        ✨ Premium
                    </div>

                    <div>
                        <h3 className="text-lg font-bold tracking-tight uppercase">
                            Spill Pro
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            Unlock advanced features and multiple image uploads.
                        </p>
                    </div>

                    <Button className="w-full bg-foreground text-background hover:opacity-90">
                        Upgrade
                    </Button>
                </div>
            </div>

        </div>

    )
}


export default FloatingSidebar