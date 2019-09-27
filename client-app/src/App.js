import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, Nav} from "react-bootstrap";

import Home from "./page/Home";
import SignUp from "./page/SignUp";
import Login from "./page/Login";


function App() {
  return (
    <div className="App">
      <Router>
          <Navbar bg="light" expand="lg">
          <Link class="navbar-brand" to="/">ART NOTE</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link class="nav-link" to="/">
                    Home
                  </Link>
                  <Link class="nav-link" to="/events/">
                    Events
                  </Link>
                  <Link class="nav-link" to="/studio/">
                    Studio
                  </Link>
                  <Link class="nav-link" to="/workshop/">
                    WorkShop
                  </Link>
                  <Link class="nav-link" to="/courses/">
                    Courses
                  </Link>
                  {/* <Link class="nav-link" to="/learningpaths/">
                    Learning Paths
                  </Link> */}
                  <Link class="nav-link" to="/about/">
                    About
                  </Link>
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
              <Nav className="mr-0">
                <Link class="nav-link" to="/login">
                    Login
                  </Link>
                  <Link class="nav-link" to="/register">
                    Sign Up
                  </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

        <div className="mag-top">
          <Route path="/" exact component={Home} />
          <Route path="/events/" exact component={Events} />
          <Route path="/studio/" exact component={Studio} />
          <Route path="/workshop/" component={Workshop} />
          <Route path="/courses/" component={Courses} />
          {/* <Route path="/learningpaths/" component={LearningPaths} /> */}
          <Route path="/login/" component={Login} />
          <Route path="/register/" component={SignUp} />
          <Route path="/about/" component={About} />
        </div>

        <div className="modal-footer">Mors Chen</div>
      </Router>
    </div>
  );
}

function Events() {
  return <div className="FullContent"> Events </div>;
}

function Studio() {
  return <div className="FullContent"> Studio </div>;
}

function Workshop() {
  return <div className="FullContent"> Workshop </div>;
}

function Courses() {
  return <div className="FullContent"> Courses </div>;
}

// function LearningPaths() {
//   return <div> Learning Paths </div>;
// }

function About() {
  return <div className="FullContent"> ABOUT</div>;
}


export default App;
