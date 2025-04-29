// src/app/page.tsx
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image"; // Import next/image

interface Post {
  id: number;
  title: string;
  slug: string;
  created_at: string;
  image_url?: string | null;
}

async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, created_at, image_url")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
  return data || [];
}

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
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-200 h-full group"
            >
              {/* Container div for layout */}
              <div className="flex flex-col h-full">
                {/* Use next/image component - ADDRESSING THE WARNING */}
                {post.image_url ? (
                  <div className="relative w-full h-48">
                    {" "}
                    {/* Fixed height container */}
                    <Image
                      src={post.image_url}
                      alt={`Image for ${post.title}`}
                      fill // Use fill to cover the container
                      style={{ objectFit: "cover" }} // Ensure image covers the area
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Help browser choose correct size
                      // You might need to configure remotePatterns in next.config.mjs if using external URLs
                    />
                  </div>
                ) : (
                  // Optional: Placeholder if no image
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                    <span>No Image</span>
                  </div>
                )}
                <div className="p-4 flex flex-col flex-grow">
                  {" "}
                  {/* Allow text content to grow */}
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-700">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-auto">
                    {" "}
                    {/* Push date to bottom */}
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
