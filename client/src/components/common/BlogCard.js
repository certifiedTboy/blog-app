import { Link } from "react-router-dom";
const BlogCard = ({ content, title, imageUrl, blogId }) => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card" style={{ width: "100%" }}>
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{content}</p>
          <Link to={`/blogs/${blogId}`} className="">
            Read More...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
