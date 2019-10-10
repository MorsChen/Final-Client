import React, {Component} from "react";
// import { Button } from "react-bootstrap";
import Moment from 'react-moment';
import 'moment-timezone';


const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL
class InfoAdd extends React.Component {
    constructor() {
        super();
        this.state = {
            intro: "",
            intro2: "",
            courseprog: "",
            knowledge: "",
            stenv: "",
            vocation:"",
            image_url: "",
        };

      }

    handleRegister = async e => {
        e.preventDefault();
        const user = this.props.user
        if (user.isSignin !== true) {
            alert("Please login");
            return window.location.replace(`${URLF}login/`)
        }
        else {
            let newinfo = {
                intro: this.state.intro,
                intro2: this.state.intro2,
                courseprog: this.state.courseprog,
                knowledge: this.state.knowledge,
                stenv: this.state.stenv,
                vocation: this.state.vocation,
                image_url: this.state.image_url,
            };
            const token = this.props.user.token
            const response = await fetch(`${URLB}infos/add`, {
            method: "POST",
            body: JSON.stringify(newinfo),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            })
            });
            const data = await response.json()
            if (data.status === 200) {  
               return window.location.replace(`${URLF}`);}
            else {return alert('Info was not create')}
            
            
            
        }
        };
    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
        
    };
   
    render() {
        return (
            <div className="container">
            <div className="jumbotron jumbotron-fluid custome-jumbo">
                <div className="container">
                <form
    
                    onSubmit={e => this.handleRegister(e)}
                    onChange={e => this.handleChange(e)}
                >
                    <div className="form-group">
                    <h1 style={{ textAlign: "center" }}>Add Info</h1>
                    </div>
                    
                    <div className="form-group">
                    <label for="exampleFormControlInput1">Introduction</label>
                    <textarea
                        type="text"
                        name="intro"
                        className="form-control"
                        placeholder="Enter Introduction"
                        rows="5"
                        autoFocus
                        required={true}
                    ></textarea></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Introduction 2</label>
                    <textarea
                        type="text"
                        name="intro2"
                        className="form-control"
                        placeholder="Enter Introduction"
                        rows="5"
                        autoFocus
                        required={true}
                    ></textarea></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Course Program</label>
                    <textarea
                        type="text"
                        name="courseprog"
                        className="form-control"
                        placeholder="Enter Course Program"
                        rows="5"
                        autoFocus
                        required={true}
                    ></textarea></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Knowledge</label>
                    <textarea
                        type="text"
                        name="knowledge"
                        className="form-control"
                        placeholder="Enter Knowledge"
                        rows="5"
                        autoFocus
                        required={true}
                    ></textarea></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Study Environment</label>
                    <textarea
                        type="text"
                        name="stenv"
                        className="form-control"
                        placeholder="Enter Study Environment"
                        rows="5"
                        autoFocus
                        required={true}
                    ></textarea></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Vocation</label>
                    <textarea
                        type="text"
                        name="vocation"
                        className="form-control"
                        placeholder="Enter Vocation"
                        rows="5"
                        autoFocus
                        required={true}
                    ></textarea></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Image URL</label>
                    <input
                        type="text"
                        name="image_url"
                        className="form-control"
                        placeholder="add image_url if you have"
                        autoFocus
                        required={true}
                    /></div>

                    <button
                    type="submit"
                    className="btn btn-primary"
                    >
                    Create Infomation
                    </button>
                </form>
                </div>
            </div>
            </div>
            
            
        );
    }
}

class DelInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {...props,
            isSignin: false,
            intro: this.state.intro,
            intro2: this.state.intro2,
            courseprog: this.state.courseprog,
            knowledge: this.state.knowledge,
            stenv: this.state.stenv,
            vocation: this.state.vocation,
            image_url: this.state.image_url,
        };
      }
    componentDidMount(){
        this.getprofile()
    }

    getprofile = async() => {
        const token = this.state.user.token
        const id = this.state.id
        const resp = await fetch(`${URLB}infos/delete/${id}`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
                })
            });
        const data = await resp.json()
        if (data.status = 200){
            return window.location.replace(`${URLF}`)}
        else {return alert("You can't delete this infomation")}
        }
    render (){ return []}
    }


class EditInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded : false, 
            isCourseInfo: true, 
           };
      }
    componentDidMount(){
        this.getstudio()
    }
    getstudio = async() => {
        const token = this.state.user.token
        const id = this.state.id
        const resp = await fetch(`${URLB}infos/single/${id}`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
                })
            });
        const data = await resp.json()
        if (data.status = 200){
            if (data.info === null){
                this.setState({isCourseInfo: false})}
                else{this.setState({ info: data.info,
                    isLoaded: true,
                });}
        }
    }

    handleRegister = async e => {
        const id = this.state.id
        e.preventDefault();
        const i = this.state.info
        if (this.state.user.isSignin !== true) {
            alert("Please login");
            return window.location.replace(`${URLF}login/`)
        }
        else {
            const newinfo = {
                intro: this.state.intro || i.intro,
                intro2: this.state.intro2 || i.intro2,
                courseprog: this.state.courseprog || i.courseprog,
                knowledge: this.state.knowledge || i.knowledge,
                stenv: this.state.stenv || i.stenv,
                vocation: this.state.vocation || i.vocation,
                image_url: this.state.image_url || i.image_url,
            };
            const token = this.props.user.token
            const response = await fetch(`${URLB}infos/edit/${id}`, {
            method: "POST",
            body: JSON.stringify(newinfo),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            })
            });
            const data = await response.json()
            if (data.status === 200) {  
               return window.location.replace(`${URLF}studio`);}
            else {return alert('something wrong')}
        }
        };
    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
        
    };

    render() {
        const e = this.state.course
        return (
            <div className="container">
            <div className="jumbotron jumbotron-fluid custome-jumbo">
                <div className="container">
                <form
                    
                    onSubmit={e => this.handleRegister(e)}
                    onChange={e => this.handleChange(e)}
                >
                    <div className="form-group">
                    <h1 style={{ textAlign: "center" }}>Edit your Studio's Info</h1>
                    </div>
                    {this.state.isCourseInfo ? <> {this.state.isLoaded ? <>
                    
                    <div className="form-group">
                    <label for="exampleFormControlInput1">Introduction</label>
                    <p>{e.intro}</p>
                    <textarea
                        type="text"
                        name="intro"
                        className="form-control"
                        defaultValue = {e.intro}
                        rows="5"
                        autoFocus
                        required={true}
                    ></textarea></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Introduction 2</label>
                    <p>{e.intro2}</p>
                    <textarea
                        type="text"
                        name="intro2"
                        className="form-control"
                        defaultValue = {e.intro2}
                        rows="5"
                        autoFocus
                        required={true}
                    ></textarea></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Course Program</label>
                    <p>{e.courseprog}</p>
                    <textarea
                        type="text"
                        name="courseprog"
                        className="form-control"
                        defaultValue = {e.courseprog}
                        rows="5"
                        autoFocus
                        required={true}
                    ></textarea></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Knowledge</label>
                    <p>{e.knowledge}</p>
                    <textarea
                        type="text"
                        name="knowledge"
                        className="form-control"
                        defaultValue = {e.knowledge}
                        rows="5"
                        autoFocus
                        required={true}
                    ></textarea></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Study Environment</label>
                    <p>{e.stenv}</p>
                    <textarea
                        type="text"
                        name="stenv"
                        className="form-control"
                        defaultValue = {e.stenv}
                        rows="5"
                        autoFocus
                        required={true}
                    ></textarea></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Vocation</label>
                    <p>{e.vocation}</p>
                    <textarea
                        type="text"
                        name="vocation"
                        className="form-control"
                        defaultValue = {e.vocation}
                        rows="5"
                        autoFocus
                        required={true}
                    ></textarea></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Image URL</label><br/>
                    <img src={`${e.image_url}`} style={{width: '20vw', height: '15vh'}}/><br/>
                    <input
                        type="text"
                        name="image_url"
                        className="form-control"
                        defaultValue = {e.image_url}
                        autoFocus
                        required={true}
                    /></div>

                    <p> Created At: <Moment date={e.created} /> </p><br/>

                    <button
                    type="submit"
                    className="btn btn-primary"
                    >
                    Submit to Edit
                    </button>
                    </>:<div>Loading...</div>}</>:<></>}
                </form>
                </div>
            </div>
            </div>
            
            
        );
    }
}
export default InfoAdd
export {EditInfo,DelInfo}