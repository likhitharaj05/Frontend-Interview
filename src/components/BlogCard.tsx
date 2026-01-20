export default function BlogCard({ blog, onClick }: any) {
    return (
      <div
        onClick={onClick}
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        <h3>{blog.title}</h3>
        <p>{blog.description}</p>
      </div>
    );
  }
  