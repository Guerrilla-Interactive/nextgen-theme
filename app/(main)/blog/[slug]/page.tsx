import { notFound } from "next/navigation";

import { generatePageMetadata } from "@/features/unorganized-utils/metadata";
import PortableTextRenderer from "@/features/unorganized-components/portable-text-renderer";
import { fetchSanityBlogPostBySlug, fetchSanityBlogPostsStaticParams } from "./_blog-slug-core-utilities/blog-slug.server-actions";


export async function generateStaticParams() {
  const posts = await fetchSanityBlogPostsStaticParams();

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await fetchSanityBlogPostBySlug({ slug: params.slug });

  if (!post) {
    notFound();
  }

  return generatePageMetadata({ page: post, slug: `/blog/${params.slug}` });
}

export default async function BlogPost(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await fetchSanityBlogPostBySlug(params);

  if (!post) {
    notFound();
  }
  return (
    <section>
      {JSON.stringify(post)}
      <div className="container py-16 xl:py-20">
          {post.body && <PortableTextRenderer value={post.body} />}
      </div>
    </section>
  );
}
