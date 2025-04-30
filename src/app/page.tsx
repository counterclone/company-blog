// src/app/page.tsx
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient"; // Import Supabase client
export const revalidate = 0;
// Define the type for a Post
interface Post {
  id: number;
  title: string;
  slug: string;
  created_at: string;
  image_url?: string | null; // Optional image URL
}

// Fetch posts data on the server
async function getPosts(): Promise<Post[]> {
  // Select specific columns, order by creation date descending
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, created_at, image_url")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    // In a real app, you might want to handle this more gracefully
    // e.g., return empty array or throw an error to be caught by an error boundary
    return [];
  }

  // Return data or empty array if null/undefined
  return data || [];
}

// The Page component is async because we fetch data directly
export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No posts found. Check back later!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id}>
              <div className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-200 h-full">
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt={`Image for ${post.title}`}
                    className="w-full h-48 object-cover" // Fixed height, object-cover
                  />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-sm text-gray-500">
                    Published on:{" "}
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// Optional: Revalidate data periodically or on demand
// export const revalidate = 60; // Revalidate every 60 seconds
