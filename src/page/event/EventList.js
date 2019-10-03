import React, {Component} from "react";
import Moment from 'react-moment';
import 'moment-timezone';
import "react-datepicker/dist/react-datepicker.css";

const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL
class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded : false, isEventInfo: true};
      }
    componentDidMount(){
        this.getevents()
    }

    getevents = async() => {
        const token = this.props.user.token
        const resp = await fetch(`${URLB}events/list`, {
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
            else{this.setState({ events: data.event,
                isLoaded: true,
            });}
        }
    }
    render(){
        return [
            <div className="FullContent">
                <h3>Event List</h3>
                {this.state.isEventInfo ? <>
                </>:<>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}events/add`)}>Create Event</button>
                </>}
                
                {this.state.isEventInfo ? <> {this.state.isLoaded ? <> {this.state.events && 
                this.state.events.map( e=>{ 
                return (
                <div>
                {e.owner_id !== this.state.user.id ? <>
                </>:<>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}events/edit/${e.event_id}`)}>Edit Event</button>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}events/delete/${e.event_id}`)}>Delete Event</button>
                </>}
                
                <p onClick={()=>window.location.replace(`${URLF}events/single/${e.event_id}`)}>
                Event Title : {e.title}</p>
                <img src={`${e.image_url}`} style={{width: '80vw', height: '50vh'}}/>
                <p>Description: {e.description}</p>
                <p>Address: {e.address}</p>
                <p>Time Start : <Moment date={e.datetimestart}/></p>
                <p>Time End : <Moment date={e.datetimeend}/></p>
                <p>Views : {e.views}</p>
                <p>Created : <Moment date={e.created}/></p>
                <p>Updated : <Moment date={e.updated}/></p>
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
      }
    componentDidMount(){
        this.getprofile()
    }

    getprofile = async() => {
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
    render(){
        const e = this.state.event
        return [
            <div className="FullContent">
                <h3>Event</h3>
                {this.state.isEventInfo ? <>
                </>:<>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}events/add`)}>Create Event</button>
                </>}
                
                {this.state.isEventInfo ? <> {this.state.isLoaded ? <>
                {e.owner_id !== this.state.user.id ? <>
                </>:<>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}events/edit/${e.event_id}`)}>Edit Event</button>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}events/delete/${e.event_id}`)}>Delete Event</button>
                </>}
                
                <p>
                Event Title : {e.title}</p>
                <img src={`${e.image_url}`} style={{width: '80vw', height: '50vh'}}/>
                <p>Description: {e.description}</p>
                <p>Address: {e.address}</p>
                <p>Time Start : <Moment date={e.datetimestart}/></p>
                <p>Time End : <Moment date={e.datetimeend}/></p>
                <p>Views : {e.views}</p>
                <p>Created : <Moment date={e.created}/></p>
                <p>Updated : <Moment date={e.updated}/></p>

                

                </> : <div>Loading...</div>} </> : <></>}
            </div>
        ]
    }
}

export default EventList
export {SingleEvent}
