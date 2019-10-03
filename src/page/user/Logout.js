import React from "react";

const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL
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
        console.log('check token inside', this.state.token)
        const response = await fetch(`${URLB}logout`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${this.state.token}`
        }
        })
        const status = await response.json()
        if (status.status === 200) {
            localStorage.clear('token')
            this.setState({ token: null })
            return window.location.replace(`${URLF}`);}
            else {return alert('something wrong')}
    }
    sendToken=(token)=>{
        this.props.getToken({token: token})
    }

    render (){ return []}
}
