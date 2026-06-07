import clsx from "clsx";
import { Badge } from "lucide-react"

type Category = "News" | "Confession" | "Question" | "General" | "Meme" | "Issue";
const categoryStyles: Record<Category, string> = {
    News: "bg-blue-100 text-blue-700 border-blue-300",
    Confession: "bg-rose-200 text-rose-700 border-rose-500",
    Question: "bg-yellow-100 text-yellow-700 border-yellow-300",
    General: "bg-gray-100 text-gray-700 border-gray-300",
    Meme: "bg-purple-100 text-purple-700 border-purple-300",
    Issue: "bg-red-100 text-red-700 border-red-300",
};

function PostCategoryBadge(category: Category) {
    const classname = clsx("text-xs font uppercase", categoryStyles[category])
    return (
        <Badge className={classname}>{category} </Badge>

    )
}

export default PostCategoryBadge