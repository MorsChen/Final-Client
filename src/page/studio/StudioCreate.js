import React, {Component} from "react";
// import { Button } from "react-bootstrap";
import Moment from 'react-moment';
import 'moment-timezone';
 

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { es } from "date-fns/esm/locale";

const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL
class StudioCreate extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            description: "",
            image_url: "",
            address: "",
            ward: "",
            district: "",
            city: "",
            opentime: "",
            closetime: "",
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
            let newstudio = {
            name: this.state.name,
            description: this.state.description,
            image_url: this.state.image_url,
            address: this.state.address,
            ward: this.state.ward,
            district: this.state.district,
            city: this.state.city,
            opentime: this.state.opentime,
            closetime: this.state.closetime,
            };
            const token = this.props.user.token
            const response = await fetch(`${URLB}studios/add`, {
            method: "POST",
            body: JSON.stringify(newstudio),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            })
            });
            const data = await response.json()
            if (data.status === 200) {  
               return window.location.replace(`${URLF}studios/`);}
            else {return alert("you can't create new Studio, please contact admin")}
            
            
            
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
                    <h1 style={{ textAlign: "center" }}>Create Studio</h1>
                    </div>
                    <div className="form-group">
                    <label for="exampleFormControlInput1">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter your studio name"
                        autoFocus
                        required={true}
                    /></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Description</label>
                    <textarea
                        type="text"
                        name="description"
                        className="form-control"
                        placeholder="Enter Description"
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

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Address</label>
                    <input
                        type="text"
                        name="address"
                        className="form-control"
                        placeholder="Enter your address"
                        autoFocus
                        required={true}
                    /></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Ward</label>
                    <input
                        type="text"
                        name="ward"
                        className="form-control"
                        placeholder="Enter your ward"
                        autoFocus
                        required={true}
                    /></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">District</label>
                    <input
                        type="text"
                        name="district"
                        className="form-control"
                        placeholder="Enter your district"
                        autoFocus
                        required={true}
                    /></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">City</label>
                    <input
                        type="text"
                        name="city"
                        className="form-control"
                        placeholder="Enter your city"
                        autoFocus
                        required={true}
                    /></div>
        
                    <div className="form-group">
                    <label for="exampleFormControlInput1">Open At</label>
                    <input
                        type="text"
                        name="opentime"
                        className="form-control"
                        placeholder="Open Time HH:MM"
                        autoFocus
                        required={true}
                    /></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Closed At</label>
                    <input
                        type="text"
                        name="closetime"
                        className="form-control"
                        placeholder="Closed Time HH:MM"
                        autoFocus
                        required={true}
                    /></div>

                    <button
                    type="submit"
                    className="btn btn-primary"
                    >
                    Create Studio
                    </button>
                </form>
                </div>
            </div>
            </div>
            
            
        );
    }
}

class DelStudio extends Component {
    constructor(props) {
        super(props);
        this.state = {...props,
            isSignin: false,
        };
      }
    componentDidMount(){
        this.getprofile()
    }

    getprofile = async() => {
        const token = this.state.user.token
        const id = this.state.id
        const resp = await fetch(`${URLB}studios/delete/${id}`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
                })
            });
        const data = await resp.json()
        if (data.status = 200){
            return window.location.replace(`${URLF}studios`)}
        else {return alert('something wrong')}
        }
    render (){ return []}
    }


class EditStudio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded : false, 
            isStudioInfo: true, 
           };
      }
    componentDidMount(){
        this.getstudio()
    }
    getstudio = async() => {
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

    handleRegister = async e => {
        const id = this.state.id
        e.preventDefault();
        const i = this.state.studio
        if (this.state.user.isSignin !== true) {
            alert("Please login");
            return window.location.replace(`${URLF}login/`)
        }
        else {
            const newstudio = {
            name: this.state.name || i.name,
            description: this.state.description || i.description,
            image_url: this.state.image_url || i.image_url,
            address: this.state.address || i.address,
            ward: this.state.ward || i.ward,
            district: this.state.district || i.district,
            city: this.state.city || i.city,
            opentime: this.state.opentime || i.opentime,
            closetime: this.state.closetime || i.closetime,
            };
            const token = this.props.user.token
            const response = await fetch(`${URLB}studios/edit/${id}`, {
            method: "POST",
            body: JSON.stringify(newstudio),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            })
            });
            const data = await response.json()
            if (data.status === 200) {  
               return window.location.replace(`${URLF}studios/single/${id}`);}
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
        const e = this.state.studio
        return (
            <div className="container">
            <div className="jumbotron jumbotron-fluid custome-jumbo">
                <div className="container">
                <form
                    
                    onSubmit={e => this.handleRegister(e)}
                    onChange={e => this.handleChange(e)}
                >
                    <div className="form-group">
                    <h1 style={{ textAlign: "center" }}>Edit your Studio</h1>
                    </div>
                    {this.state.isStudioInfo ? <> {this.state.isLoaded ? <>
                    
                    <div className="form-group">
                    <label for="exampleFormControlInput1">Studio Name</label>
                    <p>Name: {e.name}</p>
                    <input
                        type="text"
                        name="name"
                        defaultValue = {e.name}
                        className="form-control"
                        autoFocus
                        required={true}
                    /></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Description</label>
                    <p>Description: {e.description}</p>
                    <textarea
                        type="text"
                        name="description"
                        className="form-control"
                        defaultValue = {e.description}
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

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Address</label>
                    <p>Address: {e.address}</p>
                    <input
                        type="text"
                        name="address"
                        className="form-control"
                        defaultValue = {e.address}
                        autoFocus
                        required={true}
                    /></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Ward</label>
                    <p>Ward: {e.ward}</p>
                    <input
                        type="text"
                        name="ward"
                        className="form-control"
                        defaultValue = {e.ward}
                        autoFocus
                        required={true}
                    /></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">District</label>
                    <p>District: {e.district}</p>
                    <input
                        type="text"
                        name="district"
                        className="form-control"
                        defaultValue = {e.district}
                        autoFocus
                        required={true}
                    /></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">City</label>
                    <p>City: {e.city}</p>
                    <input
                        type="text"
                        name="city"
                        className="form-control"
                        defaultValue = {e.city}
                        autoFocus
                        required={true}
                    /></div>
        
                    <div className="form-group">
                    <label for="exampleFormControlInput1">Open At</label>
                    <p>Open_At: {e.opentime}</p>
                    <input
                        type="text"
                        name="opentime"
                        className="form-control"
                        defaultValue = {e.opentime}
                        autoFocus
                        required={true}
                    /></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Closed At</label>
                    <p>Closed_At: {e.closetime}</p>
                    <input
                        type="text"
                        name="closetime"
                        className="form-control"
                        defaultValue = {e.closetime}
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
export default StudioCreate
export {EditStudio,DelStudio}