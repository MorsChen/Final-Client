import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from "react-bootstrap";

const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL
class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded: false, isPostInfo: true};
        console.log("check props Posts", this.state)
        console.log("check props user isSignin", this.state.user.isSignin)
      }

      componentDidMount(){
        this.getPosts()
    }

    getPosts = async() => {
        const resp = await fetch(`${URLB}posts/`, {
            method: "GET",
            headers: ({
                "Content-Type": "application/json",
                })
            });
        const data = await resp.json()
        if (data.status = 200){
            if (data.post === null){
                this.setState({isPostInfo: false})}
            else{this.setState({ posts: data.post,
                isLoaded: true,
            });
        }
        }
    }

    render(){
        console.log('check posts', this.state.posts)
        return [
            <div className="FullContent">
                <h3>Post List</h3>
                {this.state.isPostInfo ? <>
                </>:<>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}posts/add`)}>Create Post</button>
                </>}
                {this.state.user.isSignin ? <>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}posts/add`)}>Create Post</button>
                </>:<></>}
                
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
                post Title : {e.title}</p>
                <p>Body: {e.body}</p>
                <p>Views : {e.views}</p>
                <p>Created : {e.created}</p>
                <p>Updated : {e.updated}</p>
                </div>
                )
                })}
                </> : <div>Loading...</div>} </> : <></>}
            </div>
        ]
    }

}

export default Posts