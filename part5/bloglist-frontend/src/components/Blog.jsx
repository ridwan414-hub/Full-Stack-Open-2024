import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = (props) => {
  const blog = props.blog;
  const [blogObject, setBlogObject] = useState(blog);
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const buttonLabel = visible ? 'hide' : 'view';

  const increaseLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    props.updateLikedBlog(updatedBlog);
    setBlogObject(updatedBlog);
  };

  const removeBlog = () => props.deleteBlog(blog);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    background: 'yellow'
  };
  const removeButton = {
    background:'blue'
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        <p>
          {blog.title} - {blog.author}{' '}
          <button onClick={toggleVisibility}>{buttonLabel}</button>
        </p>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>
          {blogObject.likes}{' '}
          <button id="likeButton" onClick={increaseLikes}>
            like
          </button>
        </p>
        <button id="remove" style={removeButton} onClick={removeBlog}>
          remove
        </button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikedBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
