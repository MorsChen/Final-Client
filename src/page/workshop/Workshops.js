import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from "react-bootstrap";

const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL
class Workshops extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded: false, isWorkshopInfo: true};
        console.log("check props Events", this.state)
        console.log("check props user isSignin", this.state.user.isSignin)
      }

      componentDidMount(){
        this.getStudios()
    }

    getStudios = async() => {
        const resp = await fetch(`${URLB}workshops/`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                })
            });
        const data = await resp.json()
        if (data.status = 200){
            if (data.workshop === null){
                this.setState({isWorkshopInfo: false})}
            else{this.setState({ workshops: data.workshop,
                isLoaded: true,
            });
        }
        }
    }

    render(){
        console.log('check workshop list', this.state.workshops)
        return [
            <div>
                {this.state.isWorkshopInfo ? <> {this.state.isLoaded ? <> {this.state.workshops && 
                this.state.workshops.map( e=>{ 
                return (
                <div className="FullContent">
                    <div className="info-bg" style={{backgroundImage: `url(${e.image_url})`, backgroundPosition:'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                        <div className='home-content'>
                            <h1 className="home-title">{e.studio}</h1>
                            <div clasName="des-containner">
                                <h5 className="course-description">{e.title}
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="workshop-container2">
                    <div className="des-workshop-content">
                    <h7>{e.description}</h7><br/>
                    </div></div>

                    <div className="workshop-container3">
                        <div className="workshop-content">
                            <h5 className="ws-title">WHO CAN LEARN ?</h5>
                            <div className="workshop-body">
                            <h7>{e.people}</h7><br/>
                            </div>
                        </div>
                    
                        <div className="workshop-content">
                        <h5 className="ws-title">DETAIL</h5>
                            <div className="workshop-body">
                            <h7>{e.detail}</h7><br/>
                            </div>
                        </div>

                        <div className="workshop-content">
                        <h5 className="ws-title">REQUIREMENT</h5>
                            <div className="workshop-body">
                            <h7>{e.requirement}</h7><br/>
                            </div>
                        </div>

                    </div>

                    { this.state.user.id !== 1 ? <>
                        </>:<>
                        <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}workshops/edit/${e.workshop_id}`)}>Edit Workshop</button>
                        <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}workshops/delete/${e.workshop_id}`)}>Delete Workshop</button>
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

export default Workshops