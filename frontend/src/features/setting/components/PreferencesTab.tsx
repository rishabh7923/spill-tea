import SettingRow from "./SettingRow"
import { Bell, ChevronRight, Globe, Paintbrush, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import SettingDialog from "./SettingDialog"
import { ToggleTheme } from "@/components/ToggleTheme"

function PreferencesTab() {
    return (
        <section>
            <SettingRow
                icon={Bell}
                title="Notifications"
                description="Receive updates and announcements"
                right={<Switch defaultChecked />}
            />

            <SettingRow
                icon={Paintbrush}
                title="Appearance"
                description="Dark"
                right={
                    <SettingDialog
                        title="Appearance"
                        trigger={
                            <Button className="group-hover:bg-accent rounded-full" variant="ghost" size="icon">
                                <ChevronRight />
                            </Button>}>
                        <ToggleTheme />
                    </SettingDialog>
                }
            />

            <SettingRow
                icon={Globe}
                title="Language"
                description="English"
                right={
                    <Button className="group-hover:bg-accent rounded-full" variant="ghost" size="icon">
                        <ChevronRight />
                    </Button>}
            />

            <SettingRow
                icon={Shield}
                title="Privacy"
                description="Manage your privacy settings"
                right={
                    <Button className="group-hover:bg-accent rounded-full" variant="ghost" size="icon">
                        <ChevronRight />
                    </Button>}
            />
        </section>
    )
}

export default PreferencesTab