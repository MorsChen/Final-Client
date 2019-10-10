import React, {Component} from "react";
// import { Button } from "react-bootstrap";
import Moment from 'react-moment';
import 'moment-timezone';


const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL
class WorkshopAdd extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            description: "",
            people: "",
            detail: "",
            requirement: "",
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
            let newworkshop = {
            title: this.state.title,
            description: this.state.description,
            people: this.state.people,
            detail: this.state.detail,
            requirement: this.state.requirement,
            image_url: this.state.image_url,
            };
            const token = this.props.user.token
            const response = await fetch(`${URLB}workshops/add`, {
            method: "POST",
            body: JSON.stringify(newworkshop),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            })
            });
            const data = await response.json()
            if (data.status === 200) {  
               return window.location.replace(`${URLF}courses/`);}
            else {return alert("Create new workshop was not success")}
            
            
            
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
                    <h1 style={{ textAlign: "center" }}>Create Workshop</h1>
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
                    <label for="exampleFormControlInput1">Description</label>
                    <textarea
                        type="text"
                        name="description"
                        className="form-control"
                        placeholder="Enter Description"
                        rows="5"
                        autoFocus
                        required={true}
                    ></textarea></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Who can learn ?</label>
                    <textarea
                        type="text"
                        name="people"
                        className="form-control"
                        placeholder="Please enter info"
                        rows="5"
                        autoFocus
                        required={true}
                    ></textarea></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Detail</label>
                    <textarea
                        type="text"
                        name="detail"
                        className="form-control"
                        placeholder="Enter detail"
                        rows="5"
                        autoFocus
                        required={true}
                    ></textarea></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Requirement</label>
                    <textarea
                        type="text"
                        name="requirement"
                        className="form-control"
                        placeholder="Enter Requirement"
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
                    Create Workshop
                    </button>
                </form>
                </div>
            </div>
            </div>
            
            
        );
    }
}

class DelWorkshop extends Component {
    constructor(props) {
        super(props);
        this.state = {...props,
            isSignin: false,
            title: this.state.title,
            description: this.state.description,
            people: this.state.people,
            detail: this.state.detail,
            requirement: this.state.requirement,
            image_url: this.state.image_url,
        };
      }
    componentDidMount(){
        this.getprofile()
    }

    getprofile = async() => {
        const token = this.state.user.token
        const id = this.state.id
        const resp = await fetch(`${URLB}workshops/delete/${id}`, {
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


class EditWorkshop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded : false, 
            isWorkshopInfo: true, 
           };
      }
    componentDidMount(){
        this.getstudio()
    }
    getstudio = async() => {
        const token = this.state.user.token
        const id = this.state.id
        const resp = await fetch(`${URLB}workshops/single/${id}`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
                })
            });
        const data = await resp.json()
        if (data.status = 200){
            if (data.workshop === null){
                this.setState({isWorkshopInfo: false})}
                else{this.setState({ workshop: data.workshop,
                    isLoaded: true,
                });}
        }
    }

    handleRegister = async e => {
        const id = this.state.id
        e.preventDefault();
        const i = this.state.workshop
        if (this.state.user.isSignin !== true) {
            alert("Please login");
            return window.location.replace(`${URLF}login/`)
        }
        else {
            const newworkshop = {
            title: this.state.title || i.title,
            description: this.state.description || i.description,
            people: this.state.people || i.people,
            detail: this.state.detail || i.detail,
            requirement: this.state.requirement || i.requirement,
            image_url: this.state.image_url || i.image_url,
            };
            const token = this.props.user.token
            const response = await fetch(`${URLB}workshops/edit/${id}`, {
            method: "POST",
            body: JSON.stringify(newworkshop),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            })
            });
            const data = await response.json()
            if (data.status === 200) {  
               return window.location.replace(`${URLF}courses`);}
            else {return alert("The workshop didn't change")}
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
        const e = this.state.workshop
        return (
            <div className="container">
            <div className="jumbotron jumbotron-fluid custome-jumbo">
                <div className="container">
                <form
                    
                    onSubmit={e => this.handleRegister(e)}
                    onChange={e => this.handleChange(e)}
                >
                    <div className="form-group">
                    <h1 style={{ textAlign: "center" }}>Edit your Workshop</h1>
                    </div>
                    {this.state.isWorkshopInfo ? <> {this.state.isLoaded ? <>
                    
                    <div className="form-group">
                    <label for="exampleFormControlInput1">Workshop Title</label>
                    <p>{e.title}</p>
                    <input
                        type="text"
                        name="title"
                        defaultValue = {e.title}
                        className="form-control"
                        autoFocus
                        required={true}
                    /></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Description</label>
                    <p>{e.description}</p>
                    <textarea
                        type="text"
                        name="description"
                        className="form-control"
                        defaultValue = {e.description}
                        rows="5"
                        autoFocus
                        required={true}
                    ></textarea></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Who can learn ?</label>
                    <p>{e.people}</p>
                    <textarea
                        type="text"
                        name="people"
                        className="form-control"
                        defaultValue = {e.people}
                        rows="5"
                        autoFocus
                        required={true}
                    ></textarea></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Detail</label>
                    <p>{e.detail}</p>
                    <textarea
                        type="text"
                        name="detail"
                        className="form-control"
                        defaultValue = {e.detail}
                        rows="5"
                        autoFocus
                        required={true}
                    ></textarea></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Requirement</label>
                    <p>{e.requirement}</p>
                    <textarea
                        type="text"
                        name="requirement"
                        className="form-control"
                        defaultValue = {e.requirement}
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
export default WorkshopAdd
export {EditWorkshop,DelWorkshop}