import { useState } from "react";
import SettingRow from "./SettingRow";
import SettingDialog from "./SettingDialog";
import { Bell, ChevronRight, Globe, Moon, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const settings = [
    {
        id: "messages",
        icon: Moon,
        title: "Who can message me",
        description: "Control who can send you direct messages.",
    },
    {
        id: "blocked-users",
        icon: Globe,
        title: "Blocked users",
        description: "Manage people you've blocked.",
    },
    {
        id: "privacy",
        icon: Shield,
        title: "Privacy settings",
        description: "Manage your privacy preferences.",
    },
] as const;

export default function PrivacyTab() {
    const [activeSetting, setActiveSetting] = useState<
        (typeof settings)[number] | null
    >(null);

    return (
        <>
            <section>
                <SettingRow
                    icon={Bell}
                    title="Private account"
                    description="Only approved followers can view your profile."
                    right={<Switch defaultChecked />}
                    onClick={() => { }}
                />

                {settings.map((setting) => (
                    <SettingRow
                        key={setting.id}
                        icon={setting.icon}
                        title={setting.title}
                        description={setting.description}
                        onClick={() => setActiveSetting(setting)}
                        right={
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                            >
                                <ChevronRight />
                            </Button>
                        }
                    />
                ))}
            </section>

            <SettingDialog
                open={!!activeSetting}
                onOpenChange={(open) => {
                    if (!open) setActiveSetting(null);
                }}
                title={activeSetting?.title ?? ""}
                description={activeSetting?.description}
                onSubmit={() => {
                    setActiveSetting(null);
                }}
            >
                {activeSetting?.id === "messages" && (
                    <div>
                        Message settings content here
                    </div>
                )}

                {activeSetting?.id === "blocked-users" && (
                    <div>
                        Blocked users management here
                    </div>
                )}

                {activeSetting?.id === "privacy" && (
                    <div>
                        Privacy settings controls here
                    </div>
                )}
            </SettingDialog>
        </>
    );
}