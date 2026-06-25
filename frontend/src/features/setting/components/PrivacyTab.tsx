import SettingRow from "./SettingRow"
import { Bell, ChevronRight, Globe, Moon, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

function PrivacyTab() {
    return (
        <section>
            <SettingRow
                icon={Bell}
                title="Private account"
                description="ROnly approved followers can view your profile."
                right={<Switch defaultChecked />}
            />

            <SettingRow
                icon={Moon}
                title="Who can message me"
                description="Control who can send you direct messages."
                right={
                    <Button className="group-hover:bg-accent rounded-full" variant="ghost" size="icon">
                        <ChevronRight />
                    </Button>
                }
            />

            <SettingRow
                icon={Globe}
                title="Blocked user"
                description="Manage people you've blocked from interacting here."
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

export default PrivacyTab