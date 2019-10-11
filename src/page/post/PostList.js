import React, {Component} from "react";
import Moment from 'react-moment';
import 'moment-timezone';
import "react-datepicker/dist/react-datepicker.css";

const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL
class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded : false, isPostInfo: true};
      }
    componentDidMount(){
        this.getposts()
    }

    getposts = async() => {
        const token = this.props.user.token
        const resp = await fetch(`${URLB}posts/list`, {
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
            else{this.setState({ posts: data.post,
                isLoaded: true,
            });}
        }
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
              this.getposts();}
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
            this.getposts()}
        else {return alert('something wrong')}
        }

    render(){
        return [
            <div className="FullContent">
                <h3>Post List</h3>
                {this.state.isPostInfo ? <>
                </>:<>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}posts/add`)}>Create Post</button>
                </>}
                
                {this.state.isPostInfo ? <> {this.state.isLoaded ? <> {this.state.posts && 
                this.state.posts.map( e=>{ 
                return (
                <div className='body-contain'>
                {e.owner_id !== this.state.user.id ? <>
                </>:<>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}posts/edit/${e.post_id}`)}>Edit Post</button>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}posts/delete/${e.post_id}`)}>Delete Post</button>
                </>}<br/>
                <div>
                    <p onClick={()=>window.location.replace(`${URLF}posts/single/${e.post_id}`)}>
                    post Title : {e.title}</p>
                    <p>Body: {e.body}</p>
                    <p>Views : {e.views}</p>
                    <p>Author: {e.owner}</p>
                    <p>Created : <Moment date={e.created}/></p>
                    <p>Updated : <Moment date={e.updated}/></p>
                </div>

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
                                <button type="submit" className="btn btn-primary">Comment</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div>
                    {e.comment && e.comment.map(c => {
                        return [
                            <div style={{backgroundColor: 'orange'}}>
                                <p>Body: {c.body}</p>
                                <p>Author : {c.author}</p>
                                <button onClick={()=>this.delcomment(c.comment_id)}>Del Comment</button>
                            </div>
                        ]
                    })}
                    
                </div>
                </div> 
                )
                })}
                </> : <div>Loading...</div>} </> : <></>}
            </div>
        ]
    }
}


class SinglePost extends Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded : false, isPostInfo: true};
      }
    componentDidMount(){
        this.getprofile()
    }

    getprofile = async() => {
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
              this.setState({ comment: data.post,
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

    render(){
        const e = this.state.post
        console.log('check single post 101', e)
        return [
            <div className="FullContent">
                <h3>Post</h3>
                {this.state.isPostInfo ? <>
                </>:<>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}posts/add`)}>Create Post</button>
                </>}
                
                {this.state.isPostInfo ? <> {this.state.isLoaded ? <>
                {e.owner_id !== this.state.user.id ? <>
                </>:<>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}posts/edit/${e.post_id}`)}>Edit Post</button>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}posts/delete/${e.post_id}`)}>Delete Post</button>
                </>}
                
                <p>
                Post Title : {e.title}</p>
                <p>Body: {e.body}</p>
                <p>Views : {e.views}</p>
                <p>Author: {e.owner}</p>
                <p>Created : <Moment date={e.created}/></p>
                <p>Updated : <Moment date={e.updated}/></p>
                
                <div className="container">
                    <div className="jumbotron jumbotron-fluid custome-jumbo">
                        <div className="container">
                            <form
                                onSubmit={(i, id) => { id = e.post_id
                                    this.handleAddCmt(i, id)}}
                                onChange={e => this.handleChange(e)}
                            >
                                <div className="form-group">
                                <input
                                    type="text"
                                    name="body"
                                    className="form-control"
                                    placeholder="Enter Body"
                                    autoFocus 
                                    required={true}
                                /></div>
                                <button type="submit" className="btn btn-primary">Comment</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div>
                    {e.comment && e.comment.map(c => {
                        return [
                            <div style={{backgroundColor: 'orange'}}>
                                <p>Body: {c.body}</p>
                                <p>Author : {c.author}</p>
                                <button onClick={()=>this.delcomment(c.comment_id)}>Del Comment</button>
                            </div>
                        ]
                    })}
                    
                </div>
               
                

                </> : <div>Loading...</div>} </> : <></>}
            </div>
        ]
    }
}

export default PostList
export {SinglePost}
