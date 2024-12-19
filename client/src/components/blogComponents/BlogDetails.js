import { useEffect } from "react";
import blogImage from "../../assets/blog-image.png";
import { useParams } from "react-router-dom";
import { useGetBlogByIdMutation } from "../../lib/APIs/blogApis";
import styles from "./Blog.module.css";

const BlogDetails = () => {
  const [getBlogById, { isError, isLoading, error, data }] =
    useGetBlogByIdMutation();

  const params = useParams();

  const { blogId } = params;

  useEffect(() => {
    getBlogById(blogId);
  }, [blogId]);

  return (
    <section className="container">
      <div className="row">
        <div className="col-lg-6">
          {data && <h3>{data?.blog?.title}</h3>}

          {data && (
            <div>
              <p>{data?.blog?.content}</p>
            </div>
          )}
        </div>
        <div className="col-lg-6">
          <img src={blogImage} className={styles.blog_image} />
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
