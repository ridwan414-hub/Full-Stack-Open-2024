import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import BlogForm from './BlogForm';
import { Link } from 'react-router-dom';
import BlogDetails from './BlogDetails';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const Blog = ({ blog }) => {

  return (
    <ListGroup as="ol">
      <ListGroupItem as="li" variant='info' action className='p-2 mt-3'>
        <Link to={`/blogs/${blog.id}`} element={<BlogDetails />}>
          {blog.title} - {blog.author}
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
};

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  if (blogs === null) return null;
  return (
    <div>
      <h2>Blogs</h2>
      <BlogForm></BlogForm>
      {blogs.map((blog) => (
        <Blog blog={blog} key={blog.id} />
      ))}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blogs;
