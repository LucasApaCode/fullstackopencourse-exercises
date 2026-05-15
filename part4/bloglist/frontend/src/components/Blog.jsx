import { useState } from "react";

const Blog = ({ blog, likedBlog, user, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {showDetails === false ? (
        <div>
          {blog.title}{" "}
          <button onClick={() => setShowDetails(!showDetails)}>view</button>
        </div>
      ) : (
        <div>
          {blog.title}{" "}
          <button onClick={() => setShowDetails(!showDetails)}>hide</button>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={likedBlog}>like</button>
          </div>
          <div>{blog.author}</div>
          {blog.user.id === user.id && (
            <button onClick={deleteBlog}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
