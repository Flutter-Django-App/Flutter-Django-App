import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Navbar, Nav, Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

function Navb(props) {
	const logged_out_nav = (
		<ul>
      <li onClick={() => props.display_form('login')}>login</li>
      <li onClick={() => props.display_form('signup')}>signup</li>
    </ul>
  );
  
  const logged_in_nav = (
	<header>
		<Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
			<Container>
				<LinkContainer to="/">
				<Navbar.Brand>Flutter</Navbar.Brand>
				</LinkContainer>
				<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link>
						<li onClick={props.handle_logout}>logout</li>
					</Nav.Link>
					<LinkContainer to="/photos" >
						<Nav.Link>
							Feed
						</Nav.Link>
					</LinkContainer>

					<LinkContainer to="/photos/create" >

						<Nav.Link>
							Add Photo
						</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/profile" >
						<Nav.Link>
							Profile
						</Nav.Link>
					</LinkContainer>
				</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	</header>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Navb;

Navb.propTypes = {
	logged_in: PropTypes.bool.isRequired,
	display_form: PropTypes.func.isRequired,
	handle_logout: PropTypes.func.isRequired
};



// import "./NavBar.css";

// export default function NavBar() {

// 	// function handleLogOut() {
// 	// 	// Delegate to the users-service
// 	// 	userService.logOut();
// 	// 	// Update state will also cause a re-render
// 	// 	setUser(null);
// 	// }

// 	return (
// 		<nav className="ConversationList">
// 			<Link to='/photos' >Feed</Link>
// 			&nbsp; | &nbsp;
// 			<Link to='/addphoto' >Add Photo</Link>
// 			&nbsp; | &nbsp;
// 			<Link to='/profile' >Profile</Link>
// 			&nbsp; | &nbsp;
// 			<Link to=''  >
// 				Log Out
// 			</Link>
// 		</nav>
// 	);
// }
