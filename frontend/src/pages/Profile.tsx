import Layout from "@/components/Layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/features/auth/context/AuthContext"
import UpdateProfileModal from "@/features/user/components/update-profile/UpdateProfileModal"
// import {
//   CalendarDays,
//   LinkIcon,
//   MapPin,
// } from "lucide-react"

function Profile() {
  const { user } = useAuth();
  return (
    <Layout>

      <main className="mx-auto min-h-screen border">
        {/* Banner */}
        <div className="h-60 w-full overflow-hidden bg-muted">
          <img
            src={"https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200"}
            alt="banner"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Profile Section */}
        <section className="px-4">
          {/* Avatar + Actions */}
          <div className="flex items-start justify-between">
            <Avatar className="h-20 w-20 -top-9">
              <AvatarImage src={user?.avatar.url} />
              <AvatarFallback>{user?.displayName.slice(2).toLocaleUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="flex gap-3 pt-4">
              <Button variant="outline">
                Share Profile
              </Button>

              <UpdateProfileModal />
            </div>
          </div>

          {/* User Info */}
          <div className="-top-4 relative">
            <h1 className="text-2xl font-bold">
              {user?.displayName}
            </h1>

            <p className="text-lg text-muted-foreground">
              @{user?.username}
            </p>

            <p className="mt-2 text-sm max-w-3xl text-muted-foreground leading-8 whitespace-pre-line">
              {user?.bio}
            </p>

            {/* Meta */}
            {/* <div className="mt-5 flex flex-wrap gap-5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                San Francisco, CA
              </div>

              <div className="flex items-center gap-2">
                <LinkIcon size={16} />
                <a
                  href="https://arivera.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  arivera.dev
                </a>
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                Joined March 2021
              </div>
            </div> */}

            {/* Stats */}
            {/* <div className="mt-6 flex gap-8 text-base">
              <div>
                <span className="font-bold">
                  1,284
                </span>{" "}
                <span className="text-muted-foreground">
                  Following
                </span>
              </div>

              <div>
                <span className="font-bold">
                  8.5K
                </span>{" "}
                <span className="text-muted-foreground">
                  Followers
                </span>
              </div>

              <div>
                <span className="font-bold">
                  412
                </span>{" "}
                <span className="text-muted-foreground">
                  Posts
                </span>
              </div>
            </div> */}
          </div>

        </section>

        {/* Tabs */}

        <section>
          <Tabs defaultValue="Posts">
            <TabsList className="flex w-full border-b border-border" variant="line">
              {["overview", "posts", "comments",].map(tab => <TabsTrigger className="flex-1 capitalize text-lg mb-0" value={tab}>{tab}</TabsTrigger>)}
            </TabsList>
            <TabsContent className="px-4" value="posts">
              {/* Posts */}

            </TabsContent>
            <TabsContent value="replies">coming soon...</TabsContent>
            <TabsContent value="media">coming soon...</TabsContent>
            <TabsContent value="likes">coming soon...</TabsContent>
          </Tabs>
        </section>

      </main>
    </Layout>
  )
}

export default Profile