import { useState } from "react";
import { useBlogs } from "../hooks/useBlogs";
import BlogCard from "../components/BlogCard";
import BlogDetail from "../components/BlogDetail";

export default function Home() {
  const { data, isLoading } = useBlogs();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  if (isLoading) return <p>Loading blogs...</p>;

  return (
    <div className="grid grid-cols-3 h-screen">
      <div className="p-4 space-y-3">
        {data?.map(blog => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onClick={() => setSelectedId(blog.id)}
          />
        ))}
      </div>

      <div className="col-span-2 p-6">
        {selectedId && <BlogDetail id={selectedId} />}
      </div>
    </div>
  );
}
