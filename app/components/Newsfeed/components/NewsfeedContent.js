import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {set_user} from 'userAction';
import Comment from 'Comment';
import {Link} from 'react-router-dom';
import time from 'time-ago';

class NewsfeedContent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      react : this.props.data.count||this.props.data.react.length,
      isReact : false,
      listComment : [],
      isActive : this.props.data.isActive
    }
  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 2000,
    transition: 'scale'
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.data){
      let postId = nextProps.data.id;
      this.getListComment(postId);
      let userId = this.props.user.id;
      let arrUser = nextProps.data.react;
      this.state.react = nextProps.data.count||nextProps.data.react.length;
      this.state.isReact = false;
      arrUser.map( (value, key)=>{
        if(userId === value.userId){
          this.state.isReact = true;
        }
      })
      this.setState(this.state);
    }
  }
  componentDidMount(){
    let postId = this.props.data.id;
    this.getListComment(postId);
  }
  getListComment(postId){

    io.socket.post('/comment/getListComment',{postId},(resData, jwres)=>{
      if(resData.err){
        this.msg.show('ERROR: '+resData.err, {
                          type: 'error',
                          icon: <img src="/images/error.png" />
        })
      }
      if(resData.listComment){
        this.state.listComment = (resData.listComment);
        this.setState(this.state);
      }
    })
  }
  handleType(event){
    var k = event.keyCode;
    if(k == 13){
      let content = this.refs.content.value;
      if(content.length === 0) return;
      if(content.length >= 999) return;
      let userId = this.props.user.id;
      let postId = this.props.data.id;
      let related_userId = this.props.owner.id;
      io.socket.post('/comment/addComment',{userId,postId,content,related_userId},(resData, jwres)=>{
        if(resData.err){
          this.msg.show('ERROR: '+resData.err, {
                            type: 'error',
                            icon: <img src="/images/error.png" />
          })
        }
        if(resData.comment){
          this.state.listComment.push(resData.comment);
          this.setState(this.state);
          this.refs.content.value = "";
        }
      })
    }
  }
  componentWillMount(){
      let userId = this.props.user.id;
      let arrUser = this.props.data.react;
      arrUser.map( (value, key)=>{
        if(userId === value.userId){
          this.state.isReact = true; this.setState(this.state);
        }
      })
  }

  renderBtnReact(){
    if(this.state.isReact === true){
      return (<a onClick={this.react.bind(this)} className="btn text-green pull-left"><i className="ion-ios-heart"></i>{this.state.react}</a>)
    }else{
      return (<a onClick={this.react.bind(this)} className="btn text-red pull-left"><i className="ion-ios-heart"></i>{this.state.react}</a>)
    }
  }
  react(){
    let userId = this.props.user.id;
    let postId = this.props.data.id;
    let related_userId = this.props.data.userId.id;
    if(!!!userId || !!!postId|| !!!related_userId){
          this.msg.show('ERROR: Kh??ng c?? ????? id ', {
                            type: 'error',
                            icon: <img src="/images/error.png" />
          })
          return;
        }
    io.socket.post('/react/addReact',{userId, postId, related_userId},(resData, jwres)=>{
      if(resData.err){
        alert(resData.err);
      }
      if(resData.react){
        this.state.react ++; this.state.isReact = true;
        this.setState(this.state);
      }
      if(resData.ok){
        this.state.react --; this.state.isReact = false;
        this.setState(this.state);
      }
    })
  }
  activePost(){
    io.socket.post('/post/activePost',{id:this.props.data.id},(resData, jwres)=>{
      if(resData.ok){
          this.setState({isActive: true});
      }else if(resData.err){
        console.log("ERR: activePost")
      }
    })
  }
  blockPost(){
    io.socket.post('/post/blockPost',{id:this.props.data.id},(resData, jwres)=>{
      if(resData.ok){
          this.setState({isActive: false});
      }else if(resData.err){
        console.log("ERR: blockPost")
      }
    })
  }
  renderOption(){
    let userId = this.props.user.id;
    let userIdP = this.props.owner.id;
    if( (userId === userIdP) || this.props.user.isAdmin === true ){
      if(this.state.isActive === true){
        return <i style={{cursor:"pointer"}} title="hidden post" onClick={this.blockPost.bind(this)} className="icon ion-ios-close text-red"></i>
      }else{
        return <i style={{cursor:"pointer"}} title="show post" onClick={this.activePost.bind(this)} className="icon ion-ios-checkmark"></i>
      }
    }else{
      return null;
    }
  }
  render(){
    var date = new Date(this.props.data.createdAt);
    let timeMsg = date.getTime();
    let renderTime = time.ago(new Date()-(new Date()-timeMsg));
    let renderBtnReact = this.renderBtnReact();
    let renderOption = this.renderOption();

    return(
      <div className="post-content">
      <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <div className="post-container">
          <Link to={"/user/"+this.props.owner.email} ><img src={this.props.owner.picture} className="profile-photo-md pull-left" alt="" /></Link>
          <div className="post-detail">

                  <div className="user-info">
                    <h5>
                      <Link to={"/user/"+this.props.owner.email} className="profile-link" >{this.props.owner.name}</Link>
                      <span className="following">{renderTime}</span>
                      <span className="following pull-right">{renderOption}</span>
                    </h5>
                  </div>
                  <div className="post-text">
                    <p>{this.props.data.content}<i className="em em-anguished"></i> <i className="em em-anguished"></i> <i className="em em-anguished"></i></p>
                  </div>
                  <div className="line-divider"></div>
                  <img src={this.props.data.image} alt="" className="img-responsive post-image"/>

                  <div className="">
                    {renderBtnReact}
                    <a className="btn text-violet"><i className="icon ion-chatbox"></i>{this.props.data.comments.length}</a>
                    <Link to={"/post/"+this.props.data.id} >
                    <a className="btn"><i className="icon ion-navigate"></i>See post</a>
                    </Link>
                    <p className="text-muted pull-right">Published at time: {this.props.data.createdAt}</p>
                  </div>
                  <div className="line-divider"></div>

                  {this.state.listComment.map( (value, key)=>{
                    if(this.props.type === "all")
                      return (
                        <Comment key={key} data={value} />
                      )
                    else if(key>=this.state.listComment.length-2)
                      return (
                        <Comment key={key} data={value} />
                      )
                  })}

                  <div className="post-comment">
                    <img src={this.props.user.picture} alt="" className="profile-photo-sm" />
                    <input type="text" ref="content" className="form-control" onKeyUp={this.handleType.bind(this)} placeholder="Post a comment"/>
                  </div>


          </div>
        </div>
      </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(NewsfeedContent);
