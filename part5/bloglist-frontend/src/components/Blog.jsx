import { useState } from "react";
const blogStyle = {
  background:'yellow',
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};
const buttonStyle = {
background:'blue'
}
const Blog = ({ blog, updateLikedBlog, deleteBlog,user}) => {
  const [visibility, setVisibility] = useState(false);
  const hideWhenVisible = { display: visibility ? 'none' : '' };
  const showWhenVisible = { display: visibility ? '' : 'none' };

  const handleView = () => {
    setVisibility(!visibility);
  };
  const handleLike = () => {
    blog.likes = blog.likes + 1;
    const likedBlogObject = blog;
    updateLikedBlog(likedBlogObject);
  };
  const logic = (user.username === blog.user.username)
  console.log(logic)
  const handleRemove=()=>deleteBlog(blog)

  return (
    <div style={blogStyle}>
      <div>
        <div style={hideWhenVisible}>
          {blog.title}
          <button onClick={handleView}>view</button>
        </div>
        <div style={showWhenVisible}>
          <div>
            {blog.title}
            <button onClick={handleView}>Hide</button>
          </div>
          <div><a href={blog.url}>{blog.url}</a></div>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.author}</div>
          {
(logic)?<button style={buttonStyle} onClick={handleRemove}>remove</button>:''
          }
        </div>
      </div>
    </div>
  );
};

export default Blog;
