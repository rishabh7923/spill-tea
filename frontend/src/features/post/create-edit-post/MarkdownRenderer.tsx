import ReactMarkdown from "react-markdown";

export default function MarkdownRenderer({
  content,
}: {
  content: string;
}) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="text-2xl font-bold">
            {children}
          </h1>
        ),

        h2: ({ children }) => (
          <h2 className="text-xl font-semibold">
            {children}
          </h2>
        ),

        h3: ({ children }) => (
          <h3 className="text-lg font-semibold">
            {children}
          </h3>
        ),

        p: ({ children }) => (
          <p className="text-sm leading-7">
            {children}
          </p>
        ),

        strong: ({ children }) => (
          <strong className="font-bold">
            {children}
          </strong>
        ),

        em: ({ children }) => (
          <em className="italic">
            {children}
          </em>
        ),

        blockquote: ({ children }) => (
          <blockquote className="border-l-4 pl-4 italic text-muted-foreground my-4">
            {children}
          </blockquote>
        ),

        ol: ({ children }) => (
          <ol className="list-decimal pl-6 my-4 space-y-2">
            {children}
          </ol>
        ),

        ul: ({ children }) => (
          <ul className="list-disc pl-6 my-4 space-y-2">
            {children}
          </ul>
        ),

        li: ({ children }) => (
          <li>
            {children}
          </li>
        ),

        code: ({ children }) => (
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
            {children}
          </code>
        ),

        hr: () => (
          <hr className="my-6 border-border" />
        ),

        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-primary underline underline-offset-4 hover:opacity-80"
          >
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}