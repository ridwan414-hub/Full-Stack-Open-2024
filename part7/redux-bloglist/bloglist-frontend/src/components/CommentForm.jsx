/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { addComment } from '../reducers/commentReducer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch();
  const handleComment = (e) => {
    e.preventDefault();
    const comment = e.target.c.value;
    dispatch(
      addComment(blogId, {
        content: comment,
      })
    );
    e.target.c.value = '';
  };
  return (
    <div>
      <Form onSubmit={handleComment}>
        <Form.Group className="mb-3">
          <Form.Control type="text" name="c" placeholder="write your comment" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Comment
        </Button>
      </Form>
    </div>
  );
};

export default CommentForm;
