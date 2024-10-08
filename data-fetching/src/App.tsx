import { ReactNode, useEffect, useState } from "react";
import { get } from "./utils/http";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import fetchingImg from "./assets/data-fetching.png";
import ErrorMessage from "./components/ErrorMessage";

type RawDataBlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  // Initialize fetchedPosts as an empty array to ensure it's always an array type
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      setError(""); // Reset previous errors before fetching new data
      try {
        const data = (await get(
          "https://jsonplaceholder.typicode.com/posts",
        )) as RawDataBlogPost[];
        const blogPosts: BlogPost[] = data.map((rawPost) => ({
          id: rawPost.id,
          title: rawPost.title,
          text: rawPost.body,
        }));
        setFetchedPosts(blogPosts);
      } catch (err) {
        // Ensure error is an instance of Error before accessing message
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setIsFetching(false);
      }
    }

    fetchPosts();
  }, []);
  let content: ReactNode;

  if (error) {
    content = <ErrorMessage text={error} />;
  }

  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />;
  }

  if (isFetching) {
    content = <p id="loading-fallback">Fetching posts...</p>;
  }

  return (
    <main>
      <img src={fetchingImg} alt="An abstract image" />
      {content}
    </main>
  );
}

export default App;
