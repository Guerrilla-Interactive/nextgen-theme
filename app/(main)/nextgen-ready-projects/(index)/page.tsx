import Link from "next/link";
import Image from "next/image";
import FullPageBackground from "@/features/unorganized-components/magic-background/full-page-background";
import { fetchSanityNextgenReadyProjects } from "../[slug]/(nextgen-ready-project-slug-core-utilities)/nextgen-ready-project-slug.server-actions";
import { urlFor } from "@/sanity/lib/image";

export const dynamic = "force-static";

export default async function NextgenReadyProjectsIndexPage() {
  const projects = await fetchSanityNextgenReadyProjects();

  return (
    <main className="container mt-24 py-12">
      <FullPageBackground type="Aurora" />
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nextgen Ready Projects</h1>
          <div className="mt-2 flex items-center gap-2 text-muted-foreground">
            <p>Scaffolded workspaces powered by commands.</p>
            <span className="inline-flex items-center rounded-full border border-border/50 bg-background/10 px-2 py-0.5 text-xs">
              {Array.isArray(projects) ? projects.length : 0} total
            </span>
          </div>
        </div>
      </header>

      {Array.isArray(projects) && projects.length ? (
        <section aria-label="Nextgen Ready Projects" className="relative">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p: any) => (
              <li key={p.slug?.current}>
                <article
                  className="group relative rounded-xl border border-border/50 bg-background/10 p-5 shadow-sm backdrop-blur-md transition hover:shadow-md hover:border-border hover:bg-background/20 hover:ring-1 hover:ring-border/60 focus-within:ring-1 focus-within:ring-border/60"
                >
                  <Link
                    href={`/nextgen-ready-projects/${p.slug?.current}`}
                    aria-label={`Open ${p.title}`}
                    className="absolute inset-0 z-10 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    tabIndex={-1}
                  />

                  <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-lg border border-border/50 bg-gradient-to-br from-background/40 to-muted/30">
                    {p.image ? (
                      <Image
                        src={urlFor(p.image).width(800).height(450).auto("format").url()}
                        alt={`${p.title} cover`}
                        fill
                        sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    ) : null}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  </div>

                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold tracking-tight truncate" title={p.title}>{p.title}</h2>
                  </div>

                  {p.description && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.description}</p>
                  )}

                  <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
                    <div>
                      <span className="font-medium text-foreground/80">Commands:</span> {Array.isArray(p.commands) ? p.commands.length : 0}
                    </div>
      
                  </div>

                  {Array.isArray(p.commands) && p.commands.length ? (
                    <div className="mt-3">
                      
                      <ul className="list-disc pl-4  text-muted-foreground">
                        {p.commands.slice(0, 6).map((c: any) => (
                          <li key={c._id} className="leading-relaxed text-xs">
                            <Link href={`/commands/${c.slug?.current}`} className="hover:underline">
                              {c.title}
                            </Link>
                          </li>
                        ))}
                        {p.commands.length > 6 ? (
                          <li className="text-[11px] opacity-70">and {p.commands.length - 6} more…</li>
                        ) : null}
                      </ul>
                    </div>
                  ) : null}
                </article>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <div className="rounded-xl border border-dashed border-muted/40 bg-muted/10 p-6 text-center text-sm text-muted-foreground">
          No projects found.
        </div>
      )}
    </main>
  );
}


