// src/app/blog/[slug]/loading.tsx
export default function LoadingPost() {
  return (
    <div className="max-w-3xl mx-auto animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4 mb-6"></div>
      <div className="h-64 bg-gray-300 rounded w-full mb-6"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
