import React, {Component} from "react";
// import { Button } from "react-bootstrap";
import Moment from 'react-moment';
import 'moment-timezone';

const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL
class Comments extends React.Component {
    constructor() {
        super();
        this.state = {
            body: "",
        };

      }

      handleAddCmt = async (i, id) => {
        const a = id
        i.preventDefault();
        const user = this.props.user
        if (user.isSignin !== true) {
            alert("Please login");
            return window.location.replace(`${URLF}login/`)
        }
        else {
            let newcmt = {
            body: this.state.body,
            };
            const token = this.props.user.token
            const response = await fetch(`${URLB}posts/${a}/comments/add/`, {
            method: "POST",
            body: JSON.stringify(newcmt),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            })
            });
            const data = await response.json()
            if (data.status === 200) {
            //   this.getprofile();
              this.setState({ posts: data.post,
                isLoaded: true,
            });
            }
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
        return (
            <div className="container">
            <div className="jumbotron jumbotron-fluid custome-jumbo">
                <div className="container">
                <form
                    onSubmit={(i, id) => { id = e.post_id
                        this.handleAddCmt(i, id)}}
                    onChange={e => this.handleChange(e)}
                >
                    <div className="form-group">
                    <textarea
                        type="text"
                        name="body"
                        className="form-control"
                        placeholder="Enter Body"
                        rows="5"
                        autoFocus 
                        required={true}
                    ></textarea></div>
                    <button type="submit" className="btn btn-primary">Create Post</button>
                </form>
                </div>
            </div>
            </div>
        );
    }
}

class DelPost extends Component {
    constructor(props) {
        super(props);
        this.state = {...props,
            isSignin: false,
        };
      }
    componentDidMount(){
        this.delcomment()
    }

    delcomment = async(e) => {
        const token = this.state.user.token
        const id = e
        const resp = await fetch(`${URLB}posts/comments/delete/${id}`, {
            method: "POST",
            headers: ({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
                })
            });
        const data = await resp.json()
        if (data.status = 200){
            this.getprofile()}
        else {return alert('something wrong')}
        }


    render (){ return []}
    }


class EditPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded : false, 
            isPostInfo: true,
        };
      }
    componentDidMount(){
        this.getpostedit()
    }
    getpostedit = async() => {
        const token = this.state.user.token
        const id = this.state.id
        const resp = await fetch(`${URLB}posts/single/${id}`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
                })
            });
        const data = await resp.json()
        if (data.status = 200){
            if (data.post === null){
                this.setState({isPostInfo: false})}
                else{this.setState({ post: data.post,
                    isLoaded: true,
                });}
        }
    }

    handleRegister = async e => {
        const id = this.state.id
        e.preventDefault();
        const i = this.state.post
        if (this.state.user.isSignin !== true) {
            alert("Please login");
            return window.location.replace(`${URLF}login/`)
        }
        else {
            const editpost = {
            title: this.state.title || i.title,
            body: this.state.body || i.body,
            };
            const token = this.props.user.token
            const response = await fetch(`${URLB}posts/edit/${id}`, {
            method: "POST",
            body: JSON.stringify(editpost),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            })
            });
            const data = await response.json()
            if (data.status === 200) {  
               return window.location.replace(`${URLF}posts/single/${id}`);}
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
        const e = this.state.post
        return (
            <div className="container">
            <div className="jumbotron jumbotron-fluid custome-jumbo">
                <div className="container">
                <form
                    
                    onSubmit={e => this.handleRegister(e)}
                    onChange={e => this.handleChange(e)}
                >
                    <div className="form-group">
                    <h1 style={{ textAlign: "center" }}>Edit Post</h1>
                    </div>
                    {this.state.isPostInfo ? <> {this.state.isLoaded ? <>
                    
                    <div className="form-group">
                    <label for="exampleFormControlInput1">Title</label>
                    <p>Title: {e.title}</p>
                    <input
                        type="text"
                        name="title"
                        defaultValue = {e.title}
                        className="form-control"
                        autoFocus
                        required={true}
                    /></div>

                    <div className="form-group">
                    <label for="exampleFormControlInput1">Body</label>
                    <p>Body: {e.body}</p>
                    <textarea
                        type="text"
                        name="body"
                        className="form-control"
                        defaultValue = {e.body}
                        rows="5"
                        autoFocus
                        required={true}
                    ></textarea></div>

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
export default Comments
export {EditPost,DelPost}