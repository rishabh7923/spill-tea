import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Layout from "@/components/Layout"
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export default function Settings() {
    const navigate = useNavigate();
    const location = useLocation();
    const tab = location.pathname.split("/").pop();
    return (
        <Layout>
            <h1 className="p-2 text-3xl font-bold">Settings</h1>
            <div className="-mt-2">
                <Tabs defaultValue={tab === "settings" ? "profile" : tab} className="mt-4">
                    <TabsList variant="line">
                        <TabsTrigger onClick={() => navigate("profile")} value="profile">Profile</TabsTrigger>
                        <TabsTrigger onClick={() => navigate("preferences")} value="preferences">Preferences</TabsTrigger>
                        <TabsTrigger onClick={() => navigate("account")} value="account">Account</TabsTrigger>
                        <TabsTrigger onClick={() => navigate("privacy")} value="privacy">Privacy</TabsTrigger>
                        {/* <TabsTrigger onClick={() => navigate("support")} value="support">Support</TabsTrigger> */}
                    </TabsList>
                    <Outlet />

                </Tabs>
            </div>
        </Layout >
    )
}