import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from "react-bootstrap";

const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL
class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded: false, isEventInfo: true};
        console.log("check props Events", this.state)
        console.log("check props user isSignin", this.state.user.isSignin)
      }

      componentDidMount(){
        this.getevents()
    }

    getevents = async() => {
        const resp = await fetch(`${URLB}events/`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                })
            });
        const data = await resp.json()
        if (data.status = 200){
            if (data.event === null){
                this.setState({isEventInfo: false})}
            else{this.setState({ events: data.event,
                isLoaded: true,
            });
        }
        }
    }

    render(){
        return [
            <div className="FullContent">
                <div className="in-fullcont">
                <h3>Event List</h3>
                
                {this.state.isEventInfo ? <> {this.state.isLoaded ? <> {this.state.events && 
                this.state.events.map( e=>{ 
                return (
                <div className='event-contain'>
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
            </div>
        ]
    }

}

export default Events