import { useState } from "react";
import { useCreateBlog, type CreateBlogData } from "../hooks/useBlogs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface BlogFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (blogId: number | string) => void;
}

const CATEGORIES = ["FINANCE", "TECH", "CAREER", "EDUCATION", "REGULATIONS", "LIFESTYLE"];

export default function BlogForm({ open, onOpenChange, onSuccess }: BlogFormProps) {
  const [formData, setFormData] = useState<CreateBlogData>({
    title: "",
    category: [],
    description: "",
    coverImage: "",
    content: "",
  });

  const createBlog = useCreateBlog();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.content || formData.category.length === 0) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const newBlog = await createBlog.mutateAsync(formData);
      // Reset form
      setFormData({
        title: "",
        category: [],
        description: "",
        coverImage: "",
        content: "",
      });
      onOpenChange(false);
      // Call onSuccess callback with the new blog ID
      // The mutation's onSuccess has already invalidated queries, so the blog should be available
      if (onSuccess && newBlog?.id) {
        // JSON Server may return string or number IDs - pass as-is
        onSuccess(newBlog.id);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog. Please try again.");
    }
  };

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((c) => c !== category)
        : [...prev.category, category],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Blog</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new blog post.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>
              Categories <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryToggle(cat)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    formData.category.includes(cat)
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {formData.category.length === 0 && (
              <p className="text-xs text-red-500">Please select at least one category</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter a short description"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              type="url"
              value={formData.coverImage}
              onChange={(e) =>
                setFormData({ ...formData, coverImage: e.target.value })
              }
              placeholder="https://images.pexels.com/photos/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">
              Content <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder="Enter blog content"
              rows={8}
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createBlog.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createBlog.isPending}>
              {createBlog.isPending ? "Creating..." : "Create Blog"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
