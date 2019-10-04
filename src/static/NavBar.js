import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown} from "react-bootstrap";


export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded : false, isUserinfo: true};
        console.log("check props navbar", this.props.user)
        console.log("check props render navbar", this.state.user)
      }

  render () {
    console.log("check props render navbar", this.state.user)
    console.log("check token from navbar", this.props.user.token)
      return [
          <Navbar bg="light" expand="lg">
          <Link class="navbar-brand" to="/">ART NOTE</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link class="nav-link" to="/">
                    Home
                  </Link>
                  <Link class="nav-link" to="/studio/">
                    Studio
                  </Link>
                  {this.props.user.isSignin ? <>
                    <NavDropdown title="Events" id="basic-nav-dropdown">
                    <Link class="dropdown-item" to="/events/">
                        List
                        </Link>
                        <Link class="dropdown-item" to="/events/list">
                        Your Events
                        </Link>
                        <Link class="dropdown-item" to="/events/add">
                        Create Events
                        </Link>
                        
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">Contact US</NavDropdown.Item>
                    </NavDropdown>
                    <Link class="nav-link" to="/workshop/">
                    WorkShop
                    </Link>
                    <Link class="nav-link" to="/courses/">
                      Courses
                    </Link>
                    <Link class="nav-link" to="/profile/">
                      Profile
                    </Link>
                    <Link class="nav-link" to="/about/">
                      About
                    </Link>
                    </> : <>
                    <Link class="nav-link" to="/events/">
                    Events
                  </Link>
                      </>}
                  
                
              </Nav>
              <Nav className="mr-0">
                  {this.props.user.isSignin ? <><Link class="nav-link" to="/logout">Logout</Link>
                  </> : <>
                      <Link class="nav-link" to="/login">Login</Link>
                      <Link class="nav-link" to="/register">Sign Up</Link></>}
              </Nav>
            </Navbar.Collapse>
          </Navbar>

      ]
  }
}