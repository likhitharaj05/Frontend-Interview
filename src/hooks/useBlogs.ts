import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://localhost:3001";

export interface Blog {
  id: number | string; // Support both number and string IDs from JSON Server
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

export interface CreateBlogData {
  title: string;
  category: string[];
  description: string;
  coverImage: string;
  content: string;
}

// 🔹 GET ALL BLOGS
export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/blogs`);
      return res.data;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// 🔹 GET SINGLE BLOG BY ID
export const useBlog = (id: number | string) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/blogs/${id}`);
      return res.data;
    },
    enabled: !!id,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// 🔹 CREATE NEW BLOG
export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateBlogData) => {
      const res = await axios.post(`${BASE_URL}/blogs`, {
        ...data,
        date: new Date().toISOString(),
      });
      return res.data;
    },
    onSuccess: async (newBlog) => {
      // Invalidate and refetch blogs list - wait for it to complete
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
      // Also invalidate the specific blog query to ensure it's available
      if (newBlog?.id) {
        await queryClient.invalidateQueries({ queryKey: ["blog", newBlog.id] });
      }
    },
  });
};
