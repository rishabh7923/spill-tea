import { useState } from "react";
import SettingRow from "./SettingRow";
import SettingDialog from "./SettingDialog";
import { Download, KeyRound, Mail, Trash2 } from "lucide-react";

const settings = [
    {
        id: "email",
        icon: Mail,
        title: "Email",
        description: "Update your email address",
    },
    {
        id: "password",
        icon: KeyRound,
        title: "Change Password",
        description: "Update your password",
    },
    {
        id: "export",
        icon: Download,
        title: "Export Data",
        description: "Download a copy of your data",
    },
    {
        id: "delete",
        icon: Trash2,
        title: "Delete Account",
        description: "Permanently delete your account",
        danger: true,
    },
] as const;

function AccountTab() {
    const [activeSetting, setActiveSetting] = useState<
        (typeof settings)[number] | null
    >(null);

    return (
        <>
            <section>
                {settings.map((setting) => (
                    <SettingRow
                        key={setting.id}
                        icon={setting.icon}
                        title={setting.title}
                        description={setting.description}
                        danger={"danger" in setting && setting.danger}
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
                onSubmit={() => {
                    setActiveSetting(null);
                }}
            >
                {activeSetting?.id === "email" && (
                    <p>Email update form goes here.</p>
                )}

                {activeSetting?.id === "password" && (
                    <p>Password change form goes here.</p>
                )}

                {activeSetting?.id === "export" && (
                    <p>Export data options go here.</p>
                )}

                {activeSetting?.id === "delete" && (
                    <p className="text-destructive">
                        This action cannot be undone.
                    </p>
                )}
            </SettingDialog>
        </>
    );
}

export default AccountTab;