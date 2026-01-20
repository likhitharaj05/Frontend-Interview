import { Card, CardContent } from "./ui/card";

type BlogCardProps = {
  blog: any;
  active: boolean;
  onClick: () => void;
};

export default function BlogCard({ blog, active, onClick }: BlogCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer transition-all ${
        active ? "border-indigo-600 bg-indigo-50 shadow-md" : "hover:bg-gray-50 hover:shadow-sm"
      }`}
    >
      <CardContent className="p-4">
        {/* Category + Date */}
        <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-gray-500 mb-2">
          <span className="text-indigo-600 font-semibold">
            {blog.category?.join(", ")}
          </span>
          <span>
            {new Date(blog.date).toLocaleDateString()}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-[16px] leading-snug mb-2">
          {blog.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {blog.description}
        </p>
      </CardContent>
    </Card>
  );
}
