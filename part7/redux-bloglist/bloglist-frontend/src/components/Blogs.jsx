import { useSelector } from 'react-redux';
import Blog from './Blog';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  return (
    <div>
      <h2>blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <Blog blog={blog} key={blog.id} />
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
