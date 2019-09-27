import React from "react";

const URL = `https://127.0.0.1:5000/`

export default class Logout extends React.Component {
    constructor(props){
        super(props)
        this.state = {...props}
        console.log('check props', this.state)
        
    }
    
    componentDidMount(){
        this.deltoken()
    }
    deltoken = async () => {
        console.log('check token inside', this.state.state.token)
        console.log('check URL', `${URL}logout`)
        const response = await fetch(`${URL}logout`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${this.state.state.token}`
        }
        })
        const status = await response.json()
        console.log('STATUS',status.status)
        if (status.status === 200) {
            sessionStorage.removeItem('token')
            this.setState({ token: null })
            window.location.replace('localhost:3000/')
        } else {
            alert('Error: ', status)
        }
    }

    render (){
        
        return [

        ]
    }
}
