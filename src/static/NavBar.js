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
        
      console.log("check props navbar", this.state)
      console.log("check props render navbar", this.state.user)
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
   
    console.log("check props render navbar", this.props.user)
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
                  
                  {this.props.user.isSignin ? <> {this.props.user.id<=2 ? <>
                    <NavDropdown title="Studios" id="basic-nav-dropdown">
                    
                        
                        <Link class="nav-link nav-item active" to="/studios/">
                        List
                        </Link>
                        <Link class="nav-link" to="/studios/list">
                        Your Studio
                        </Link>
                        <Link class="nav-link" to="/studios/add">
                        Create your Studio
                        </Link>
                        <div class="dropdown-divider"></div>
                        <Link class=" nav-link" to="/infos/">
                        Info
                        </Link>
                        <Link class="nav-link" to="/infos/add">
                        Create Info
                        </Link>
                    </NavDropdown>

                    <NavDropdown title="Course" id="basic-nav-dropdown">
                      <Link class="nav-link" to="/courses/">
                        Studio's Course
                        </Link>
                        <Link class="nav-link" to="/courses/add">
                        Create your Course
                        </Link>
                        <div class="dropdown-divider"></div>
                        <div>
                        {this.state.workshops && this.state.workshops.map( e=>{
                          return (
                            <div>
                              <Link class="nav-link" 
                              // to={`/workshops/single/${e.workshop_id}`}
                              onClick={()=>window.location.replace(`${URLF}workshops/single/${e.workshop_id}`)}
                              >
                              {e.title}
                              </Link>

                              </div>
                          )
                        })}
                        </div>
                        <div class="dropdown-divider"></div>
                        <Link class="nav-link" to="/workshops/add">
                        Create Workshop
                        </Link>
                    </NavDropdown>
                    
                    </>:<>
                    <Link class="nav-link" to="/studios/">
                        Studios
                    </Link>
                    <NavDropdown title="Course" id="basic-nav-dropdown">
                      <Link class="nav-link" to="/courses">
                        Courses & Workshop
                        </Link>
                        
                        <div class="dropdown-divider"></div>
                        <div>
                        {this.state.workshops && this.state.workshops.map( e=>{
                          return (
                            <div>
                              <Link class="nav-link" 
                              // to={`/workshops/single/${e.workshop_id}`}
                              onClick={()=>window.location.replace(`${URLF}workshops/single/${e.workshop_id}`)}
                              >
                              {e.title}
                              </Link>

                              </div>
                          )
                        })}
                        </div>
                    </NavDropdown>
                        </>}

                    <NavDropdown title="Events" id="basic-nav-dropdown" data-hover="dropdown" data-animations="zoomIn fadeInLeft fadeInUp fadeInRight">
                    <Link class="nav-link" to="/events/">
                        List
                        </Link>
                        <Link class="nav-link" to="/events/list">
                        Your Events
                        </Link>
                        <Link class="nav-link" to="/events/add">
                        Create Events
                        </Link>
                      </NavDropdown>

                      <NavDropdown title="Posts" id="basic-nav-dropdown">
                      <Link class="nav-link" to="/Posts/">
                          List
                          </Link>
                          <Link class="nav-link" to="/posts/list">
                          Your Posts
                          </Link>
                          <Link class="nav-link" to="/posts/add">
                          Create Posts
                          </Link>
                      </NavDropdown>

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
                  {this.props.user.isSignin ? <>
                  <Link class="nav-link" to="/profile/">
                      Profile
                  </Link>
                  <Link class="nav-link" to="/logout">Logout</Link>
                  </> : <>
                      <Link class="nav-link" to="/login">Login</Link>
                      <Link class="nav-link" to="/register">Sign Up</Link></>}
              </Nav>
            </Navbar.Collapse>
          </Navbar>

      ]
  }
}