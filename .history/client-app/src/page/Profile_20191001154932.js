import React, {Component} from "react";
import { Button } from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded : false, isUserinfo: true};
        console.log("check props Profile", this.state)
      }
    componentDidMount(){
        this.getprofile()
    }

    getprofile = async() => {
        const token = this.state.user.token
        const resp = await fetch(`https://127.0.0.1:5000/users/profile`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
                })
            });
        const data = await resp.json()
        console.log ("check data from login", data)
        if (data.status = 200){
            if (data.user === null){
                this.setState({isUserinfo: false})}
            else{this.setState({ userinfo: {
                id: data.user.id,
                username: data.user.username,
                firstname: data.user.firstname,
                lastname: data.user.lastname,
                email: data.user.email,
                address: data.user.address,
                birthday: data.user.birthday,
                city: data.user.city,
                state: data.user.state,
                zipcode: data.user.zipcode,
                phone: data.user.phone,
            }, 
                isLoaded: true,
            });}
        }
    }
    render(){
        console.log('check state 42' , this.state)
        return [
            <div className="FullContent">
                <h3>PROFILE</h3>
                {this.state.isUserinfo ? <><button className="btn btn-primary" onClick={()=> window.location.replace(`http://localhost:3000/profile/edit/`)}>Edit Profile</button></> : 
                <><button className="btn btn-primary" onClick={()=> window.location.replace(`http://localhost:3000/profile/create/`)}>Create Profile</button>
                </>}
                
                {this.state.isUserinfo ? <> {this.state.isLoaded ? <> <p>User Name : {this.state.userinfo.username}</p>
                <p>Full Name: {this.state.userinfo.firstname} {this.state.userinfo.lastname}</p>
                <p>Birthday: {this.state.userinfo.birthday}</p>
                <p>Email : {this.state.userinfo.email}</p>
                <p>Phone: {this.state.userinfo.phone}</p>
                <p>Address: {this.state.userinfo.address}, district {this.state.userinfo.state}, {this.state.userinfo.city} city</p>
                <p>Zipcode : {this.state.userinfo.zipcode}</p> </> : <div>Loading...</div>} </> : <></>}
                

            </div>
        ]
    }
}

class EditProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            isSignin: false,
            firsname: "",
            lastname: "",
            email: "",
            password: "",
            repassword: "",
            address: "",
            birthday: new Date(),
            phone: "",
            city: "",
            state: "",
            zipcode: "",
        };
      }

    handleRegister = async e => {
        e.preventDefault();
        if (this.state.password !== this.state.repassword) {
            alert("Password and Password confirm must match");
        }
        else {
            let newuser = {
            username: this.state.username,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
            birthday: this.state.birthday,
            phone: this.state.phone,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            };
            console.log(newuser)
            const response = await fetch(`https://127.0.0.1:5000/users/register`, {
            method: "POST",
            body: JSON.stringify(newuser),
            headers: new Headers({
                "Content-Type": "application/json"
            })
            });
            const data = await response.json()
            console.log("check resp from login",data)
            if (data.status === 200) {
                localStorage.setItem('token', data.token)
                this.setState({
                    user: data.user,
                })
               return window.location.replace(`http://localhost:3000/`);}
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
    handleDate = date => {
        this.setState({
            birthday: date
        });
    };

    render() {
        console.log("check username",this.state.username);
        console.log(this.state.birthday.toISOString().slice(0, 10))
        console.log(new Date().toISOString().slice(0, 10))
        return (
            <div className="container">
            <div className="jumbotron jumbotron-fluid custome-jumbo">
                <div className="container">
                <form
                    
                    onSubmit={e => this.handleRegister(e)}
                    onChange={e => this.handleChange(e)}
                >
                    <div className="form-group">
                    <h1 style={{ textAlign: "center" }}>Edit Profile</h1>
                    <label for="exampleInputEmail1">Username</label>
                    <input

                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Enter your username"
                        autoFocus
                        required={true}
                    />
                    </div>
                    <div className="form-group">
                    <label for="exampleInputEmail1">First Name</label>
                    <input

                        type="text"
                        name="firstname"
                        className="form-control"
                        placeholder="Enter your firstname"
                        autoFocus
                        required={true}
                    />
                    </div>
                    <div className="form-group">
                    <label for="exampleInputEmail1">Last Name</label>
                    <input

                        type="text"
                        name="lastname"
                        className="form-control"
                        placeholder="Enter your lastname"
                        autoFocus
                        required={true}
                    />
                    </div>
                    <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        required={true}
                        
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
                    </div>
                    <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        required={true}
                    />
                    </div>
                    <div className="form-group">
                    <label for="exampleInputPassword1">Confirm password</label>
                    <input
                        type="password"
                        name="repassword"
                        className="form-control"
                        required={true}
                        placeholder="Re-enter password"
                    />
                    </div>
                    <div className="form-group">
                    <label for="exampleInputEmail1">Your Birthday</label>
                    <DatePicker
                    selected={this.state.birthday}
                    onChange={this.handleDate}
                    required={true}
                    dateFormat="MM/dd/yyyy h:mm aa"
                    />
                    </div>

                    <div className="form-group">
                    <label for="exampleInputEmail1">Address</label>
                    <input

                        type="text"
                        name="address"
                        className="form-control"
                        placeholder="Enter your address"
                        autoFocus
                        required={true}
                    />
                    </div>
                    <div className="form-group">
                    <label for="exampleInputEmail1">city</label>
                    <input

                        type="text"
                        name="city"
                        className="form-control"
                        placeholder="Enter your city"
                        autoFocus
                        required={true}
                    />
                    </div><div className="form-group">
                    <label for="exampleInputEmail1">Number Phone</label>
                    <input

                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="Enter your number phone"
                        autoFocus
                        required={true}
                    />
                    </div>
                    <div className="form-group">
                    <label for="exampleInputEmail1">State</label>
                    <input

                        type="text"
                        name="state"
                        className="form-control"
                        placeholder="Enter your state"
                        autoFocus
                        required={true}
                    />
                    </div><div className="form-group">
                    <label for="exampleInputEmail1">ZipCode</label>
                    <input

                        type="text"
                        name="zipcode"
                        className="form-control"
                        placeholder="Enter Zip Code"
                        autoFocus
                        required={true}
                    />
                    </div>
                    <button
                    type="submit"
                    className="btn btn-primary"
                    >
                    Signup
                    </button>
                </form>
                </div>
            </div>
            </div>
        );
    }
}

class CreateProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            isSignin: false,
            firsname: "",
            lastname: "",
            email: "",
            password: "",
            repassword: "",
            address: "",
            birthday: new Date(),
            phone: "",
            city: "",
            state: "",
            zipcode: "",
        };
      }

    handleRegister = async e => {
        e.preventDefault();
        if (this.state.password !== this.state.repassword) {
            alert("Password and Password confirm must match");
        }
        else {
            let newuser = {
            username: this.state.username,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
            birthday: this.state.birthday,
            phone: this.state.phone,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            };
            console.log(newuser)
            const response = await fetch(`https://127.0.0.1:5000/users/register`, {
            method: "POST",
            body: JSON.stringify(newuser),
            headers: new Headers({
                "Content-Type": "application/json"
            })
            });
            const data = await response.json()
            console.log("check resp from login",data)
            if (data.status === 200) {
                localStorage.setItem('token', data.token)
                this.setState({
                    user: data.user,
                })
               return window.location.replace(`http://localhost:3000/`);}
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
    handleDate = date => {
        this.setState({
            birthday: date
        });
    };

    render() {
        console.log("check username",this.state.username);
        console.log(this.state.birthday.toISOString().slice(0, 10))
        console.log(new Date().toISOString().slice(0, 10))
        return (
            <div className="container">
            <div className="jumbotron jumbotron-fluid custome-jumbo">
                <div className="container">
                <form
                    
                    onSubmit={e => this.handleRegister(e)}
                    onChange={e => this.handleChange(e)}
                >
                    <div className="form-group">
                    <h1 style={{ textAlign: "center" }}>Create Profile</h1>
                    <label for="exampleInputEmail1">Username</label>
                    <input

                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Enter your username"
                        autoFocus
                        required={true}
                    />
                    </div>
                    <div className="form-group">
                    <label for="exampleInputEmail1">First Name</label>
                    <input

                        type="text"
                        name="firstname"
                        className="form-control"
                        placeholder="Enter your firstname"
                        autoFocus
                        required={true}
                    />
                    </div>
                    <div className="form-group">
                    <label for="exampleInputEmail1">Last Name</label>
                    <input

                        type="text"
                        name="lastname"
                        className="form-control"
                        placeholder="Enter your lastname"
                        autoFocus
                        required={true}
                    />
                    </div>
                    <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        required={true}
                        
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
                    </div>
                    <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        required={true}
                    />
                    </div>
                    <div className="form-group">
                    <label for="exampleInputPassword1">Confirm password</label>
                    <input
                        type="password"
                        name="repassword"
                        className="form-control"
                        required={true}
                        placeholder="Re-enter password"
                    />
                    </div>
                    <div className="form-group">
                    <label for="exampleInputEmail1">Your Birthday</label>
                    <DatePicker
                    selected={this.state.birthday}
                    onChange={this.handleDate}
                    required={true}
                    dateFormat="MM/dd/yyyy h:mm aa"
                    />
                    </div>

                    <div className="form-group">
                    <label for="exampleInputEmail1">Address</label>
                    <input

                        type="text"
                        name="address"
                        className="form-control"
                        placeholder="Enter your address"
                        autoFocus
                        required={true}
                    />
                    </div>
                    <div className="form-group">
                    <label for="exampleInputEmail1">city</label>
                    <input

                        type="text"
                        name="city"
                        className="form-control"
                        placeholder="Enter your city"
                        autoFocus
                        required={true}
                    />
                    </div><div className="form-group">
                    <label for="exampleInputEmail1">Number Phone</label>
                    <input

                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="Enter your number phone"
                        autoFocus
                        required={true}
                    />
                    </div>
                    <div className="form-group">
                    <label for="exampleInputEmail1">State</label>
                    <input

                        type="text"
                        name="state"
                        className="form-control"
                        placeholder="Enter your state"
                        autoFocus
                        required={true}
                    />
                    </div><div className="form-group">
                    <label for="exampleInputEmail1">ZipCode</label>
                    <input

                        type="text"
                        name="zipcode"
                        className="form-control"
                        placeholder="Enter Zip Code"
                        autoFocus
                        required={true}
                    />
                    </div>
                    <button
                    type="submit"
                    className="btn btn-primary"
                    >
                    Signup
                    </button>
                </form>
                </div>
            </div>
            </div>
        );
    }
}

export default Profile
export {EditProfile, CreateProfile}