import React, {Component} from "react";
import { Button } from "react-bootstrap";
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
                {this.state.isUserinfo ? <><button className="btn btn-primary" onClick={()=> window.location.replace(`http://localhost:3000/profile/edit`)}>Edit Profile</button></> : 
                <><button className="btn btn-primary" onClick={()=> window.location.replace(`http://localhost:3000/profile/edit`)}>Create Profile</button>
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
    render(){
        return (
            <div> Edit Profile</div>
        )
    }
}

export default Profile
export {EditProfile}