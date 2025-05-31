import Markdown from "react-markdown";
import styles from "./trusted-markdown.module.css";

type TrustedMarkdownProps = Readonly<{
  children: string;
}>;

export function TrustedMarkdown({ children }: TrustedMarkdownProps) {
  return (
    <div className={styles.markdown}>
      <Markdown
        components={{
          a: ({ href, children: linkChildren, ...props }) => {
            const external = href?.startsWith("https://") || href?.startsWith("http://");

            return (
              <a
                {...props}
                href={href}
                rel={external ? "noreferrer" : undefined}
                target={external ? "_blank" : undefined}
              >
                {linkChildren}
              </a>
            );
          },
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}
