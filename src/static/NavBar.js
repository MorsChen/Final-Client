import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown} from "react-bootstrap";
import classnames from "classnames";
import { isThisHour } from "date-fns";

const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL
export default class NavBar extends React.Component {
  constructor(props) {
      super(props);
      this.state = {...props,
        isLoaded : false,
        isUserinfo: true,
        isWorkshopInfo: true,
        prevScrollpos: window.pageYOffset,
        scrolling: true,
      };
    }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.getStudios()
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

  getStudios = async() => {
    const resp = await fetch(`${URLB}workshops/`, {
        method: "GET",
        headers: ({
            "Content-Type": "application/json",
            })
        });
    const data = await resp.json()
    if (data.status = 200){
        if (data.workshop === null){
            this.setState({isWorkshopInfo: false})}
        else{this.setState({ workshops: data.workshop,
            isLoaded: true,
        });
    }
    }
}


  render () {
      return [
        // <Navbar scrolling dark bg="light" expand="lg" id="navbar">
        <Navbar  bg="dark" expand="lg"
        className={classnames("", {
          "navbar--color": !this.state.scrolling
        })}
        >
          <Nav.Link class="navbar-brand" href="/">ART NOTE</Nav.Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link class="nav-link" href="/">
                    Home
                  </Nav.Link>
                  
                  {this.props.user.isSignin ? <> {this.props.user.id<=2 ? <>
                    <NavDropdown title="Studios" id="basic-nav-dropdown">
                    
                        
                        <Nav.Link class="nav-link nav-item active" href="/studios/">
                        List
                        </Nav.Link>
                        <Nav.Link class="nav-link" href="/studios/list">
                        Your Studio
                        </Nav.Link>
                        <Nav.Link class="nav-link" href="/studios/add">
                        Create your Studio
                        </Nav.Link>
                        <div class="dropdown-divider"></div>
                        <Nav.Link class=" nav-link" href="/infos/">
                        Info
                        </Nav.Link>
                        <Nav.Link class="nav-link" href="/infos/add">
                        Create Info
                        </Nav.Link>
                    </NavDropdown>

                    <NavDropdown title="Course" id="basic-nav-dropdown">
                      <Nav.Link class="nav-link" href="/courses/">
                        Studio's Course
                        </Nav.Link>
                        <Nav.Link class="nav-link" href="/courses/add">
                        Create your Course
                        </Nav.Link>
                        <div class="dropdown-divider"></div>
                        <div>
                        {this.state.workshops && this.state.workshops.map( e=>{
                          return (
                            <div>
                              <Nav.Link class="nav-link" 
                              // href={`/workshops/single/${e.workshop_id}`}
                              onClick={()=>window.location.replace(`${URLF}workshops/single/${e.workshop_id}`)}
                              >
                              {e.title}
                              </Nav.Link>

                              </div>
                          )
                        })}
                        </div>
                        <div class="dropdown-divider"></div>
                        <Nav.Link class="nav-link" href="/workshops/add">
                        Create Workshop
                        </Nav.Link>
                    </NavDropdown>
                    
                    </>:<>
                    <Nav.Link class="nav-link" href="/studios/">
                        Studios
                    </Nav.Link>
                    <NavDropdown title="Course" id="basic-nav-dropdown">
                      <Nav.Link class="nav-link" href="/courses">
                        Courses & Workshop
                        </Nav.Link>
                        
                        <div class="dropdown-divider"></div>
                        <div>
                        {this.state.workshops && this.state.workshops.map( e=>{
                          return (
                            <div>
                              <Nav.Link class="nav-link" 
                              // href={`/workshops/single/${e.workshop_id}`}
                              onClick={()=>window.location.replace(`${URLF}workshops/single/${e.workshop_id}`)}
                              >
                              {e.title}
                              </Nav.Link>

                              </div>
                          )
                        })}
                        </div>
                    </NavDropdown>
                        </>}

                    <NavDropdown title="Events" id="basic-nav-dropdown" data-hover="dropdown" data-animations="zoomIn fadeInLeft fadeInUp fadeInRight">
                    <Nav.Link class="nav-link" href="/events/">
                        List
                        </Nav.Link>
                        <Nav.Link class="nav-link" href="/events/list">
                        Your Events
                        </Nav.Link>
                        <Nav.Link class="nav-link" href="/events/add">
                        Create Events
                        </Nav.Link>
                      </NavDropdown>

                      <NavDropdown title="Posts" id="basic-nav-dropdown">
                      <Nav.Link class="nav-link" href="/Posts/">
                          List
                          </Nav.Link>
                          <Nav.Link class="nav-link" href="/posts/list">
                          Your Posts
                          </Nav.Link>
                          <Nav.Link class="nav-link" href="/posts/add">
                          Create Posts
                          </Nav.Link>
                      </NavDropdown>

                      <Nav.Link class="nav-link" href="/about/">
                        About
                      </Nav.Link>
                      </> : <>
                      <Nav.Link class="nav-link" href="/studios/">
                      Studios
                      </Nav.Link>
                      <Nav.Link class="nav-link" href="/events/">
                      Events
                      </Nav.Link>
                      <Nav.Link class="nav-link" href="/posts/">
                      Posts
                      </Nav.Link>
                      </>}
                  
                
              </Nav>
              <Nav className="mr-0">
                  {this.props.user.isSignin ? <>
                  <Nav.Link class="nav-link" href="/profile/">
                      Profile
                  </Nav.Link>
                  <Nav.Link class="nav-link" href="/logout">Logout</Nav.Link>
                  </> : <>
                      <Nav.Link class="nav-link" href="/login">Login</Nav.Link>
                      <Nav.Link class="nav-link" href="/register">Sign Up</Nav.Link></>}
              </Nav>
            </Navbar.Collapse>
          </Navbar>

      ]
  }
}