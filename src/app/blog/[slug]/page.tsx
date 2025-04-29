// src/app/blog/[slug]/page.tsx
import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PostPageProps {
  params: {
    slug: string; // This comes from the folder name [slug]
  };
}

// Define the type for a single Post with content
interface FullPost {
  id: number;
  title: string;
  slug: string;
  content?: string | null; // Content is optional
  created_at: string;
  image_url?: string | null; // Optional image URL
}

// Fetch a single post based on slug
async function getPostBySlug(slug: string): Promise<FullPost | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, content, created_at, image_url")
    .eq("slug", slug) // Filter by the slug
    .single(); // Expect only one row

  if (error) {
    if (error.code === "PGRST116") {
      // PostgREST error code for "Requested range not satisfiable" -> means 0 rows returned
      console.log(`Post with slug "${slug}" not found.`);
      return null; // Return null if not found
    }
    console.error("Error fetching post by slug:", error);
    // Throw error for other unexpected issues
    throw new Error(`Failed to fetch post: ${error.message}`);
  }

  return data;
}

// Optional: Generate static paths at build time if desired (for performance)
// export async function generateStaticParams() {
//   const { data: posts } = await supabase.from('posts').select('slug');
//   return posts?.map((post) => ({
//     slug: post.slug,
//   })) || [];
// }

// --- METADATA ---
// Dynamically generate metadata for each post page
export async function generateMetadata({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  return {
    title: `${post.title} | Indrita Fintech Blog`,
    // Add description or open graph tags if needed
    // description: post.content?.substring(0, 150) + '...',
  };
}

// --- PAGE COMPONENT ---
export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  // If post is not found, render the 404 page
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

      {post.image_url && (
        <img
          src={post.image_url}
          alt={`Banner for ${post.title}`}
          className="w-full h-auto max-h-96 object-cover rounded-lg mb-6 shadow"
        />
      )}

      {/* Render the HTML content dangerously */}
      {/* Apply the .prose-content class for styling defined in globals.css */}
      {post.content ? (
        <div
          className="prose-content" // Apply the styling class
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      ) : (
        <p>This post does not have any content yet.</p>
      )}

      {/* SECURITY WARNING: Using dangerouslySetInnerHTML */}
      {/* This is necessary because you specified storing HTML directly in Supabase. */}
      {/* BE EXTREMELY CAREFUL about the source of this HTML. Ensure that */}
      {/* only trusted administrators (like Rahul Gupta) can insert/edit */}
      {/* the HTML content in the Supabase table. Malicious HTML/JavaScript */}
      {/* inserted here could lead to Cross-Site Scripting (XSS) attacks. */}
      {/* Consider using Markdown and a parser (like 'react-markdown') instead */}
      {/* if security is a major concern or if non-technical users will add content. */}
    </article>
  );
}

// Optional: Add loading and error UI
// Create src/app/blog/[slug]/loading.tsx
// Create src/app/blog/[slug]/error.tsx
