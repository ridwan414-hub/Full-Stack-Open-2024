import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUser, initializeAllUsers } from '../reducers/userReducer';
const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const username = e.target.U.value;
    const name = e.target.N.value;
    const password = e.target.P.value;
    dispatch(
      createUser({
        username: username,
        name: name,
        password: password,
      })
    );
    dispatch(initializeAllUsers());
    e.target.P.value = '';
    e.target.U.value = '';
    e.target.N.value = '';
    navigate('/');
  };

  return (
    <Form onSubmit={handleSignUp}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Your Name</Form.Label>
        <Form.Control type="text" name="N" placeholder="Enter Your Name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicUserName">
        <Form.Label>User Name</Form.Label>
        <Form.Control type="text" name="U" placeholder="Enter Your Username" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="P" placeholder="Create Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
};
export default SignUpForm;
