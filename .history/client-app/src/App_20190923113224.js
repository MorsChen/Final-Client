import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import { Button,Navbar, FormControl, Form } from 'react-bootstrap';


function Home() {
  return <div> HOME </div>
}

function App() {
  return (
    <div className="App">
      <Route>
          <Navbar bg="light" variant="light">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Link href="/">Home</Link>
            <Link href="#features">Features</Link>
            <Link href="#pricing">Pricing</Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-primary">Search</Button>
          </Form>
        </Navbar>

      </Route>
    </div>
  );
}

export default App;
