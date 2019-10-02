import React, {Component} from "react";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Route} from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import EventAdd from "./EventAdd";

class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded : false, isEventInfo: true};
        console.log("check props Profile", this.state)
      }
    componentDidMount(){
        this.getevents()
    }

    getevents = async() => {
        const token = this.props.user.token
        const resp = await fetch(`https://127.0.0.1:5000/events/`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
                })
            });
        const data = await resp.json()
        console.log ("check data from login", data)
        if (data.status = 200){
            if (data.event === null){
                this.setState({isEventInfo: false})}
            else{this.setState({ eventinfo: {
                id: data.event.event_id,
                title: data.event.title,
                description: data.event.description,
                image_url: data.event.image_url,
                address: data.event.address,
                datetimestart: data.event.datetimestart,
                datetimeend: data.event.datetimeend,
                created: data.event.created,
                updated: data.event.updated,
                views: data.event.views

            }, 
                isLoaded: true,
            });}
        }
    }
    render(){
        console.log("check isEventInfo", this.state.isEventInfo)
        return [
            <div className = 'Events'>
                 <Router>
                    <div>
                        <Route path="/event/list" component={ (props) => <EventList {...props} user = {this.state.user} />} />
                        <Route path="/events/add" component={ (props) => <EventAdd {...props} user = {this.state.user} />} />
                        <Route path="/event/single/<id>" component={ (props) => <SingleEvent {...props} user = {this.state.user} />} />
                    </div>
                </Router>
            </div>
        ]
    }
}

class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded : false, isEventInfo: true};
        console.log("check props Profile", this.state)
      }
    componentDidMount(){
        this.getevents()
    }

    getevents = async() => {
        const token = this.props.user.token
        const resp = await fetch(`https://127.0.0.1:5000/events/list`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
                })
            });
        const data = await resp.json()
        console.log ("check data from backend", data)
        if (data.status = 200){
            if (data.event === null){
                this.setState({isEventInfo: false})}
            else{this.setState({ eventinfo: {
                id: data.event.event_id,
                title: data.event.title,
                description: data.event.description,
                image_url: data.event.image_url,
                address: data.event.address,
                datetimestart: data.event.datetimestart,
                datetimeend: data.event.datetimeend,
                created: data.event.created,
                updated: data.event.updated,
                views: data.event.views

            }, 
                isLoaded: true,
            });}
        }
    }
    render(){
        console.log("check isEventInfo", this.state.isEventInfo)
        console.log("check state list event ", this.state)
        return [
            <div className="FullContent">
                <h3>Event List</h3>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`http://localhost:3000/events/add`)}>Add Event</button>
                {this.state.isEventInfo ? <><button className="btn btn-primary" onClick={()=> window.location.replace(`http://localhost:3000/event/edit`)}>Edit Event</button></> : 
                <><button className="btn btn-primary" onClick={()=> window.location.replace(`http://localhost:3000/event/add`)}>Create Event</button>
                </>}
                
                {this.state.isEventInfo ? <> {this.state.isLoaded ? <> 
                <p onClick={()=>window.location.replace(`http://localhost:3000/event/single/${this.state.eventinfo.id}`)}>
                    Event Title : {this.state.eventinfo.title}</p>
                <img src={`${this.state.eventinfo.image_url}`} style={{width: '100vw', height: '50vh'}}/>
                <p>Description: {this.state.eventinfo.description}</p>
                <p>Address: {this.state.eventinfo.address}</p>
                <p>Time Start : {this.state.eventinfo.datetimestart}</p>
                <p>Time End : {this.state.eventinfo.datetimeend}</p>
                <p>Views : {this.state.eventinfo.views}</p>
                <p>Created : {this.state.eventinfo.created}</p>
                <p>Updated : {this.state.eventinfo.updated}</p>
                 </> : <div>Loading...</div>} </> : <></>}
                

            </div>
        ]
    }
}


class SingleEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded : false, isEventInfo: true};
        console.log("check event id", this.state)
      }
    componentDidMount(){
        this.getprofile()
    }

    getprofile = async() => {
        const token = this.state.user.token
        const resp = await fetch(`https://127.0.0.1:5000/events/list`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
                })
            });
        const data = await resp.json()
        console.log ("check data from login", data)
        if (data.status = 200){
            if (data.event === null){
                this.setState({isEventInfo: false})}
            else{this.setState({ eventinfo: {
                title: data.event.title,
                description: data.event.description,
                image_url: data.event.image_url,
                address: data.event.address,
                datetimestart: data.event.datetimestart,
                datetimeend: data.event.datetimeend,
                created: data.event.created,
                updated: data.event.updated,
                views: data.event.views

            }, 
                isLoaded: true,
            });}
        }
    }
    render(){
        console.log("check isEventInfo", this.state.isEventInfo)
        return [
            <div className="FullContent">
                <h3>Event List</h3>
                {this.state.isEventInfo ? <><button className="btn btn-primary" onClick={()=> window.location.replace(`http://localhost:3000/event/edit`)}>Edit Event</button></> : 
                <><button className="btn btn-primary" onClick={()=> window.location.replace(`http://localhost:3000/event/add`)}>Create Event</button>
                </>}
                
                {this.state.isEventInfo ? <> {this.state.isLoaded ? <> <p>Event Title : {this.state.eventinfo.title}</p>
                <img src={`${this.state.eventinfo.image_url}`} style={{width: '100vw', height: '50vh'}}/>
                <p>Description: {this.state.eventinfo.description}</p>
                <p>Address: {this.state.eventinfo.address}</p>
                <p>Time Start : {this.state.eventinfo.datetimestart}</p>
                <p>Time End : {this.state.eventinfo.datetimeend}</p>
                <p>Views : {this.state.eventinfo.views}</p>
                <p>Created : {this.state.eventinfo.created}</p>
                <p>Updated : {this.state.eventinfo.updated}</p>
                 </> : <div>Loading...</div>} </> : <></>}
                

            </div>
        ]
    }
}

export default Events
export {SingleEvent}
