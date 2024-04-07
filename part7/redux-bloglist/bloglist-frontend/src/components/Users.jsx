/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserBloglist from './UserBloglist';
import ListGroup from 'react-bootstrap/ListGroup';
const User = ({ user }) => {
  return (
    <div>
      <ListGroup.Item>
          {user.name} has added { }
        <Link to={`/users/${user.id}`} element={<UserBloglist />}>
           {user.blogs.length} blogs
        </Link>
      </ListGroup.Item>
    </div>
  );
};

const Users = () => {
  const users = useSelector((state) => state.allUsers);
  if (users === null) return null;
  return (
    <div>
      <h2>Users</h2>
      <p>total users : {users.length}</p>
      <ListGroup>
        {users.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </ListGroup>
    </div>
  );
};

export default Users;
