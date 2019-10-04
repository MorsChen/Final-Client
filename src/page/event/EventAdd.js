import React, {Component} from "react";
// import { Button } from "react-bootstrap";
import Moment from 'react-moment';
import 'moment-timezone';
 

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { es } from "date-fns/esm/locale";

const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL
class EventAdd extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            description: "",
            image_url: "",
            address: "",
            datetimestart: new Date(),
            datetimeend: new Date(),
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
            let newevent = {
            title: this.state.title,
            description: this.state.description,
            image_url: this.state.image_url,
            address: this.state.address,
            datetimestart: this.state.datetimestart,
            datetimeend: this.state.datetimeend,
            };
            const token = this.props.user.token
            const response = await fetch(`${URLB}events/add`, {
            method: "POST",
            body: JSON.stringify(newevent),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            })
            });
            const data = await response.json()
            if (data.status === 200) {  
               return window.location.replace(`${URLF}events/`);}
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
    handleDateStart = date => {
        this.setState({
            datetimestart: date
        });
    };
    handleDateEnd = date => {
        this.setState({
            datetimeend: date
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
                    <h1 style={{ textAlign: "center" }}>Create Event</h1>
                    </div>
                    <div className="form-group">
                    <label for="exampleFormControlInput1">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Enter new title"
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
                    <label for="exampleFormControlInput1">Image URL</label>
                    <input
                        type="text"
                        name="image_url"
                        className="form-control"
                        placeholder="add image_url if you have"
                        autoFocus
                        required={true}
                    /></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Address</label>
                    <input
                        type="text"
                        name="address"
                        className="form-control"
                        placeholder="Enter your address"
                        autoFocus
                        required={true}
                    /></div>
        
                    <div className="form-group">
                    <label for="exampleFormControlInput1">Time Start</label>
                    <DatePicker
                    selected={this.state.datetimestart}
                    onChange={this.handleDateStart}
                    required={true}
                    dateFormat="MM/dd/yyyy h:mm aa"
                    /></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Time End</label>
                    <DatePicker
                    selected={this.state.datetimeend}
                    onChange={this.handleDateEnd}
                    required={true}
                    dateFormat="MM/dd/yyyy h:mm aa"
                    /></div>

                    <button
                    type="submit"
                    className="btn btn-primary"
                    >
                    Create Event
                    </button>
                </form>
                </div>
            </div>
            </div>
            
            
        );
    }
}

class DelEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {...props,
            isSignin: false,
            title: this.state.title,
            description: this.state.description,
            image_url: this.state.image_url,
            address: this.state.address,
            datetimestart: new Date(),
            datetimeend: new Date(), 
        };
      }
    componentDidMount(){
        this.getprofile()
    }

    getprofile = async() => {
        const token = this.state.user.token
        const id = this.state.id
        const resp = await fetch(`${URLB}events/delete/${id}`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
                })
            });
        const data = await resp.json()
        if (data.status = 200){
            return window.location.replace(`${URLF}events`)}
        else {return alert('something wrong')}
        }
    render (){ return []}
    }


class EditEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded : false, 
            isEventInfo: true, 
            datetimestart: '',
            datetimeend: ''};
      }
    componentDidMount(){
        this.geteventtoedit()
    }
    geteventtoedit = async() => {
        const token = this.state.user.token
        const id = this.state.id
        const resp = await fetch(`${URLB}events/single/${id}`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
                })
            });
        const data = await resp.json()
        if (data.status = 200){
            if (data.event === null){
                this.setState({isEventInfo: false})}
                else{this.setState({ event: data.event,
                    isLoaded: true,
                });}
        }
    }

    handleRegister = async e => {
        const id = this.state.id
        e.preventDefault();
        const i = this.state.event
        if (this.state.user.isSignin !== true) {
            alert("Please login");
            return window.location.replace(`${URLF}login/`)
        }
        else {
            const newevent = {
            title: this.state.title || i.title,
            description: this.state.description || i.description,
            image_url: this.state.image_url || i.image_url,
            address: this.state.address || i.address,
            datetimestart: this.state.datetimestart || i.datetimestart,
            datetimeend: this.state.datetimeend || i.datetimeend,
            };
            const token = this.props.user.token
            const response = await fetch(`https://127.0.0.1:5000/events/edit/${id}`, {
            method: "POST",
            body: JSON.stringify(newevent),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            })
            });
            const data = await response.json()
            if (data.status === 200) {  
               return window.location.replace(`${URLF}events/single/${id}`);}
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

    updateInputValue(e) {
        const { target: {value} } = e;
        this.setState({ recipeName: value });
     }

    handleDateStart = date => {
        this.setState({
            datetimestart: date
        });
    };
    handleDateEnd = date => {
        this.setState({
            datetimeend: date
        });
    };

    render() {
        const e = this.state.event
        return (
            <div className="container">
            <div className="jumbotron jumbotron-fluid custome-jumbo">
                <div className="container">
                <form
                    
                    onSubmit={e => this.handleRegister(e)}
                    onChange={e => this.handleChange(e)}
                >
                    <div className="form-group">
                    <h1 style={{ textAlign: "center" }}>Edit Event</h1>
                    </div>
                    {this.state.isEventInfo ? <> {this.state.isLoaded ? <>
                    
                    <div className="form-group">
                    <label for="exampleFormControlInput1">Title</label>
                    <p>Title: {e.title}</p>
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
                    <p>Description: {e.description}</p>
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

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Address</label>
                    <p>Address: {e.address}</p>
                    <input
                        type="text"
                        name="address"
                        className="form-control"
                        defaultValue = {e.address}
                        autoFocus
                        required={true}
                    /></div>
        
                    <div className="form-group">
                    <label for="exampleFormControlInput1">Time Start</label>
                    <p>Date-Start: <Moment date={e.datetimestart} /></p>
                    <DatePicker
                    selected={this.state.datetimestart}
                    onChange={this.handleDateStart}
                    // required={true}
                    
                    dateFormat="MM/dd/yyyy h:mm aa"
                    /></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Time End</label>
                    <p>Date-End: <Moment date={e.datetimeend} /></p>
                    <DatePicker
                    selected={this.state.datetimeend}
                    onChange={this.handleDateEnd}
                    // required={true}
                    dateFormat="MM/dd/yyyy h:mm aa"
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
export default EventAdd
export {EditEvent,DelEvent}