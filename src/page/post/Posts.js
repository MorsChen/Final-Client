import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from "react-bootstrap";
import classnames from "classnames";

import Moment from 'react-moment';
import 'moment-timezone';

const URLB = process.env.REACT_APP_BACKEND_URL
const URLF = process.env.REACT_APP_FRONTEND_URL
class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props, isLoaded: false, isPostInfo: true, unLikePost:false};
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
              this.getPosts();}
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
            this.getPosts()}
        else {return alert('something wrong')}
        }

    likepost = async(e) => {
        const id = e
        const token = this.state.user.token
        console.log('check tokent 77', token)
        const resp = await fetch(`${URLB}posts/like/${id}/`, {
            method: "POST",
            body: '',
            headers: new Headers ({
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
                })
            });
        const data = await resp.json()
        if (data.status = 200){
            this.setState({ unLikePost: data.unLikePost,
                isLoaded: true, }); 
            this.getPosts()}
        else {return alert('something wrong')}
    }
    

    render(){
        return [
            <div className="FullContent">
                <div className="in-fullcont">
                <h3 className="home-title">Post List</h3>
                {this.state.isPostInfo ? <>
                </>:<>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}posts/add`)}>Create Post</button>
                </>}
                {this.state.user.isSignin ? <>
                <button className="btn btn-primary" onClick={()=> window.location.replace(`${URLF}posts/add`)}>Create Post</button>
                </>:<></>}
                
                {this.state.isPostInfo ? <> {this.state.isLoaded ? <> {this.state.posts && this.state.posts.map( e=>{ 
                return (
                <div className='body-contain'><br/>
                <div className="post-content">
                    <div className="header-post"><h5 className="h5-header-post">{e.owner}</h5>
                    
                    </div>

                    <div className="content-post-title">
                        <div>
                            <span className="h5-post-title" onClick={()=>window.location.replace(`${URLF}posts/single/${e.post_id}`)}>
                            {e.title}</span>
                            <p className="p-post-title"><Moment fromNow>{e.created}</Moment></p>
                        </div>
                        <div>
                            {e.owner_id !== this.state.user.id ? <>
                                </>:<>
                                <i class="far fa-trash-alt" style={{fontSize: '1rem'}} onClick={()=> window.location.replace(`${URLF}posts/delete/${e.post_id}`)}></i>
                                <i class="far fa-edit ml-3" style={{fontSize: '1rem'}}  onClick={()=> window.location.replace(`${URLF}posts/edit/${e.post_id}`)}></i>
                                </>}
                        </div>
                        </div><br/>

                    <div className="content-post-body"><h7 className="h7-post-body"> {e.body}</h7></div>

                    <div style={{display:'flex' ,flexDirection:"row", width:'90%', justifyContent:"space-between" ,marginTop:'10px'}}>
                    <div style={{display:'flex' ,flexDirection:"row", width:'10%',textAlign: 'left', alignItems: 'center', alignContent:'center'}}>
                        {/* {this.state.user.id === null || e.like === null ? <>
                            <i class ="far fa-thumbs-up mr-3"
                            style={{color:'red'}}
                            onClick={()=>this.likepost(e.post_id)}></i>
                        </>:<>
                        {e.like && e.like.map(k =>{
                            if (k !== this.state.user.id){
                                return <i class ="far fa-thumbs-up mr-3"
                                style={{color:'red'}}
                                onClick={()=>this.likepost(e.post_id)}></i>
                            }else{
                                return <i class ="fas fa-thumbs-up mr-3"
                                style={{color:'red'}}
                                onClick={()=>this.likepost(e.post_id)}></i>
                            }
                        })}
                        </>} */}
                      
                        <i 
                        // className={classnames("far fa-heart",{"fas fa-heart": ! e.like && e.like.map(k =>{
                        //     if (k === this.state.user.id){
                        //         this.setState({unLikePost: true})
                        //     }else{this.setState({unLikePost: false})}
                        //     return  this.state.unLikePost
                        // })}
                        // )}  
                        // className={classnames("far fa-thumbs-up mr-3", {"far fa-thumbs-up mr-3": !  this.state.unLikePost})}
                        class ="far fa-thumbs-up mr-3"
                        style={{color:'red'}}
                        onClick={()=>this.likepost(e.post_id)}></i>
                        <span style={{color:'#5d5d5d'}}>{e.like.length}</span>
                        </div>
                        <div style={{display:'flex' ,flexDirection:"row", width:'10%',textAlign: 'left', alignItems: 'center', alignContent:'center', paddingRight: '50px'}}>
                            <i class="far fa-eye mr-3" style={{color:'#5d5d5d'}}></i><span style={{color:'#5d5d5d'}}>{e.views}</span>
                    {/* <p>Updated : <Moment date={e.updated}/></p> */}
                    </div>
                    
                    </div>
                </div>

                
                <div className="comment-box">
                    {e.comment && e.comment.map(c => {
                        return [
                            <div className="cmt-box-show">
                                <div className="cmt-box-header">
                                <div className="cmt-box-author"><h9>{c.author}</h9>
                                <p className="p-post-title" style={{fontSize:"0.7rem"}}><Moment fromNow>{e.created}</Moment></p></div>
                                <div>{c.author_id === this.state.user.id ? <><i class="far fa-trash-alt mr-3" style={{fontSize: '0.7rem'}} onClick={()=>this.delcomment(c.comment_id)}></i></>:<></>}</div>
                                </div> 
                                <div className="cmt-text-body"><h9 className='body-cmt-text'>{c.body}</h9></div>
                             
                                
                            </div>
                        ]
                    })}
                    
                </div>
                <div className="container">
                        <div className="cmt-connet-form">
                            <form className="cmt-form"
                                onSubmit={(i, id) => { id = e.post_id
                                    this.handleAddCmt(i, id)}}
                                onChange={e => this.handleChange(e)}
                            >
                                <div className="cmt-input">
                                <input
                                    type="text"
                                    name="body"
                                    className="form-control inputcmt"
                                    placeholder="Enter Body"
                                    rows="5"
                                    autoFocus 
                                    required={true}
                                />
                                {/* <button type="submit" className="btn btn-primary">Comment</button> */}
                                </div>
                                
                            </form>
                        </div>
                    
                </div>
                </div> 
                
                )
                })}
                </> : <div>Loading...</div>} </> : <></>}
                </div>
            </div>
        ]
    }

}

export default Posts