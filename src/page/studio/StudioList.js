import React, {Component} from "react";
import Moment from 'react-moment';
import 'moment-timezone';
import "react-datepicker/dist/react-datepicker.css";

const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL
class StudioList extends Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded : false, isStudioInfo: true};
      }
    componentDidMount(){
        this.getstudios()
    }

    getstudios = async() => {
        const token = this.props.user.token
        const resp = await fetch(`${URLB}studios/list`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
                })
            });
        const data = await resp.json()
        if (data.status = 200){
            if (data.studio === null){
                this.setState({isStudioInfo: false})}
            else{this.setState({ studios: data.studio,
                isLoaded: true,
            });}
        }
    }
    render(){
        return [
            <div className="FullContent">
                <h3>Studios List</h3>
                {this.state.isStudioInfo ? <>
                </>:<>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}studios/add`)}>Create Studio</button>
                </>}
                
                {this.state.isStudioInfo ? <> {this.state.isLoaded ? <> {this.state.studios && 
                this.state.studios.map( e=>{ 
                return (
                <div className='event-contain'>
                {e.owner_id !== this.state.user.id ? <>
                </>:<>
                <div className="div-button" style={{justifyContent: "space-between"}}>
                    <div>
                    <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}studios/edit/${e.studio_id}`)}>Edit your Studio</button>
                    <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}studios/delete/${e.studio_id}`)}>Delete Studio</button>
                    </div>
                    <div>
                    <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}courses/add`)}>Create New Course</button>
                    <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}courses/list`)}>Show Studio's Courses</button>
                    </div>
                </div>
                </>}
                
                <p onClick={()=>window.location.replace(`${URLF}studios/single/${e.studio_id}`)}>
                Studio's name : {e.name}</p>
                <img src={`${e.image_url}`} style={{width: '80vw', height: '50vh'}}/>
                <p>Description: {e.description}</p>
                <p>Address: {e.address}</p>
                <p>Open_At : {e.opentime}</p>
                <p>Closed_At : {e.closetime}</p>
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


class SingleStudio extends Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded : false, isStudioInfo: true};
      }
    componentDidMount(){
        this.getprofile()
    }

    getprofile = async() => {
        const token = this.state.user.token
        const id = this.state.id
        const resp = await fetch(`${URLB}studios/single/${id}`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
                })
            });
        const data = await resp.json()
        if (data.status = 200){
            if (data.studio === null){
                this.setState({isStudioInfo: false})}
                else{this.setState({ studio: data.studio,
                    isLoaded: true,
                });}
        }
    }
    render(){
        const e = this.state.studio
        return [
            <div className="FullContent">
                <h3>Studio</h3>
                {this.state.isStudioInfo ? <>
                </>:<>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}studios/add`)}>Create Studio</button>
                </>}
                
                {this.state.isStudioInfo ? <> {this.state.isLoaded ? <>
                {e.owner_id !== this.state.user.id ? <>
                </>:<>
                <div className="div-button" style={{justifyContent: "space-between"}}>
                    <div>
                    <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}studios/edit/${e.studio_id}`)}>Edit your Studio</button>
                    <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}studios/delete/${e.studio_id}`)}>Delete Studio</button>
                    </div>
                    <div>
                    <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}courses/add`)}>Create New Course</button>
                    <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}courses/list`)}>Show Studio's Courses</button>
                    </div>
                </div>
                </>}
                
                <p>
                Studio's Name : {e.name}</p>
                <img src={`${e.image_url}`} style={{width: '80vw', height: '50vh'}}/>
                <p>Description: {e.description}</p>
                <p>Address: {e.address}</p>
                <p>Open_At : {e.opentime}</p>
                <p>Closed_At : {e.closetime}</p>
                <p>Views : {e.views}</p>
                <p>Created : <Moment date={e.created}/></p>
                <p>Updated : <Moment date={e.updated}/></p>

                

                </> : <div>Loading...</div>} </> : <></>}
            </div>
        ]
    }
}

export default StudioList
export {SingleStudio}
