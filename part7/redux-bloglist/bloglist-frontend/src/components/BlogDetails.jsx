/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs, likeBlogs } from '../reducers/blogReducer';
import { useParams } from 'react-router-dom';
import Comments from './Comments';
import { useEffect } from 'react';
import {Button} from 'react-bootstrap'
const BlogDetails = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);
  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;
  if (blogs === null) return null;
  const blog = blogs.find((blog) => blog.id === id);

  const increaseLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    dispatch(likeBlogs(updatedBlog));
  };
  return (
    <div>
      <h3>
        {blog.title} {blog.author}
      </h3>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes
        <Button variant='success' onClick={increaseLikes}>like</Button>
      </p>
      added by {blog.user !== null && blog.user.name}
      <Comments id={id} />
    </div>
  );
};

export default BlogDetails;
