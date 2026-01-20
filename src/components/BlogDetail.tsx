import { useQuery } from "@tanstack/react-query";

const BASE_URL = "http://localhost:3001";

export default function BlogDetail({ id }: { id: number }) {
  const { data, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/blogs/${id}`);
      return res.json();
    },
  });

  if (isLoading) return <p>Loading blog...</p>;

  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
    </div>
  );
}
