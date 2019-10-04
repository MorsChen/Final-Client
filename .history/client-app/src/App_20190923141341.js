import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

import { Button, Navbar, FormControl, Form, Nav} from 'react-bootstrap';

import Home from './page/Home'

function Events() {
  return <div> <p>Events1</p><br/> <p>Events</p><br/> <p>Events</p><br/> <p>Events</p><br/> <p>Events</p><br/> <p>Events1</p><br/> <p>Events1</p><br/> <p>Events</p><br/> <p>Events</p><br/> <p>Events</p><br/> <p>Events</p><br/> <p>Events</p><br/> <p>Events</p><br/>  </div>
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
          <Navbar.Brand to="/">ART NOTE</Navbar.Brand>
          <Nav className="mr-auto">
                <Link class ='btn' to="/">Home</Link>
                <Link class ='btn' to="/events">Events</Link>
                <Link class ='btn' to="/studio/">Studio</Link>
                <Link class ='btn' to="/workshop/">WorkShop</Link>
                <Link class ='btn' to="/courses/">Courses</Link>
                <Link class ='btn' to="/learningpaths/">Learning Paths</Link>
                <Link class ='btn' to="/about/">About</Link>
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
