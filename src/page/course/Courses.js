import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from "react-bootstrap";

const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL
class Courses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded: false, isCourseInfo: true};
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
                workshops: data.workshop,
                isLoaded: true,
            });
        }
        }
    }

    render(){
        return [
            <div>
                {this.state.isCourseInfo ? <> {this.state.isLoaded ? <> {this.state.courses && 
                this.state.courses.map( e=>{ 
                return (
                <div className="FullContent">
                    <div className="info-bg" style={{backgroundImage: `url(${e.image_url})`, backgroundPosition:'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                        <div className='home-content'>
                            <h1 className="home-title">{e.studio}</h1>
                            <div clasName="des-containner">
                                <h5 className="course-description">{e.title}</h5>
                            </div>
                        </div>
                    </div>

                    <div className="container2">
                        <div className="course-content">
                        <h5 className="course-title-des">{e.title}</h5><br/>
                            <div className="course-body">
                            <h7>{e.description}</h7><br/>
                            <h7>{e.body}</h7><br/>
                            <h7>{e.detail}</h7><br/>
                            </div>
                        </div>
                    </div>

                    <div className="container-map">
                        {this.state.workshops && this.state.workshops.map(w=>{
                            return (
                                <div>
                                    <div className="cs-ws-bg" style={{backgroundImage: `url(${w.image_url})`}}>
                                    <div className="fill-color">
                                    <h5 className="cs-ws-title" onClick={()=>window.location.replace(`${URLF}workshops/single/${w.workshop_id}`)}
                                    >
                                    {w.title}</h5>
                                    </div>
                                </div><br/>
                                </div>
                                
                            )
                        })}
                    </div>

                    { this.state.user.id !== 1 ? <>
                        </>:<>
                        <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}courses/edit/${e.course_id}`)}>Edit Course</button>
                        <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}courses/delete/${e.scourse_id}`)}>Delete Course</button>
                        </>}
                    <div className='info-footer'></div>
                </div>
                
                )
                })}
                </> : <div>Loading...</div>} </> : <></>}
            </div>

            // <div className="FullContent">
            //     <h3>Courses List</h3>
                
            //     {this.state.isCourseInfo ? <> {this.state.isLoaded ? <> {this.state.courses && 
            //     this.state.courses.map( e=>{ 
            //     return (
            //     <div className='event-contain'>
            //     {e.owner_id !== this.state.user.id ? <>
            //     </>:<>
            //     <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}courses/edit/${e.course_id}`)}>Edit Course</button>
            //     <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}courses/delete/${e.scourse_id}`)}>Delete Course</button>
            //     </>}
                
            //     <p onClick={()=>window.location.replace(`${URLF}studios/single/${e.studio_id}`)}>
            //     Studio's name : {e.name}</p>
            //     <p onClick={()=>window.location.replace(`${URLF}courses/single/${e.course_id}`)}>
            //     Course's Title : {e.title}</p>
            //     <img src={`${e.image_url}`} style={{width: '80vw', height: '50vh'}}/>
            //     <p>body: {e.body}</p>
            //     <p>Views : {e.views}</p>
            //     <p>Created : {e.created}</p>
            //     <p>Updated : {e.updated}</p>
            //     </div>
            //     )
            //     })}
            //     </> : <div>Loading...</div>} </> : <></>}
            // </div>
        ]
    }

}

export default Courses