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
                </>}
                
                <p onClick={()=>window.location.replace(`${URLF}posts/single/${e.post_id}`)}>
                Post Title : {e.title}</p>
                <p>Body: {e.body}</p>
                <p>Views : {e.views}</p>
                <p>Created : <Moment date={e.created}/></p>
                <p>Updated : <Moment date={e.updated}/></p>
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
    render(){
        const e = this.state.post
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
                <p>Created : <Moment date={e.created}/></p>
                <p>Updated : <Moment date={e.updated}/></p>

                

                </> : <div>Loading...</div>} </> : <></>}
            </div>
        ]
    }
}

export default PostList
export {SinglePost}
