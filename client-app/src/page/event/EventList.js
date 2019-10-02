import React, {Component} from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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
            else{this.setState({ events: data.event,
                isLoaded: true,
            });}
        }
    }
    render(){
        console.log("check isEventInfo", this.state.events)
        console.log("check state list event ", this.state)
        return [
            <div className="FullContent">
                <h3>Event List</h3>
                {this.state.isEventInfo ? <>
                </>:<>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`http://localhost:3000/events/add`)}>Create Event</button>
                </>}
                
                {this.state.isEventInfo ? <> {this.state.isLoaded ? <> {this.state.events && 
                this.state.events.map( e=>{ 
                return (
                <div>
                {e.owner_id !== this.state.user.id ? <>
                </>:<>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`http://localhost:3000/events/${e.id}/edit`)}>Edit Event</button>
                </>}
                
                <p onClick={()=>window.location.replace(`http://localhost:3000/events/single/${e.event_id}`)}>
                Event Title : {e.title}</p>
                <img src={`${e.image_url}`} style={{width: '80vw', height: '50vh'}}/>
                <p>Description: {e.description}</p>
                <p>Address: {e.address}</p>
                <p>Time Start : {e.datetimestart}</p>
                <p>Time End : {e.datetimeend}</p>
                <p>Views : {e.views}</p>
                <p>Created : {e.created}</p>
                <p>Updated : {e.updated}</p>
                </div>
                )
                })}
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
        console.log("check events", this.props.id)
        const id = this.props.id
        const resp = await fetch(`https://127.0.0.1:5000/events/single/${id}`, {
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
                else{this.setState({ event: data.event,
                    isLoaded: true,
                });}
        }
    }
    render(){
        console.log("check isEventInfo", this.state.event)
        const e = this.state.event
        return [
            <div className="FullContent">
                <h3>Event</h3>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`http://localhost:3000/events/add`)}>Add Event</button>
                {this.state.isEventInfo ? <>
                </>:<>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`http://localhost:3000/events/add`)}>Create Event</button>
                </>}
                
                {this.state.isEventInfo ? <> {this.state.isLoaded ? <>
                {e.owner_id !== this.state.user.id ? <>
                </>:<>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`http://localhost:3000/events/${e.id}/edit`)}>Edit Event</button>
                </>}
                
                <p>
                Event Title : {e.title}</p>
                <img src={`${e.image_url}`} style={{width: '80vw', height: '50vh'}}/>
                <p>Description: {e.description}</p>
                <p>Address: {e.address}</p>
                <p>Time Start : {e.datetimestart}</p>
                <p>Time End : {e.datetimeend}</p>
                <p>Views : {e.views}</p>
                <p>Created : {e.created}</p>
                <p>Updated : {e.updated}</p>
                </> : <div>Loading...</div>} </> : <></>}
            </div>
        ]
    }
}

export default EventList
export {SingleEvent}
