import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/features/unorganized-utils/metadata";
import { fetchSanityCommandBySlug, fetchSanityCommandStaticParams } from "./(command-slug-core-utilities)/command-slug.server-actions";
import { Folder, FileText, FileCode, ListChecks, Settings, Link as LinkIcon, Boxes, Braces, Network } from "lucide-react";

/* ----------------------------- Types (light) ----------------------------- */

type VariableDef = {
  _type?: string;
  name?: string;
  title?: string;
  priority?: number;
  description?: string;
  examples?: string[];
};

type ActionLogic = {
  behaviour?: string;
  content?: string;
  mark?: string;
  occurrence?: "first" | "last" | "all";
  target?: string;
};

type CommandAction = {
  title?: string;
  mark?: string;
  logic?: ActionLogic;
};

type TreeNode = {
  id?: string;
  name?: string;
  nodeType?: "folder" | "file";
  actionFile?: boolean;
  code?: string;
  actions?: CommandAction[];
  children?: TreeNode[];
};

type FilePathGroup = {
  id?: string;
  path?: string;
  nodes?: TreeNode[];
};

type CommandDoc = {
  _id: string;
  _type: "command";
  _createdAt?: string;
  _updatedAt?: string;
  title?: string;
  excerpt?: string;
  slug?: { current?: string };
  goals?: Array<{ title?: string; description?: string; fileHints?: string[]; howToTips?: string[] }>;
  ignoredPatterns?: string[];
  variables?: VariableDef[];
  filePaths?: FilePathGroup[];
};

/* ----------------------------- Helpers (SSR) ----------------------------- */

function formatDate(iso?: string) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-GB", { year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" });
  } catch {
    return iso;
  }
}

function countNodes(nodes: TreeNode[] = []): number {
  return nodes.reduce((acc, n) => acc + 1 + countNodes(n.children || []), 0);
}

/* Recursive Tree renderer (server-side only) */
function TreeView({ nodes }: { nodes?: TreeNode[] }) {
  if (!nodes?.length) return null;
  return (
    <ul className="space-y-2">
      {nodes.map((n, idx) => {
        const isFolder = n.nodeType === "folder";
        const hasChildren = (n.children?.length ?? 0) > 0;
        const actionsWithTitles = (n.actions || []).filter(
          (a) => typeof a?.title === "string" && a.title.trim().length > 0
        );

        return (
          <li key={(n.id ?? "") + idx} className="rounded-xl border border-muted/30 bg-background/40 p-3 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-muted/30 bg-muted/20">
                {isFolder ? <Folder className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
              </span>
              <div className="min-w-0">
                <div className="truncate font-medium">{n.name || (isFolder ? "(folder)" : "(file)")}</div>
                <div className="text-xs text-muted-foreground">
                  {isFolder ? "Folder" : n.actionFile ? "File • Action File" : "File"}
                </div>
              </div>
            </div>

            {/* Actions (only when at least one action has a non-empty title) */}
            {actionsWithTitles.length ? (
              <div className="mt-3 rounded-lg border border-muted/20 bg-muted/10 p-3">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Settings className="h-4 w-4" />
                  Actions
                </div>
                <ol className="space-y-3">
                  {actionsWithTitles.map((a, i) => (
                    <li key={(a.title ?? "") + i} className="rounded-md border border-muted/20 bg-background p-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {a.title}
                        </span>
                        {a.mark && <span className="rounded bg-muted px-2 py-0.5 text-xs">{a.mark}</span>}
                      </div>
                      {a.logic && (
                        <div className="mt-2 grid gap-1 text-xs text-muted-foreground">
                          {a.logic.behaviour && <div><span className="font-semibold">Behaviour:</span> {a.logic.behaviour}</div>}
                          {a.logic.occurrence && <div><span className="font-semibold">Occurrence:</span> {a.logic.occurrence}</div>}
                          {a.logic.target && (
                            <div className="overflow-x-auto"><span className="font-semibold">Target:</span> <code className="rounded bg-muted/50 px-1 py-0.5">{a.logic.target}</code></div>
                          )}
                          {a.logic.content && (
                            <details className="mt-1">
                              <summary className="cursor-pointer select-none text-foreground">Content</summary>
                              <pre className="mt-2 max-h-64 overflow-auto rounded-md border border-muted/20 bg-muted/10 p-3 text-xs whitespace-pre-wrap">
                                {a.logic.content}
                              </pre>
                            </details>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {/* Code (for files) */}
            {!isFolder && n.code ? (
              <details className="mt-3">
                <summary className="flex cursor-pointer select-none items-center gap-2 text-sm font-medium">
                  <FileCode className="h-4 w-4" />
                  View Code
                </summary>
                <pre className="mt-2 max-h-96 overflow-auto rounded-md border border-muted/20 bg-muted/10 p-4 text-xs">
{n.code}
                </pre>
              </details>
            ) : null}

            {/* Children */}
            {hasChildren ? <div className="mt-3 pl-4"><TreeView nodes={n.children} /></div> : null}
          </li>
        );
      })}
    </ul>
  );
}

/* Compact ASCII tree (server-side only) */
function buildAsciiTreeLines(nodes: TreeNode[] = [], prefix = ""): string[] {
  const lines: string[] = [];
  nodes.forEach((node, index) => {
    const isLast = index === nodes.length - 1;
    const connector = isLast ? "└─ " : "├─ ";
    const icon = node.nodeType === "folder" ? "📁 " : "📄 ";
    const name = node.name || (node.nodeType === "folder" ? "(folder)" : "(file)");
    lines.push(`${prefix}${connector}${icon}${name}`);
    const nextPrefix = prefix + (isLast ? "   " : "│  ");
    if (node.children && node.children.length) {
      lines.push(...buildAsciiTreeLines(node.children, nextPrefix));
    }
  });
  return lines;
}

function CompactAsciiTree({ nodes }: { nodes?: TreeNode[] }) {
  if (!nodes?.length) return null;
  const lines = buildAsciiTreeLines(nodes);
  return (
    <pre className="whitespace-pre rounded-md border border-muted/30 bg-background p-3 text-xs font-mono leading-5">
{lines.join("\n")}
    </pre>
  );
}

/* ----------------------------- Page statics ------------------------------ */

export async function generateStaticParams() {
  const posts = await fetchSanityCommandStaticParams();
  return posts.map((post: any) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = await fetchSanityCommandBySlug({ slug });
  if (!post) notFound();
  // fix path (was `/$commands/${slug}`)
  return generatePageMetadata({ page: post as any, slug: `/commands/${slug}` });
}

/* --------------------------------- Page ---------------------------------- */

export default async function CommandPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = await fetchSanityCommandBySlug({ slug });

  if (!post) notFound();
  const cmd = post as unknown as CommandDoc;

  const totalGroups = cmd.filePaths?.length ?? 0;
  const totalNodes = (cmd.filePaths || []).reduce((acc, g) => acc + countNodes(g.nodes || []), 0);
  const varCount = cmd.variables?.length ?? 0;
  const goalsCount = cmd.goals?.length ?? 0;

  return (
    <section>
      <div className="container py-10 mt-22 xl:py-14">
        {/* Header */}  
        <div className="rounded-2xl border border-muted/30 bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-semibold leading-tight">{cmd.title || "Untitled Command"}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <LinkIcon className="h-3.5 w-3.5" />
                  <code className="rounded bg-muted/40 px-1.5 py-0.5">/{cmd.slug?.current ?? "no-slug"}</code>
                </span>
                {cmd._createdAt && <span>Created: {formatDate(cmd._createdAt)}</span>}
                {cmd._updatedAt && <span>Updated: {formatDate(cmd._updatedAt)}</span>}
              </div>
              {cmd.excerpt && (
                <p className="mt-3 max-w-3xl text-sm text-foreground/80">{cmd.excerpt}</p>
              )}
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <Stat label="Variables" value={varCount} icon={<Braces className="h-4 w-4" />} />
              <Stat label="Goals" value={goalsCount} icon={<ListChecks className="h-4 w-4" />} />
              <Stat label="Path Groups" value={totalGroups} icon={<Network className="h-4 w-4" />} />
              <Stat label="Nodes" value={totalNodes} icon={<Boxes className="h-4 w-4" />} />
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Left column: Variables + Ignored Patterns */}
          <div className="space-y-6 lg:col-span-1">
            <Card title="Compact File Tree" subtitle="Quick overview of planned files">
              {cmd.filePaths?.length ? (
                <div className="space-y-4">
                  {cmd.filePaths.map((g, gi) => (
                    <div key={(g.id ?? "") + gi}>
                      <div className="mb-1 text-xs font-medium text-muted-foreground">Base Path</div>
                      <code className="mb-2 block text-xs overflow-hidden">{g.path || "(no path)"}</code>
                      <CompactAsciiTree nodes={g.nodes} />
                    </div>
                  ))}
                </div>
              ) : (
                <Empty hint="No file path groups yet." />
              )}
            </Card>

            <Card title="Variables" subtitle="Argument-driven inputs used by your generator">
              {cmd.variables?.length ? (
                <ul className="space-y-3">
                  {cmd.variables.map((v, i) => (
                    <li key={(v.name ?? "") + i} className="rounded-xl border border-muted/30 bg-background/60 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="truncate font-medium">{v.name || "(unnamed)"}</div>
                          {v.title && <div className="text-xs text-muted-foreground">{v.title}</div>}
                        </div>
                        {typeof v.priority === "number" && (
                          <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                            P{v.priority}
                          </span>
                        )}
                      </div>
                      {v.description && <p className="mt-2 text-sm text-foreground/80">{v.description}</p>}
                      {v.examples?.length ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {v.examples.map((ex, j) => (
                            <code key={j} className="rounded bg-muted/40 px-2 py-0.5 text-xs">
                              {ex}
                            </code>
                          ))}
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <Empty hint="No variables in this command yet." />
              )}
            </Card>

            <Card title="Ignored Patterns" subtitle="Globs/paths skipped by the executor">
              {cmd.ignoredPatterns?.length ? (
                <div className="flex flex-wrap gap-2">
                  {cmd.ignoredPatterns.map((p, i) => (
                    <code key={i} className="rounded bg-muted/40 px-2 py-0.5 text-xs">
                      {p}
                    </code>
                  ))}
                </div>
              ) : (
                <Empty hint="No ignored patterns." />
              )}
            </Card>
          </div>

          {/* Right column: Goals + File Tree */}
          <div className="space-y-6 lg:col-span-2">
            <Card title="Goals" subtitle="What this command is trying to accomplish">
              {cmd.goals?.length ? (
                <ol className="space-y-4">
                  {cmd.goals.map((g, i) => (
                    <li key={(g.title ?? "") + i} className="rounded-xl border border-muted/30 bg-background/60 p-4">
                      <div className="mb-1 flex items-start justify-between gap-3">
                        <div className="font-medium">{g.title || `Goal ${i + 1}`}</div>
                        {g.fileHints?.length ? (
                          <div className="flex flex-wrap items-center gap-1">
                            {g.fileHints.map((hint, hi) => (
                              <span key={hi} className="rounded bg-muted/40 px-2 py-0.5 text-xs">
                                {hint}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                      {g.description && <p className="text-sm text-foreground/80">{g.description}</p>}
                      {g.howToTips?.length ? (
                        <details className="mt-2">
                          <summary className="cursor-pointer select-none text-sm font-medium opacity-30 hover:opacity-100">How-To Tips</summary>
                          <ul className="mt-2 list-inside list-disc text-sm text-foreground/80">
                            {g.howToTips.map((tip, ti) => (
                              <li className="text-xs leading-relaxed" key={ti}>{tip}</li>
                            ))}
                          </ul>
                        </details>
                      ) : null}
                    </li>
                  ))}
                </ol>
              ) : (
                <Empty hint="No goals defined." />
              )}
            </Card>

            <Card title="File Tree" subtitle="Detailed view with actions">
              {cmd.filePaths?.length ? (
                <div className="space-y-6">
                  {cmd.filePaths.map((g, gi) => (
                    <div key={(g.id ?? "") + gi} className="rounded-2xl border border-muted/30 bg-muted/10 p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-muted/30 bg-background">
                          <Folder className="h-4 w-4" />
                        </span>
                        <div>
                          <div className="font-medium">Base Path</div>
                          <code className="text-xs">{g.path || "(no path)"}</code>
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 text-xs font-medium text-muted-foreground">Detailed view</div>
                        <TreeView nodes={g.nodes} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Empty hint="No file path groups yet." />
              )}
            </Card>

            <Card title="Raw JSON" subtitle="Debug view of the fetched document">
              <pre className="max-h-[480px] overflow-auto rounded-xl border border-muted/30 bg-muted/10 p-4 text-xs">
                {JSON.stringify(post, null, 2)}
              </pre>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Bits ---------------------------------- */

function Card(props: { title: string; subtitle?: string; children: React.ReactNode }) {
  const { title, subtitle, children } = props;
  return (
    <div className="rounded-2xl border border-muted/30 bg-card p-5 shadow-sm">
      <div className="mb-4">
        <div className="text-sm font-semibold tracking-wide">{title}</div>
        {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

function Stat(props: { label: string; value: number | string; icon?: React.ReactNode }) {
  const { label, value, icon } = props;
  return (
    <div className="flex items-center gap-3 rounded-xl border border-muted/30 bg-background p-3">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-muted/30 bg-muted/20">
        {icon}
      </span>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-lg font-semibold leading-none">{value}</div>
      </div>
    </div>
  );
}

function HintPanel({ label, items }: { label: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="rounded-xl border border-muted/30 bg-background p-3">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium">
        <ListChecks className="h-4 w-4" />
        {label}
      </div>
      <ul className="list-inside list-disc text-sm text-foreground/80">
        {items.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ul>
    </div>
  );
}

function Empty({ hint }: { hint: string }) {
  return (
    <div className="rounded-xl border border-dashed border-muted/40 bg-muted/10 p-6 text-center text-sm text-muted-foreground">
      {hint}
    </div>
  );
}
