import { useEffect } from "react";
import BlogCard from "../common/BlogCard";
import ErrorOutput from "../common/ErrorOutput";
import Loader from "../common/Loader";
import { useGetAllBlogsMutation } from "../../lib/APIs/blogApis";

const Blogs = () => {
  const [getAllBlogs, { isLoading, error, isError, data }] =
    useGetAllBlogsMutation();

  useEffect(() => {
    const timer = setTimeout(() => {
      getAllBlogs();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="container mt-5">
      <div className="row">
        {isError && (
          <ErrorOutput errorMessage={error?.error || "Something went wrong"} />
        )}
        {isLoading && (
          <div className="d-flex justify-content-center align-items-center">
            <Loader />
          </div>
        )}
        {data &&
          data?.blogs.length > 0 &&
          data?.blogs.map((blog) => {
            return (
              <BlogCard
                title={blog.title}
                content={blog.content}
                imageUrl={blog.image}
                key={blog._id}
                blogId={blog._id}
              />
            );
          })}
      </div>
    </section>
  );
};

export default Blogs;
