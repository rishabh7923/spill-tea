import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownRenderer({
  content,
}: {
  content: string;
}) {

  return (
    <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          br: () => <br />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}