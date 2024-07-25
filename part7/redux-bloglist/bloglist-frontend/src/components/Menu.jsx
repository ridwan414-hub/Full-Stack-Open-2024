import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../reducers/loginReducer';
import { Container, Nav, NavItem, NavLink, Navbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedInUser);
  const padding = {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
    border: '1px solid',
    textDecoration: 'none',
    color: 'black',
  };
  return (
    <Navbar style={{ backgroundColor: 'chocolate' }} expand="lg">
      <Container>
        <Navbar.Brand href="/">Blog App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav variant="underline" defaultActiveKey="/">
            <NavItem>
              <NavLink href="/" as="span">
                <Link to={'/'} style={padding}>
                  Blogs
                </Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink eventKey="/users" as="span">
                <Link to={'/users'} style={padding}>
                  Users
                </Link>
              </NavLink>
            </NavItem>
            {user ? (
              <div>
                <em>{user.username} logged in</em>
                <Button variant="danger" onClick={() => dispatch(logOut())}>
                  Log Out
                </Button>
              </div>
            ) : (
              <>
                <NavItem>
                  <NavLink eventKey="/login" as="span">
                    <Link style={padding} to="/login">
                      Log In
                    </Link>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink eventKey="/signup" as="span">
                    <Link style={padding} to="/signup">
                      Sign Up
                    </Link>
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
