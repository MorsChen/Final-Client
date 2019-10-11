import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from "react-bootstrap";

const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL
class Studios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded: false, isStudioInfo: true};
        console.log("check props Events", this.state)
        console.log("check props user isSignin", this.state.user.isSignin)
      }

      componentDidMount(){
        this.getStudios()
    }

    getStudios = async() => {
        const resp = await fetch(`${URLB}studios/`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                })
            });
        const data = await resp.json()
        if (data.status = 200){
            if (data.studio === null){
                this.setState({isStudioInfo: false})}
            else{this.setState({ studios: data.studio,
                isLoaded: true,
            });
        }
        }
    }

    render(){
        return [
            <div className="FullContent">
                <div className="in-fullcont">
                <h3>Studios List</h3>
                {this.state.isStudioInfo ? <> {this.state.isLoaded ? <> {this.state.studios && 
                this.state.studios.map( e=>{ 
                return (
                <div className='event-contain'>
                {e.owner_id !== this.state.user.id ? <>
                </>:<>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}studios/edit/${e.studio_id}`)}>Edit Studio</button>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}studios/delete/${e.studio_id}`)}>Delete Studio</button>
                </>}
                
                <p onClick={()=>window.location.replace(`${URLF}studios/single/${e.studio_id}`)}>
                Studio's name : {e.name}</p>
                <img src={`${e.image_url}`} style={{width: '80vw', height: '50vh'}}/>
                <p>Description: {e.description}</p>
                <p>Address: {e.address}</p>
                <p>Open_At : {e.opentime}</p>
                <p>Closed_At : {e.closetime}</p>
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

export default Studios