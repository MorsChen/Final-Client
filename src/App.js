import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
// import { Button } from "react-bootstrap";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import classnames from "classnames";



import Home from "./page/Home";
import SignUp from "./page/user/SignUp";
import Login from "./page/user/Login";
import Logout from "./page/user/Logout";
import Profile, {EditProfile, CreateProfile} from "./page/user/Profile";
import NavBar from "./static/NavBar";

import Events from "./page/event/Events";
import EventAdd, {EditEvent, DelEvent} from "./page/event/EventAdd";
import EventList, { SingleEvent } from "./page/event/EventList";

import Posts from "./page/post/Posts";
import PostAdd, {EditPost, DelPost} from "./page/post/PostAdd";
import PostList, { SinglePost } from "./page/post/PostList";

import Studios from "./page/studio/Studios";
import StudioCreate, {EditStudio, DelStudio} from "./page/studio/StudioCreate";
import StudioList, { SingleStudio } from "./page/studio/StudioList";

import Courses from "./page/course/Courses";
import CourseAdd, {EditCourse, DelCourse} from "./page/course/CourseAdd";
import CoursesList, { SingleCourse } from "./page/course/CoursesList";

import Workshops from "./page/workshop/Workshops";
import WorkshopAdd, {EditWorkshop, DelWorkshop} from "./page/workshop/WorkshopAdd";
import WorkshopList, { SingleWorkshop } from "./page/workshop/WorkshopList";

import Info from "./page/info/Info";
import InfoAdd, {EditInfo, DelInfo} from "./page/info/InfoAdd";



const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL

// version 1


export default class App extends React.Component {
  constructor(props) {
    super(props);
    const existingToken = localStorage.getItem('token');
    const accessToken = (window.location.search.split("=")[0]==="?api_key") ? window.location.search.split("=")[1] : null;


    if (accessToken) {
        localStorage.setItem('token', accessToken);
    };

    this.state = {
      isloading:true,
      events: {},
      posts: {},
      users: {},
      profiles: {},
      comments: {},
      news: {},
      users:[],
      token: existingToken || accessToken,
      user:{isSignin: false},
     
    }
    
  }
  
  componentDidMount() {
    this.fetchhome()
    this.fetchUser()
  }
  fetchhome = async () => {
    const a = await fetch(`${URLB}`,{
      headers: {
        "Content-Type": "application/json"
      }
    })
    const b = await a.json()
    console.log('check B in 64 app', b)
    if (b.status === 200) {
      this.setState({users:b.users, isLoaded: true})
    }
    console.log('check users', this.state.users)
  }
  
  fetchUser= async() =>{
    const token = this.state.token
    const a = await fetch(`${URLB}getuserinfo`,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      }
    })
    const b = await a.json()
    if (b.status === 200) {
      b.user.isSignin = true
      b.user.token = token
      this.setState({isloading:true , user:b.user})
    }
    console.log("check user from backend", this.state.user)
  }

  getToken = (token) => {
    this.setState({token : token})
    
  }
 
  render() {
    console.log("check token from app", this.state.user)
    console.log('check users', this.state.users)
    return (
      <div className="App">
        <Router>
            <NavBar user = {this.state.user} />
            
  
          <div className="mag-top">
            <Route path="/" exact component={ (props) => <Home {...props} user = {this.state.user} users = {this.state.users}/>}/>
            <Route path="/studios/" exact component={ (props) => <Studios {...props} user = {this.state.user} />} />
            <Route path="/events/" exact component={ (props) => <Events {...props} user = {this.state.user} />} />
            <Route path="/posts/" exact component={ (props) => <Posts {...props} user = {this.state.user} />} />
            <Route path="/courses/" exact component={ (props) => <Courses {...props} user = {this.state.user} />} />
            <Route path="/workshops/" exact component={ (props) => <Workshops {...props} user = {this.state.user} />} />
            
            <Route path="/profile/" exact component={ (props) => {if(this.state.user.isSignin === true) { 
              return <Profile {...props} user = {this.state.user}/>
             }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/profile/create/" component ={(props)=> {if(this.state.user.isSignin === true) { 
              return <CreateProfile {...props} user = {this.state.user}/>
             }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/profile/edit/" component ={(props)=> {if(this.state.user.isSignin === true) { 
              return <EditProfile {...props} user = {this.state.user}/>
             }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/logout/" component= { (props) => {if(this.state.user.isSignin === true) { 
              return <Logout {...props} token = {this.state.token}/>
             }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            {this.state.user.isSignin ? 
            <></>:<>
            <Route path="/register/" component={SignUp} />
            <Route path="/login/" component={ (props) => <Login {...props} getToken = {this.getToken} />}/>
            </>}
            
            <Route path="/events/add" component={ (props) => {if(this.state.user.isSignin === true) {
                return <EventAdd {...props} user = {this.state.user} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/events/list" component={ (props) => {if(this.state.user.isSignin === true) {
                return <EventList {...props} user = {this.state.user} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/events/single/:id" component={ (props) => {if(this.state.user.isSignin === true) {
                return <SingleEvent {...props} user = {this.state.user} id = {props.match.params.id} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/events/edit/:id" component={ (props) => {if(this.state.user.isSignin === true) {
                return <EditEvent {...props} user = {this.state.user} id = {props.match.params.id} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/events/delete/:id" component={ (props) => {if(this.state.user.isSignin === true) {
                return <DelEvent {...props} user = {this.state.user} id = {props.match.params.id} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>

            <Route path="/posts/add" component={ (props) => {if(this.state.user.isSignin === true) {
                return <PostAdd {...props} user = {this.state.user} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/posts/list" component={ (props) => {if(this.state.user.isSignin === true) {
                return <PostList {...props} user = {this.state.user} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/posts/single/:id" component={ (props) => {if(this.state.user.isSignin === true) {
                return <SinglePost {...props} user = {this.state.user} id = {props.match.params.id} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/posts/edit/:id" component={ (props) => {if(this.state.user.isSignin === true) {
                return <EditPost {...props} user = {this.state.user} id = {props.match.params.id} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/posts/delete/:id" component={ (props) => {if(this.state.user.isSignin === true) {
                return <DelPost {...props} user = {this.state.user} id = {props.match.params.id} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>

            <Route path="/studios/add" component={ (props) => {if(this.state.user.isSignin === true) {
                return <StudioCreate {...props} user = {this.state.user} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/studios/list" component={ (props) => {if(this.state.user.isSignin === true) {
                return <StudioList {...props} user = {this.state.user} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/studios/single/:id" component={ (props) => {if(this.state.user.isSignin === true) {
                return <SingleStudio {...props} user = {this.state.user} id = {props.match.params.id} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/studios/edit/:id" component={ (props) => {if(this.state.user.isSignin === true) {
                return <EditStudio {...props} user = {this.state.user} id = {props.match.params.id} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/studios/delete/:id" component={ (props) => {if(this.state.user.isSignin === true) {
                return <DelStudio {...props} user = {this.state.user} id = {props.match.params.id} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>

            <Route path="/courses/add" component={ (props) => {if(this.state.user.isSignin === true) {
                return <CourseAdd {...props} user = {this.state.user} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/courses/list" component={ (props) => {if(this.state.user.isSignin === true) {
                return <CoursesList {...props} user = {this.state.user} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/courses/single/:id" component={ (props) => {if(this.state.user.isSignin === true) {
                return <SingleCourse {...props} user = {this.state.user} id = {props.match.params.id} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/courses/edit/:id" component={ (props) => {if(this.state.user.isSignin === true) {
                return <EditCourse {...props} user = {this.state.user} id = {props.match.params.id} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/courses/delete/:id" component={ (props) => {if(this.state.user.isSignin === true) {
                return <DelCourse {...props} user = {this.state.user} id = {props.match.params.id} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>

            <Route path="/infos/" component={ (props) => {if(this.state.user.isSignin === true) {
                return <Info {...props} user = {this.state.user} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/infos/add" component={ (props) => {if(this.state.user.isSignin === true) {
                return <InfoAdd {...props} user = {this.state.user} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
           <Route path="/infos/edit/:id" component={ (props) => {if(this.state.user.isSignin === true) {
                return <EditInfo {...props} user = {this.state.user} id = {props.match.params.id} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/infos/delete/:id" component={ (props) => {if(this.state.user.isSignin === true) {
                return <DelInfo {...props} user = {this.state.user} id = {props.match.params.id} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>

            <Route path="/workshops/add" component={ (props) => {if(this.state.user.isSignin === true) {
                return <WorkshopAdd {...props} user = {this.state.user} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/workshops/list" component={ (props) => {if(this.state.user.isSignin === true) {
                return <WorkshopList {...props} user = {this.state.user} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/workshops/single/:id" component={ (props) => {if(this.state.user.isSignin === true) {
                return <SingleWorkshop {...props} user = {this.state.user} id = {props.match.params.id} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/workshops/edit/:id" component={ (props) => {if(this.state.user.isSignin === true) {
                return <EditWorkshop {...props} user = {this.state.user} id = {props.match.params.id} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>
            <Route path="/workshops/delete/:id" component={ (props) => {if(this.state.user.isSignin === true) {
                return <DelWorkshop {...props} user = {this.state.user} id = {props.match.params.id} />
                }else{ return <Login {...props} getToken = {this.getToken}/>}}}/>

            <Route path="/about/" component={About} />
          </div>
  
          <Footer user={this.state.user}/>
        </Router>
      </div>
    );
  }
 
}

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props, isLoaded : false, isUserinfo: true,
      prevScrollpos: window.pageYOffset,
      scrolling: true,
    };
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
  render(){
    return [
      <div className={classnames("footer", {
        "footer--color": !this.state.scrolling
      })}>
          <div style={{display:"flex", justifyContent: "space-between", paddingLeft: "20px",paddingRight: "20px"}}>
            <div><h5 className="footer-h5" >ART NOTE</h5></div>
            <div><h7 className="footer-h5">craz.writer@gmail.com</h7></div>
          </div>
        </div>
    ]
  }
}

function About() {
  return (
    <div className="FullContent">
        <div className="in-fullcont">
        <h3 className="home-title">About</h3>
        <div className="about-contain">
            <h5 style={{color:"red"}}> This is my final project for my course at CoderSchool</h5>
            <h7 style={{color:"#ff6600"}}>My website is about Art, Illustration, Environment, drawing and skills to help you better in Drawing.</h7>
            <p style={{color:"#acacac"}}>This website will share with readers about the courses, training classes and events of schools and studios.</p>
            <p style={{color:"#acacac"}}>At the same time, readers can post Blog posts and can enjoy the works posted by people.</p>
            <p style={{color:"rgb(0, 174, 255)"}}>If you have questions or comments please contact us.</p>
            <p style={{color:"#0062ff"}}>craz.writer@gmail.com</p>
        </div>

    </div>
    </div>
    );
}
