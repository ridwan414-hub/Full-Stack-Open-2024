import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import Toggleable from './Toggleable';
import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const BlogForm = () => {
  const dispatch = useDispatch();
  const formRef = useRef();
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
      <Toggleable buttonLabel="create new blog" ref={formRef} onc>
        <Form onSubmit={handleCreate}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="t" placeholder="type title" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" name="a" placeholder="type author name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Url</Form.Label>
            <Form.Control type="text" name="u" placeholder="type url" />
          </Form.Group>

          <Button type="submit">Create</Button>
        </Form>
      </Toggleable>
    </div>
  );
};
export default BlogForm;
