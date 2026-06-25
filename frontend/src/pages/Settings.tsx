import Layout from "@/components/Layout"
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

export default function Settings() {
    const navigate = useNavigate();
    const location = useLocation();

    const tab =
        location.pathname.split("/").pop() || "profile";

    return (
        <Layout>
            <h1 className="p-2 text-3xl font-bold">Settings</h1>

            <Tabs defaultValue={tab} className="mt-4">
                <TabsList variant="line">
                    <TabsTrigger onClick={() => navigate("profile")} value="profile">Profile</TabsTrigger>
                    <TabsTrigger onClick={() => navigate("preferences")} value="preferences">Preferences</TabsTrigger>
                    <TabsTrigger onClick={() => navigate("account")} value="account">Account</TabsTrigger>
                    <TabsTrigger onClick={() => navigate("privacy")} value="privacy">Privacy</TabsTrigger>
                    {/* <TabsTrigger onClick={() => navigate("support")} value="support">Support</TabsTrigger> */}
                </TabsList>
                <Outlet />

            </Tabs>
        </Layout>
    )
}