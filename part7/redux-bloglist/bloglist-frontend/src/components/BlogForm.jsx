import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';

const BlogForm = () => {
  const dispatch = useDispatch();

  const handleCreate = (e) => {
    e.preventDefault();
    const newTitle = e.target.t.value;
    const newAuthor = e.target.a.value;
    const newUrl = e.target.u.value;
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };
    dispatch(createBlog(newBlog));
    e.target.t.value = '';
    e.target.a.value = '';
    e.target.u.value = '';
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input name="t" placeholder="write title here" />
        </div>
        <div>
          author:
          <input name="a" placeholder="write author here" />
        </div>
        <div>
          url:
          <input name="u" placeholder="write url here" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
export default BlogForm;
