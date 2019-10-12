import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from "react-bootstrap";

import Moment from 'react-moment';
import 'moment-timezone';

const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL
class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded: false, isEventInfo: true};
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
                {this.state.isEventInfo ? <> {this.state.isLoaded ? <> {this.state.events && 
                this.state.events.map( e=>{ 
                return (
                <div className='event-contain' >
                {e.owner_id !== this.state.user.id ? <>
                </>:<>
                <div className="div-button" style={{justifyContent: "space-between"}}>
                <div>
                    <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}events/edit/${e.event_id}`)}>Edit your Event</button>
                    <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}events/delete/${e.event_id}`)}>Delete Event</button>
                </div>
               </div>
                </>}
                <div style={{backgroundImage: `url(${e.image_url})`, backgroundPosition:'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover',width: '100%', height: '50vh', marginBottom: "20px", display:'flex', flexDirection:'column',justifyContent: 'center'}}>
                    <h1 className="home-title" onClick={()=>window.location.replace(`${URLF}events/single/${e.event_id}`)}>
                    {e.title}</h1>
                </div>
                <div clasName="des-containner">
                        <h5 className="home-description">{e.description}
                        </h5>
                    </div>
                {/* <img src={`${e.image_url}`} style={{width: '100%', height: '50vh'}}/> */}
                <p className="p-studio">Address: {e.address}</p>
                <p className="p-studio">Time Start : <Moment format="MM-DD-YYYY HH:MM">{e.datetimestart}</Moment> ( <Moment fromNow>{e.datetimestart}</Moment> )</p>
                <p className="p-studio">Time End :  <Moment format="MM-DD-YYYY HH:MM">{e.datetimeend}</Moment> ( <Moment fromNow>{e.datetimeend}</Moment> )</p>
                {/* <p>Views : {e.views}</p>
                <p>Created : {e.created}</p>
                <p>Updated : {e.updated}</p> */}
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