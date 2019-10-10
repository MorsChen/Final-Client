import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from "react-bootstrap";

const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL
class Courses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded: false, isCourseInfo: true};
        console.log("check props Events", this.state)
        console.log("check props user isSignin", this.state.user.isSignin)
      }

      componentDidMount(){
        this.getStudios()
    }

    getStudios = async() => {
        const resp = await fetch(`${URLB}courses/`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                })
            });
        const data = await resp.json()
        if (data.status = 200){
            if (data.course === null){
                this.setState({isCourseInfo: false})}
            else{this.setState({ courses: data.course,
                isLoaded: true,
            });
        }
        }
    }

    render(){
        return [
            <div className="FullContent">
                <h3>Courses List</h3>
                
                {this.state.isCourseInfo ? <> {this.state.isLoaded ? <> {this.state.courses && 
                this.state.courses.map( e=>{ 
                return (
                <div className='event-contain'>
                {e.owner_id !== this.state.user.id ? <>
                </>:<>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}courses/edit/${e.course_id}`)}>Edit Course</button>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}courses/delete/${e.scourse_id}`)}>Delete Course</button>
                </>}
                
                <p onClick={()=>window.location.replace(`${URLF}studios/single/${e.studio_id}`)}>
                Studio's name : {e.name}</p>
                <p onClick={()=>window.location.replace(`${URLF}courses/single/${e.course_id}`)}>
                Course's Title : {e.title}</p>
                <img src={`${e.image_url}`} style={{width: '80vw', height: '50vh'}}/>
                <p>body: {e.body}</p>
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

export default Courses