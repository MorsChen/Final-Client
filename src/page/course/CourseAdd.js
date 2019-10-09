import React, {Component} from "react";
// import { Button } from "react-bootstrap";
import Moment from 'react-moment';
import 'moment-timezone';


const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL
class CourseAdd extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            body: "",
            image_url: "",
        };

      }

    handleRegister = async e => {
        e.preventDefault();
        const user = this.props.user
        if (user.isSignin !== true) {
            alert("Please login");
            return window.location.replace(`${URLF}login/`)
        }
        else {
            let newcourse = {
            title: this.state.title,
            body: this.state.body,
            image_url: this.state.image_url,
            };
            const token = this.props.user.token
            const response = await fetch(`${URLB}courses/add`, {
            method: "POST",
            body: JSON.stringify(newcourse),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            })
            });
            const data = await response.json()
            if (data.status === 200) {  
               return window.location.replace(`${URLF}courses/`);}
            else {return alert('something wrong')}
            
            
            
        }
        };
    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
        
    };
   
    render() {
        return (
            <div className="container">
            <div className="jumbotron jumbotron-fluid custome-jumbo">
                <div className="container">
                <form
    
                    onSubmit={e => this.handleRegister(e)}
                    onChange={e => this.handleChange(e)}
                >
                    <div className="form-group">
                    <h1 style={{ textAlign: "center" }}>Create Course</h1>
                    </div>
                    <div className="form-group">
                    <label for="exampleFormControlInput1">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Enter your course title"
                        autoFocus
                        required={true}
                    /></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Body</label>
                    <textarea
                        type="text"
                        name="body"
                        className="form-control"
                        placeholder="Enter body"
                        rows="5"
                        autoFocus
                        required={true}
                    ></textarea></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Image URL</label>
                    <input
                        type="text"
                        name="image_url"
                        className="form-control"
                        placeholder="add image_url if you have"
                        autoFocus
                        required={true}
                    /></div>

                    <button
                    type="submit"
                    className="btn btn-primary"
                    >
                    Create Course
                    </button>
                </form>
                </div>
            </div>
            </div>
            
            
        );
    }
}

class DelCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {...props,
            isSignin: false,
            title: this.state.title,
            body: this.state.body,
            image_url: this.state.image_url,
        };
      }
    componentDidMount(){
        this.getprofile()
    }

    getprofile = async() => {
        const token = this.state.user.token
        const id = this.state.id
        const resp = await fetch(`${URLB}courses/delete/${id}`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
                })
            });
        const data = await resp.json()
        if (data.status = 200){
            return window.location.replace(`${URLF}courses`)}
        else {return alert('something wrong')}
        }
    render (){ return []}
    }


class EditCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded : false, 
            isCourseInfo: true, 
           };
      }
    componentDidMount(){
        this.getstudio()
    }
    getstudio = async() => {
        const token = this.state.user.token
        const id = this.state.id
        const resp = await fetch(`${URLB}courses/single/${id}`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
                })
            });
        const data = await resp.json()
        if (data.status = 200){
            if (data.course === null){
                this.setState({isCourseInfo: false})}
                else{this.setState({ course: data.course,
                    isLoaded: true,
                });}
        }
    }

    handleRegister = async e => {
        const id = this.state.id
        e.preventDefault();
        const i = this.state.course
        if (this.state.user.isSignin !== true) {
            alert("Please login");
            return window.location.replace(`${URLF}login/`)
        }
        else {
            const newcourse = {
            title: this.state.title || i.title,
            body: this.state.body || i.body,
            image_url: this.state.image_url || i.image_url,
            };
            const token = this.props.user.token
            const response = await fetch(`${URLB}courses/edit/${id}`, {
            method: "POST",
            body: JSON.stringify(newcourse),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            })
            });
            const data = await response.json()
            if (data.status === 200) {  
               return window.location.replace(`${URLF}course/single/${id}`);}
            else {return alert('something wrong')}
        }
        };
    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
        
    };

    render() {
        const e = this.state.course
        return (
            <div className="container">
            <div className="jumbotron jumbotron-fluid custome-jumbo">
                <div className="container">
                <form
                    
                    onSubmit={e => this.handleRegister(e)}
                    onChange={e => this.handleChange(e)}
                >
                    <div className="form-group">
                    <h1 style={{ textAlign: "center" }}>Edit your Course</h1>
                    </div>
                    {this.state.isCourseInfo ? <> {this.state.isLoaded ? <>
                    
                    <div className="form-group">
                    <label for="exampleFormControlInput1">Course Title</label>
                    <p>Course Title: {e.title}</p>
                    <input
                        type="text"
                        name="title"
                        defaultValue = {e.title}
                        className="form-control"
                        autoFocus
                        required={true}
                    /></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Body</label>
                    <p>Body: {e.body}</p>
                    <textarea
                        type="text"
                        name="body"
                        className="form-control"
                        defaultValue = {e.body}
                        rows="5"
                        autoFocus
                        required={true}
                    ></textarea></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Image URL</label><br/>
                    <img src={`${e.image_url}`} style={{width: '20vw', height: '15vh'}}/><br/>
                    <input
                        type="text"
                        name="image_url"
                        className="form-control"
                        defaultValue = {e.image_url}
                        autoFocus
                        required={true}
                    /></div>

                    <p> Created At: <Moment date={e.created} /> </p><br/>

                    <button
                    type="submit"
                    className="btn btn-primary"
                    >
                    Submit to Edit
                    </button>
                    </>:<div>Loading...</div>}</>:<></>}
                </form>
                </div>
            </div>
            </div>
            
            
        );
    }
}
export default CourseAdd
export {EditCourse,DelCourse}