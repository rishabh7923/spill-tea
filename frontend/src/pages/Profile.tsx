import Layout from "@/components/Layout"
import TrendingSection from "@/components/TrendingSection"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PostCard from "@/features/post/PostCard"
import UpdateProfileModal from "@/features/user/UpdateProfileModal"
import {
  CalendarDays,
  LinkIcon,
  MapPin,
} from "lucide-react"

const posts = [
  {
    id: 1,
    author: "Alex Rivera",
    comments: 24,

    content:
      'Does anyone else feel like dark mode is no longer just a "preference" but a necessity for late-night dev sessions?',
    createdAt: "2h",
    liked: false,
    saved: false,
    likes: 156,
    image: "",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    user: {
      id: 1,
      username: "Alex Rivera",
    },
    category: {
      name: "Question",
    },
  },
];

function Profile() {

  return (
    <Layout>
      <main className="max-w-xl w-full mx-auto min-h-screen border">
        {/* Banner */}
        <div className="h-60 w-full overflow-hidden bg-muted">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200"
            alt="banner"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Profile Section */}
        <section className="px-4">
          {/* Avatar + Actions */}
          <div className="flex items-start justify-between">
            <div className="-mt-16">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
                alt="user avatar"
                className="h-32 w-32 rounded-full border-4 border-background object-cover"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline">
                Share Profile
              </Button>

              <UpdateProfileModal/>
            </div>
          </div>

          {/* User Info */}
          <div className="mt-3">
            <h1 className="text-2xl font-bold">
              Alex Rivera
            </h1>

            <p className="text-lg text-muted-foreground">
              @arivera
            </p>

            <p className="mt-6 max-w-3xl text-muted-foreground leading-8">
              Computer Science Senior | Tech
              Enthusiast | Campus News Desk.
              Exploring the intersection of
              human-computer interaction and
              minimalist design aesthetics.
            </p>

            {/* Meta */}
            <div className="mt-5 flex flex-wrap gap-5 text-sm text-muted-foreground">
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
            </div>

            {/* Stats */}
            <div className="mt-6 flex gap-8 text-base">
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
            </div>
          </div>
        </section>

        {/* Tabs */}

        <section>
          <Tabs defaultValue="Posts">
            <TabsList className="mt-8 flex w-full border-b border-border" variant="line">
              {["posts", "replies", "media", "likes"].map(tab => <TabsTrigger className="flex-1 capitalize text-lg mb-0" value={tab}>{tab}</TabsTrigger>)}
            </TabsList>
            <TabsContent value="posts">
              {/* Posts */}
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    {...post}
                  />
                ))}
              </TabsContent>
            <TabsContent value="replies">coming soon...</TabsContent>
            <TabsContent value="media">coming soon...</TabsContent>
            <TabsContent value="likes">coming soon...</TabsContent>
          </Tabs>
        </section>

      </main>
      <TrendingSection />
    </Layout>
  )
}

export default Profile