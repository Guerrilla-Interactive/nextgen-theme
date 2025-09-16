import { notFound } from "next/navigation";

import { generatePageMetadata } from "@/features/unorganized-utils/metadata";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import CommandsSelector from "./CommandsSelector.client";
import { Github, ExternalLink } from "lucide-react";
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
        <div className="relative rounded-2xl border border-muted/30 bg-card p-6 shadow-sm">
          <div className="grid gap-6 md:grid-cols-12">
            {/* Left: Video/Image */}
            <div className="md:col-span-6">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-muted/30 bg-muted/10">
                {proj.image ? (
                  <Image
                    src={urlFor(proj.image).width(1200).height(675).auto("format").url()}
                    alt={`${proj.title} cover`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : null}
              </div>
            </div>

            {/* Right: Project text and links */}
            <div className="md:col-span-6">
              <h1 className="truncate text-2xl font-semibold leading-tight">{proj.title}</h1>
              <div className="mt-1 text-sm text-muted-foreground">
                <code className="rounded bg-muted/40 px-1.5 py-0.5">/{proj.slug?.current}</code>
              </div>
              {proj.description ? (
                <p className="mt-3 text-sm text-foreground/80">{proj.description}</p>
              ) : null}
            </div>
          </div>
          {(proj.repoLink || proj.previewLink) ? (
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              {proj.repoLink ? (
                <a
                  href={proj.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open repository"
                  title="Open repository"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-muted/40 bg-background hover:bg-muted/20"
                >
                  <Github className="h-4 w-4" />
                </a>
              ) : null}
              {proj.previewLink ? (
                <a
                  href={proj.previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open preview"
                  title="Open preview"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-muted/40 bg-background hover:bg-muted/20"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="mt-8 grid gap-6">
          <div className="space-y-6">
            <div>
              <div className="mb-3 text-sm font-semibold tracking-wide">Commands</div>
              <CommandsSelector commands={proj.commands || []} />
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
