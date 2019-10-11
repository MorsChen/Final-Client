import React, {Component} from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL
export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            user: {},
        };
      }

    componentDidMount () {
    }

    handleLogin = async e => {
        e.preventDefault();
        let userlogin = {
        email: this.state.email,
        password: this.state.password,
        };
        const response = await fetch(`${URLB}users/login`, {
            method: "POST",
            body: JSON.stringify(userlogin),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        });
        const data = await response.json()
        if (data.status === 200) {
            this.sendToken(data.token)
            localStorage.setItem('token', data.token)
    
            return window.location.replace(`${URLF}profile`);
        }
            else {return alert('something wrong')}
        };

    sendToken=(token)=>{
        this.props.getToken(token)
    }


    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
        };

    render() {
        return (
            <div className="FullContent">
            <div className="in-fullcont">
            <div className="jumbotron jumbotron-fluid custome-jumbo">
                <div className="container">
                <form  
                    onSubmit={e => this.handleLogin(e)}
                    onChange={e => this.handleChange(e)}
                >
                    <div className="form-group">
                    <h1 style={{ textAlign: "center" }}>Sign In</h1>
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
                    <button
                    type="submit"
                    className="btn btn-primary"
                    >
                    Login
                    </button><br/>
                    <button
                    className="btn btn-primary"
                    onClick = {()=>window.location.replace(`${URLB}login/facebook`)}
                    >
                    Login with facebook
                    </button>
                </form>
                </div>
            </div>
            </div>
            </div>
        );
    }
}

