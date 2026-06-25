import SettingRow from "./SettingRow"
import { Bell, ChevronRight, Globe, Moon, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

function AccountTab() {
    return (
        <section>
            <SettingRow
                icon={Bell}
                title="Email"
                description="Update your email"
                right={
                    <Button className="group-hover:bg-accent rounded-full" variant="ghost" size="icon">
                        <ChevronRight />
                    </Button>}
            />

            <SettingRow
                icon={Moon}
                title="Change Password"
                description="Update Your password"
                right={
                    <Button className="group-hover:bg-accent rounded-full" variant="ghost" size="icon">
                        <ChevronRight />
                    </Button>
                }
            />

            <SettingRow
                icon={Globe}
                title="Export data"
                description="Download a copy of your data"
                right={
                    <Button className="group-hover:bg-accent rounded-full" variant="ghost" size="icon">
                        <ChevronRight />
                    </Button>}
            />

            <SettingRow
                icon={Shield}
                title="Delete Account"
                danger={true}
                description="Permanently delete your account"
                right={
                    <Button className="group-hover:bg-accent rounded-full" variant="ghost" size="icon">
                        <ChevronRight />
                    </Button>}
            />
        </section>
    )
}

export default AccountTab