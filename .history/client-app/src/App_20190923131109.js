import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

import { Button, Navbar, FormControl, Form, Nav} from 'react-bootstrap';


function Home() {
  return <div> HOME </div>
}

function Events() {
  return <div> Events </div>
}

function Studio() {
  return <div> Studio </div>
}

function Workshop() {
  return <div> Workshop </div>
}

function Courses() {
  return <div> Courses </div>
}

function LearningPaths() {
  return <div> Learning Paths </div>
}

function User() {
  return <div> User </div>
}

function About() {
  return <div> ABOUT</div>
}

function App() {
  return (
    <div className="App">
      <Router>
          <Navbar bg="light" variant="light">
          <Navbar.Brand to="/">LOGO</Navbar.Brand>
          <Nav className="mr-auto">
            <ul>
                <Link class ='btn' to="/">Home</Link>
                <Link class ='btn' to="/events">Events</Link>
                <Link class ='btn' to="/studio/">Studio</Link>
                <Link class ='btn' to="/workshop/">WorkShop</Link>
                <Link class ='btn' to="/courses/">Courses</Link>
                <Link class ='btn' to="/learningpaths/">Learning Paths</Link>
                <Link class ='btn' to="/about/">About</Link>
                </ul>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-primary">Search</Button>
            <Link class ='btn' to="/users">Login</Link>
            <Link class ='btn' to="/users">Sign Up</Link>
          </Form>
        </Navbar>

        <Route path="/" exact component={Home} />
        <Route path="/events/" exact component={Events} />
        <Route path="/studio/" exact component={Studio} />
        <Route path="/workshop/" component={Workshop} />
        <Route path="/courses/" component={Courses} />
        <Route path="/learningpaths/" component={LearningPaths} />
        <Route path="/users/" component={User} />
        <Route path="/about/" component={About} />


      </Router>
    </div>
  );
}

export default App;
