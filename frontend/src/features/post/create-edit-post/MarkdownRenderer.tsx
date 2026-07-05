import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownRenderer({
  content,
}: {
  content: string;
}) {

  return (
    <div className="
    prose
    dark:prose-invert
    prose-p:my-0
    prose-headings:my-1
    prose-ul:my-1
    prose-ol:my-1
    prose-blockquote:my-1 
    max-w-none 
    whitespace-pre-wrap">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="my-0 text-muted-foreground">
              {children}
            </p>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}