import { Badge } from "@/components/ui/badge"

const categoryStyles: Record<string, string> = {
  meme: "bg-yellow-100 text-yellow-800 border-yellow-300",
  confession: "bg-pink-100 text-pink-800 border-pink-300",
  question: "bg-blue-100 text-blue-800 border-blue-300",
  general: "bg-gray-100 text-gray-800 border-gray-300",
  issues: "bg-red-100 text-red-800 border-red-300",
};

function PostCardCategoryTag({ category }: { category: string }) {
  const style =
    categoryStyles[category.toLowerCase()] ||
    "bg-gray-100 text-gray-800 border-gray-300";

  return (
    <Badge variant="secondary" className={`h-5 rounded-full px-2 text-xs capitalize border ${style}`}>
      {category}
    </Badge>
  );
}

export default PostCardCategoryTag;