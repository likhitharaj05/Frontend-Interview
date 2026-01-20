import { useBlog } from "../hooks/useBlogs";
import { Button } from "./ui/button";
import { Share2, ThumbsUp, MessageCircle } from "lucide-react";

// Helper function to calculate read time
const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

export default function BlogDetail({ id }: { id: number | string }) {
  const { data, isLoading, error } = useBlog(id);

  if (isLoading) {
    return (
      <div className="p-10">
        <div className="animate-pulse space-y-4">
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-10">
        <p className="text-red-500 text-center py-12">Error loading blog. Please try again.</p>
      </div>
    );
  }
  
  if (!data) {
    return (
      <div className="p-10">
        <p className="text-gray-500 text-center py-12">No blog found</p>
      </div>
    );
  }

  const readTime = calculateReadTime(data.content);
  const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article>
      {/* Hero Image - Full width, extends to container edges */}
      <div className="w-full overflow-hidden bg-gray-100">
        {data.coverImage ? (
          <img
            src={data.coverImage}
            alt={data.title}
            className="w-full h-[400px] object-cover"
          />
        ) : (
          <div className="w-full h-[400px] bg-gradient-to-br from-teal-600 to-blue-800 flex items-center justify-center">
            <div className="text-white text-4xl font-bold opacity-50">
              {data.title.charAt(0)}
            </div>
          </div>
        )}
      </div>

      {/* Content Section with proper padding */}
      <div className="p-10 space-y-6">

      {/* Category and Read Time (Above Title) */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-indigo-600 font-semibold uppercase">
          {data.category?.[0] || "GENERAL"}
        </span>
        <span className="text-gray-400">•</span>
        <span className="text-gray-500">{readTime} min read</span>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
        {data.title}
      </h1>

      {/* Share Article Button */}
      <Button className="bg-indigo-600 hover:bg-indigo-700">
        <Share2 className="w-4 h-4 mr-2" />
        Share Article
      </Button>

      {/* Key Information Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-y border-gray-200">
        <div>
          <p className="text-xs uppercase text-gray-500 tracking-wide mb-1">
            Category
          </p>
          <p className="text-base font-semibold text-gray-900">
            {data.category?.join(" & ") || "General"}
          </p>
        </div>
        <div className="border-t sm:border-t-0 sm:border-l border-gray-200 sm:pl-4 pt-4 sm:pt-0">
          <p className="text-xs uppercase text-gray-500 tracking-wide mb-1">
            Read Time
          </p>
          <p className="text-base font-semibold text-gray-900">
            {readTime} Mins
          </p>
        </div>
        <div className="border-t sm:border-t-0 sm:border-l border-gray-200 sm:pl-4 pt-4 sm:pt-0">
          <p className="text-xs uppercase text-gray-500 tracking-wide mb-1">
            Date
          </p>
          <p className="text-base font-semibold text-gray-900">
            {formattedDate}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-lg text-gray-700 leading-relaxed font-medium">
        {data.description}
      </p>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className="text-gray-700 leading-relaxed">
          {data.content.split("\n\n").map((paragraph: string, index: number) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;
            
            // Check if paragraph looks like a quote
            if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
              return (
                <div
                  key={index}
                  className="my-6 pl-6 border-l-4 border-indigo-600 bg-indigo-50 py-4 italic text-gray-700 rounded-r"
                >
                  {trimmed.replace(/^"|"$/g, "")}
                </div>
              );
            }
            // Check if paragraph is a heading (all caps or starts with specific patterns)
            if (
              trimmed.length < 100 &&
              trimmed.length > 0 &&
              (trimmed === trimmed.toUpperCase() ||
                trimmed.match(/^[A-Z][a-z]+:/))
            ) {
              return (
                <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  {trimmed}
                </h2>
              );
            }
            // Regular paragraph
            return (
              <p key={index} className="mb-4 leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </div>
      </div>

      {/* Author Information and Interaction */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
            {data.title.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-900">Written by CA Monk</p>
            <p className="text-sm text-gray-500">Content Team</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
            <ThumbsUp className="w-5 h-5" />
            <span className="text-sm">Like</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">Comment</span>
          </button>
        </div>
      </div>
      </div>
    </article>
  );
}

