import React, {Component} from "react";
import Moment from 'react-moment';
import 'moment-timezone';

const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL
class WorkshopList extends Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded : false, isWorkshopInfo: true};
      }
    componentDidMount(){
        this.getstudios()
    }

    getstudios = async() => {
        const token = this.props.user.token
        const resp = await fetch(`${URLB}workshops/list`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
                })
            });
        const data = await resp.json()
        if (data.status = 200){
            if (data.course === null){
                this.setState({isWorkshopInfo: false})}
            else{this.setState({ workshops: data.workshop,
                isLoaded: true,
            });}
        }
    }
    render(){
        return [
            <div>
                {this.state.isWorkshopInfo ? <> {this.state.isLoaded ? <> {this.state.workshop && 
                this.state.workshop.map( e=>{ 
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
                    <div className="workshop-container3">
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
        ]
    }
}


class SingleWorkshop extends Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded : false, isWorkshopInfo: true};
      }
    componentDidMount(){
        this.getprofile()
    }

    getprofile = async() => {
        const token = this.state.user.token
        const id = this.state.id
        const resp = await fetch(`${URLB}workshops/single/${id}`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
                })
            });
        const data = await resp.json()
        if (data.status = 200){
            if (data.studio === null){
                this.setState({isWorkshopInfo: false})}
                else{this.setState({ workshop: data.workshop,
                    isLoaded: true,
                });}
        }
    }
    render(){
        const e = this.state.workshop
        return [
            <div>
                {this.state.isWorkshopInfo ? <> {this.state.isLoaded ? <>
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
                    <div className="workshop-container3">
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
                
                </> : <div>Loading...</div>} </> : <></>}
            </div>
        ]
    }
}

export default WorkshopList
export {SingleWorkshop}
