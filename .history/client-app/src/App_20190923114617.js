import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import { Button, Navbar, FormControl, Form, Nav} from 'react-bootstrap';


function Home() {
  return <div> HOME </div>
}

function User() {
  return <div> USER </div>
}
function About() {
  return <div> ABOUT</div>
}

function App() {
  return (
    <div className="App">
      <Router>
          <Navbar bg="light" variant="light">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <ul>
                <Link to="/">Home</Link>
                <Link to="/user/">User</Link>
                <Link to="/about/">About</Link>
                </ul>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-primary">Search</Button>
          </Form>
        </Navbar>

        <Route path="/" exact component={Home} />
        <Route path="/about/" component={About} />
        <Route path="/user/" component={User} />

      </Router>
    </div>
  );
}

export default App;
