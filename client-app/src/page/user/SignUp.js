import React, {Component} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import useForm from "react-hook-form";
// import { Form, Col, InputGroup, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const URLB = process.env.REACT_APP_BACKEND_URL
export default class Signup extends Component {
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
            const response = await fetch(`${URLB}users/register`, {
            method: "POST",
            body: JSON.stringify(newuser),
            headers: new Headers({
                "Content-Type": "application/json"
            })
            });
            const data = await response.json()
            if (data.status === 200) {
                localStorage.setItem('token', data.token)
                this.setState({
                    user: data.user,
                })
               return window.location.replace(`http://localhost:3000/`);
            }
            else return alert('something wrong') 
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
        return (
            <div className="container">
            <div className="jumbotron jumbotron-fluid custome-jumbo">
                <div className="container">
                <form
                    
                    onSubmit={e => this.handleRegister(e)}
                    onChange={e => this.handleChange(e)}
                >
                    <div className="form-group">
                    <h1 style={{ textAlign: "center" }}>Sign Up</h1>
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
    