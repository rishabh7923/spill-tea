import { useState } from "react";
import SettingRow from "./SettingRow";
import SettingDialog from "./SettingDialog";
import { Bell, Globe, Paintbrush, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { ToggleTheme } from "@/components/ToggleTheme";

const settings = [
    {
        id: "appearance",
        icon: Paintbrush,
        title: "Appearance",
        description: "Customize how the app looks.",
    },
    {
        id: "language",
        icon: Globe,
        title: "Language",
        description: "Choose your preferred language.",
    },
    {
        id: "privacy",
        icon: Shield,
        title: "Privacy",
        description: "Manage your privacy settings.",
    },
] as const;

function PreferencesTab() {
    const [activeSetting, setActiveSetting] = useState<
        (typeof settings)[number] | null
    >(null);

    return (
        <>
            <section>
                <SettingRow
                    icon={Bell}
                    title="Notifications"
                    description="Receive updates and announcements."
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
                onSubmit={() => setActiveSetting(null)}
            >
                {activeSetting?.id === "appearance" && (
                    <ToggleTheme />
                )}

                {activeSetting?.id === "language" && (
                    <p>Select your preferred language.</p>
                )}

                {activeSetting?.id === "privacy" && (
                    <p>Configure privacy preferences.</p>
                )}
            </SettingDialog>
        </>
    );
}

export default PreferencesTab;