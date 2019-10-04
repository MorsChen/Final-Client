import React, {Component} from "react";
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {user: this.props.user};
        console.log("check props Profile", this.state.user)
      }
    componentDidMount(){
        this.getprofile()
    }

    getprofile = async() => {
        const token = this.props.token
        const resp = await fetch(`https://127.0.0.1:5000/users/profile`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                "Authorization": `${token}`
                })
            });
        const data = await resp.json()
        console.log ("check data from login", data)
        if (data.status = 200){
            this.setState({ userinfo: data.user })
            
        }
    }
    render(){
        console.log('check state', this.state)
        console.log('check info', this.state.userinfo)
        return [
            <div className="FullContent">
                <h3>PROFILE</h3>
                <p>User Name : {this.state.userinfo.username}</p>
                <p>Full Name: {this.state.userinfo.firstname} {this.state.userinfo.lastname}</p>
                <p>Birthday: {this.state.userinfo.birthday}</p>
                <p>Email : {this.state.userinfo.email}</p>
                <p>Phone: {this.state.userinfo.phone}</p>
                <p>Address: {this.state.userinfo.address}, district {this.state.userinfo.state}, {this.state.userinfo.city} city</p>
                <p>Zipcode : {this.state.userinfo.zipcode}</p>

            </div>
        ]
    }
}