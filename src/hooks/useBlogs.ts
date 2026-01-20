import { useQuery } from "@tanstack/react-query";

const BASE_URL = "http://localhost:3001";

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/blogs`);
      if (!res.ok) {
        throw new Error("Failed to fetch blogs");
      }
      return res.json();
    },
  });
};
