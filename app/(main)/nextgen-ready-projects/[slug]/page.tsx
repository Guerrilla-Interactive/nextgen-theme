import { notFound } from "next/navigation";

import { generatePageMetadata } from "@/features/unorganized-utils/metadata";
import CommandCard from "./CommandCard.client";
import { fetchSanityNextgenReadyProjectBySlug, fetchSanityNextgenReadyProjectStaticParams } from "./(nextgen-ready-project-slug-core-utilities)/nextgen-ready-project-slug.server-actions";

export async function generateStaticParams() {
  const posts = await fetchSanityNextgenReadyProjectStaticParams();

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = await fetchSanityNextgenReadyProjectBySlug({ slug });

  if (!post) {
    notFound();
  }

  return generatePageMetadata({ page: post as any, slug: `/nextgen-ready-projects/${slug}` });
}

export default async function NextgenReadyProject(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = await fetchSanityNextgenReadyProjectBySlug({ slug });

  if (!post) {
    notFound();
  }
  const proj = post as any;
  const buildAsciiFromNodes = (nodes: any[] = [], prefix = ""): string => {
    const lines: string[] = [];
    nodes.forEach((node, index) => {
      const isLast = index === nodes.length - 1;
      const connector = isLast ? "└─ " : "├─ ";
      const icon = node?.nodeType === "folder" ? "📁 " : "📄 ";
      const name = node?.name || (node?.nodeType === "folder" ? "(folder)" : "(file)");
      lines.push(`${prefix}${connector}${icon}${name}`);
      const nextPrefix = prefix + (isLast ? "   " : "│  ");
      if (node?.children?.length) {
        lines.push(buildAsciiFromNodes(node.children, nextPrefix));
      }
    });
    return lines.join("\n");
  };
  return (
    <section>
      <div className="container py-16 mt-12 xl:py-20">
        <div className="rounded-2xl border border-muted/30 bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-semibold leading-tight">{proj.title}</h1>
              <div className="mt-1 text-sm text-muted-foreground">
                <code className="rounded bg-muted/40 px-1.5 py-0.5">/{proj.slug?.current}</code>
              </div>
              {proj.description && (
                <p className="mt-3 max-w-3xl text-sm text-foreground/80">{proj.description}</p>
              )}
            </div>
            <div className="grid gap-2 text-sm">
              {proj.repoLink ? (
                <a
                  href={proj.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md border border-muted/40 bg-background px-3 py-1.5 text-sm hover:bg-muted/20"
                  aria-label="Open repository"
                >
                  Repo
                </a>
              ) : null}
              {proj.previewLink ? (
                <a
                  href={proj.previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md border border-muted/40 bg-background px-3 py-1.5 text-sm hover:bg-muted/20"
                  aria-label="Open preview"
                >
                  Preview
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 ">
          <div className="space-y-6">
            <div className="rounded-2xl border border-muted/30 bg-card p-5 shadow-sm">
              <div className="mb-3 text-sm font-semibold tracking-wide">Commands</div>
              {proj.commands?.length ? (
                <ul className="space-y-3">
                  {proj.commands.map((cmd: any) => (
                    <li key={cmd._id} className="rounded-xl border border-muted/30 bg-background/60 p-3">
                      <CommandCard cmd={cmd} />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="rounded-xl border border-dashed border-muted/40 bg-muted/10 p-6 text-center text-sm text-muted-foreground">
                  No commands linked yet.
                </div>
              )}
            </div>
          </div>
          <div className="space-y-6">
            {proj.excerpt ? (
              <div className="rounded-2xl border border-muted/30 bg-card p-5 shadow-sm">
                <div className="mb-2 text-sm font-semibold tracking-wide">Excerpt</div>
                <p className="text-sm text-foreground/80">{proj.excerpt}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
