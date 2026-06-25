import { Navigate } from "react-router-dom"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Layout from "@/components/Layout"
import { useAuth } from "@/features/auth/context/AuthContext"
import { UserInfo } from "@/features/user/components/UserInfo"

function Profile() {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) return <Navigate to="login" replace />
  return (
    <Layout>
      <main className="mx-auto max-w-5xl">
        {/* Header */}
        <section className=" px-6 py-6">
          <div className="flex items-start gap-5">
            <UserInfo
              avatar={user?.avatar?.url}
              name={user!.display_name}
              description={`u/${user?.username}`}
            />
          </div>
        </section>

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <TabsList
            variant="line"
            className="w-full justify-start rounded-none border-b bg-transparent px-6"
          >
            <TabsTrigger value="overview">
              Overview
            </TabsTrigger>

            <TabsTrigger value="posts">
              Posts
            </TabsTrigger>

            <TabsTrigger value="comments">
              Comments
            </TabsTrigger>

            <TabsTrigger value="saved">
              Saved
            </TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="mt-0">

            {/* Recent Activity */}
            <div className="rounded-xl border p-6 text-center text-muted-foreground">
              Recent posts and comments will appear here.
            </div>

          </TabsContent>

          {/* Posts */}
          <TabsContent value="posts" className="mt-0">
            <div className="rounded-xl border p-6 text-center text-muted-foreground">
              User posts go here.
            </div>
          </TabsContent>

          {/* Comments */}
          <TabsContent value="comments" className="mt-0">
            <div className="rounded-xl border p-6 text-center text-muted-foreground">
              User comments go here.
            </div>
          </TabsContent>

          {/* Saved */}
          <TabsContent value="saved" className="mt-0">
            <div className="rounded-xl border p-6 text-center text-muted-foreground">
              Saved posts go here.
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </Layout>
  )
}

export default Profile