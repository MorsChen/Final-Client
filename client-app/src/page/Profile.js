import React, {Component} from "react";
export default class Profile extends Component {
    constructor() {
        super();
        this.state = {
            isSignin: false,
            id: '',
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            address: '',
            birthday: '',
            city: '',
            state: '',
            zipcode: '',
            phone: '',
        };
      }
    componentDidMount(){
        this.getprofile()
    }

    getprofile = async() => {
    const resp = await fetch(`https://127.0.0.1:5000/users/profile`)
    const data = resp.json()
    console.log ("check data from login", data)
    }
    render(){
        return [
            <div>PROFILE</div>
        ]
    }
}