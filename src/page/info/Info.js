import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from "react-bootstrap";

const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL
class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded: false, isInfoInfo: true};
      }

    componentDidMount(){
    this.getStudios()
    }

    getStudios = async() => {
        const resp = await fetch(`${URLB}infos/`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                })
            });
        const data = await resp.json()
        if (data.status = 200){
            if (data.info === null){
                this.setState({isInfoInfo: false})}
            else{this.setState({ info: data.info, studio: data.studio,
                isLoaded: true,
            });
        }
        }
    }

    render(){
        return [
            <div>
                {this.state.isInfoInfo ? <> {this.state.isLoaded ? <> {this.state.info && 
                this.state.info.map( e=>{ 
                return (
                <div className="FullContent">
                    <div className="info-bg" style={{backgroundImage: `url(${e.image_studio})`, backgroundPosition:'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                        <div className='home-content'>
                            <h1 className="home-title">{e.studio}</h1>
                            <div clasName="des-containner">
                                <h5 className="home-description">{e.description}
                                </h5>
                            </div>
                        </div>
                    </div>

                    <div className="container2">
                        <div className="ctn2-content">
                            <h5 className="ctn2-title">INTRODUCTION</h5>
                            <div className="ctn2-body">
                            <h7>{e.intro}</h7><br/>
                            <h7>{e.intro2}</h7>
                            </div>
                        </div>
                        <div className="ctn2-content2">
                            <div className="ctn2-secsion">
                            <h5 className="ctn2-title">COURSE PROGRAM</h5>
                            <div className="ctn2-body2">
                            <h7>{e.courseprog}</h7>
                            </div>
                            </div>
                            <div className="ctn2-secsion">
                            <h5 className="ctn2-title">KNOWLEDGE</h5>
                            <div className="ctn2-body2">
                            <h7>{e.knowledge}</h7>
                            </div>
                            </div>
                        </div>
                        <div className="ctn2-content2">
                            <div className="ctn2-secsion">
                            <h5 className="ctn2-title">STUDY ENVIRONMENT</h5>
                            <div className="ctn2-body2">
                            <h7>{e.stenv}</h7>
                            </div>
                            </div>
                            <div className="ctn2-secsion">
                            <h5 className="ctn2-title">VOCATION</h5>
                            <div className="ctn2-body2">
                            <h7>{e.vocation}</h7>
                            </div>
                            </div>
                        </div>

                        
                    </div>

                    { this.state.user.id !== 1 ? <>
                        </>:<>
                        <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}courses/edit/${e.course_id}`)}>Edit Course</button>
                        <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}courses/delete/${e.scourse_id}`)}>Delete Course</button>
                        </>}
                    <div className='info-footer'>   </div>
                </div>
                
                )
                })}
                </> : <div>Loading...</div>} </> : <></>}
            </div>
        ]
    }

}

export default Info