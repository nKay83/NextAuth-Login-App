export default async function Posts() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    const posts = await res.json();
  
    return (
      <div>
        <h1>Danh sách bài viết</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    );
  }