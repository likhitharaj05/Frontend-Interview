import { useState, useEffect } from "react";
import { useBlogs } from "../hooks/useBlogs";
import BlogCard from "../components/BlogCard";
import BlogDetail from "../components/BlogDetail";
import BlogForm from "../components/BlogForm";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";

export default function Home() {
  const { data, isLoading, error } = useBlogs();
  const [selectedId, setSelectedId] = useState<number | string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Set selectedId to first blog when data loads
  useEffect(() => {
    if (data && data.length > 0 && selectedId === null) {
      setSelectedId(data[0].id);
    }
  }, [data, selectedId]);

  // Handle new blog creation - select the newly created blog
  const handleBlogCreated = (newBlogId: number | string) => {
    setSelectedId(newBlogId);
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
            {/* Left Panel Skeleton */}
            <aside className="lg:col-span-1 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-xl p-4 space-y-3 animate-pulse">
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              ))}
            </aside>
            {/* Right Panel Skeleton */}
            <main className="lg:col-span-2 bg-white rounded-xl lg:rounded-2xl border p-6 lg:p-10 space-y-6 animate-pulse">
              <div className="w-full h-64 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg font-medium mb-2">Error loading blogs</p>
          <p className="text-gray-500">Please check if the JSON Server is running on port 3001</p>
        </div>
      </div>
    );
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-8 py-10">
          <p className="text-gray-500 text-center py-12">No blogs available. Create your first blog!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
     

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 px-4 lg:px-8 py-6 lg:py-10 min-h-[calc(100vh-96px)]">

        
        {/* LEFT PANEL */}
        <aside className="lg:col-span-1 space-y-4 lg:space-y-6 max-h-[calc(100vh-140px)] overflow-y-auto lg:pr-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">
              Latest Articles
            </h2>
            <Button
              size="sm"
              onClick={() => setIsFormOpen(true)}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {data && data.length > 0 ? (
            data.map((blog: any) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                active={selectedId !== null && String(blog.id) === String(selectedId)}
                onClick={() => setSelectedId(blog.id)}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">No blogs available. Create your first blog!</p>
          )}
        </aside>

        {/* RIGHT PANEL */}
        <main className="lg:col-span-2 bg-white rounded-xl lg:rounded-2xl border overflow-hidden max-h-[calc(100vh-140px)] overflow-y-auto">
          {selectedId ? (
            <BlogDetail id={selectedId} />
          ) : (
            <div className="p-10">
              <p className="text-gray-500 text-center py-12">Select a blog to view details</p>
            </div>
          )}
        </main>

      </div>

      <BlogForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen}
        onSuccess={handleBlogCreated}
      />
    </div>
  );
}
