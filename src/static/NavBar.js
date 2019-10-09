import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown} from "react-bootstrap";
import classnames from "classnames";


export default class NavBar extends React.Component {
  constructor(props) {
      super(props);
      this.state = {...props,
        isLoaded : false,
        isUserinfo: true,
        prevScrollpos: window.pageYOffset,
        scrolling: true};
      console.log("check props navbar", this.props.user)
      console.log("check props render navbar", this.state.user)
    }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = () => {
    const { prevScrollpos } = this.state;
  
    const currentScrollPos = window.pageYOffset;
    const scrolling = prevScrollpos > currentScrollPos;
  
    this.setState({
      prevScrollpos: currentScrollPos,
      scrolling
    });
  };

  render () {
   
    console.log("check props render navbar", this.state.user)
    console.log("check token from navbar", this.props.user.token)
      return [
        // <Navbar scrolling dark bg="light" expand="lg" id="navbar">
        <Navbar  bg="dark" expand="lg"
        className={classnames("", {
          "navbar--color": !this.state.scrolling
        })}
        >
          <Link class="navbar-brand" to="/">ART NOTE</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link class="nav-link" to="/">
                    Home
                  </Link>
                  
                  {this.props.user.isSignin ? <>

                    <NavDropdown title="Studios" id="basic-nav-dropdown">
                    <Link class="dropdown-item" to="/studios/">
                        List
                        </Link>
                        <Link class="dropdown-item" to="/studios/list">
                        Your Studio
                        </Link>
                        <Link class="dropdown-item" to="/studios/add">
                        Create your Studio
                        </Link>
                    </NavDropdown>

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
                      </NavDropdown>

                      <NavDropdown title="Posts" id="basic-nav-dropdown">
                      <Link class="dropdown-item" to="/Posts/">
                          List
                          </Link>
                          <Link class="dropdown-item" to="/posts/list">
                          Your Posts
                          </Link>
                          <Link class="dropdown-item" to="/posts/add">
                          Create Posts
                          </Link>
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
                      <Link class="nav-link" to="/studios/">
                      Studios
                      </Link>
                      <Link class="nav-link" to="/events/">
                      Events
                      </Link>
                      <Link class="nav-link" to="/posts/">
                      Posts
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