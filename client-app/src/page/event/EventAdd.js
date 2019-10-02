import React, {Component} from "react";
import { Button } from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class EventAdd extends React.Component {
    constructor() {
        super();
        this.state = {
            isSignin: false,
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
        if (this.state.password !== this.state.repassword) {
            alert("Password and Password confirm must match");
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
            console.log("check new event", newevent)
            const token = this.props.user.token
            console.log("check token event add", token)
            const response = await fetch(`https://127.0.0.1:5000/events/add`, {
            method: "POST",
            body: JSON.stringify(newevent),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            })
            });
            const data = await response.json()
            console.log("check resp from login",data)
            if (data.status === 200) {  
               return window.location.replace(`http://localhost:3000/profile/`);}
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
        console.log("check username",this.props.user.name);
        console.log(this.state.datetimestart.toISOString().slice(0, 10))
        console.log(this.state.datetimeend.toISOString().slice(0, 10))
        console.log(new Date().toISOString().slice(0, 10))
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

class EditEvent extends React.Component {
    render(){
        return [
            <div className="FullContent"> Edit Event</div>
        ]
    }
}
export default EventAdd
export {EditEvent}