import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import Link from "next/link";

interface FullPost {
  id: number;
  title: string;
  slug: string;
  content?: string | null;
  created_at: string;
  image_url?: string | null;
}

async function getPostBySlug(slug: string): Promise<FullPost | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, content, created_at, image_url")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      console.log(`Post with slug "${slug}" not found.`);
      return null;
    }
    console.error("Error fetching post by slug:", error);
    throw new Error(`Failed to fetch post: ${error.message}`);
  }

  return data;
}

// --- METADATA ---
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  return {
    title: `${post.title} | Indrita Fintech Blog`,
  };
}

// ✅ --- PAGE COMPONENT ---
export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto">
      <Link
        href="/"
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        &larr; Back to Blog List
      </Link>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        Published on: {new Date(post.created_at).toLocaleDateString()}
      </p>

      {post.content ? (
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      ) : (
        <p>This post does not have any content yet.</p>
      )}
    </article>
  );
}
