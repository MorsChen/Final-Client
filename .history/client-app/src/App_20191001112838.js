import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';



import Home from "./page/Home";
import SignUp from "./page/SignUp";
import Login from "./page/Login";
import Logout from "./page/Logout";
import Profile from "./page/Profile";
import NavBar from "./static/NavBar";

// const URL = `https://127.0.0.1:5000/`
export default class App extends React.Component {
  constructor(props) {
    super(props);
    const existingToken = localStorage.getItem('token');
    const accessToken = (window.location.search.split("=")[0]==="?api_key") ? window.location.search.split("=")[1] : null;
    
    if (!accessToken && !existingToken){
        window.location.replace(`localhost:3000/`)
    };

    if (accessToken) {
        localStorage.setItem('token', accessToken);
    };
    
    this.state = {
      isSignin: false,
      events: {},
      blogs: {},
      users: {},
      profiles: {},
      comments: {},
      news: {},
      token: existingToken || accessToken,
     
    }
  }
  
  getToken = (token, isSignin) => {
    this.setState({token : token, isSignin: isSignin})
    
  }
  // isSignin = () =>{
  //   if (this.state.token !== null){
  //     this.setState({ isSignin : true})
  //   }else {
  //     this.setState({isSignin: false})
  //   }
  //   localStorage.setItem('isSignin', this.isSignin)
  // }

  render() {
    console.log('check state', this.state)
    console.log('check token login', this.state.token)
    console.log('check user login', this.state.isSignin)
    return (
      <div className="App">
        <Router>
            <NavBar isSignin = {this.state.isSignin} token = {this.state.token} />
            
  
          <div className="mag-top">
            <Route path="/" exact component={Home}/>
            <Route path="/events/" exact component={Events} />
            <Route path="/studio/" exact component={Studio} />
            <Route path="/workshop/" component={Workshop} />
            <Route path="/profile/" exact component={ (props) => <Profile {...props} token = {this.state.token} />} />
            <Route path="/courses/" component={Courses} />
            {/* <Route path="/learningpaths/" component={LearningPaths} /> */}
            <Route path="/login/" component={ (props) => <Login {...props} getToken = {this.getToken} />}/>
            <Route path="/logout/" component= { (props) => <Logout {...props} token = {this.state.token} />}/>
            <Route path="/register/" component={SignUp} />
            <Route path="/about/" component={About} />
          </div>
  
          <div className="modal-footer">Mors Chen</div>
        </Router>
      </div>
    );
  }
 
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

// function Logout () {
//   return window.location.replace(`${URL}logout`)
// }




