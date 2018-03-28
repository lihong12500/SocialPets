import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {set_user} from 'userAction';
import {add_new_post} from 'postAction';

class Post extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      nameImg: null,
      image: null,
      contentPost: ""
    }
  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'light',
    time: 5000,
    transition: 'scale'
  }
  handlePost(){ var that = this; var {dispatch} = this.props;
    var nameImg = this.state.nameImg;
    var Post = {
      title: null,
      content: this.refs.content.value,
      image: this.state.nameImg,
      userId: this.props.user.id
    };

    if(Post.content.length === 0 && Post.image === null){
      this.msg.show('ERROR: Not enough information to post !! ', {
                            time: 5000,
                            theme: 'light',
                            type: 'error',
                            icon: <img src="/images/error.png" />
      })
    }else{
      if(Post.image){
        var position = nameImg.lastIndexOf(".");
        if(position>0) nameImg = nameImg.substring(0,position);
        io.socket.post('/post/handleImg',{result:this.state.image,name:nameImg}, function(resData, jwres){

              io.socket.post('/post/addPost', Post, function(resData, jwres){
                if(resData.ok){ console.log(Date());
                  that.msg.show('Your post was success <3 Waiting process your image... ', {
                                    time: 5000,
                                    theme: 'light',
                                    type: 'success',
                                    icon: <img src="/images/success.png" />
                  })
                  setTimeout(function(){
                    dispatch(add_new_post(resData.ok));
                  },6000);
                  that.handleCloseImage.bind(that);
                  that.state.contentPost = "";
                  that.setState(that.state);
                }else{
                  that.msg.show('ERROR: Somethings are wrong !! ', {
                                    time: 5000,
                                    theme: 'light',
                                    type: 'error',
                                    icon: <img src="/images/error.png" />
                  })
                }
              })

        })
      }else{
          io.socket.post('/post/addPost', Post, function(resData, jwres){
            if(resData.ok){
              that.msg.show('Your post was success <3 ', {
                                time: 5000,
                                theme: 'light',
                                type: 'success',
                                icon: <img src="/images/success.png" />
              })
              dispatch(add_new_post(resData.ok));
              that.handleCloseImage.bind(that);
              that.state.contentPost = "";
              that.setState(that.state);
            }else{
              that.msg.show('ERROR: Somethings are wrong !! ', {
                                time: 5000,
                                theme: 'light',
                                type: 'error',
                                icon: <img src="/images/error.png" />
              })
            }
          })
      }
    }
  }
  handleCloseImage(){
    this.state.nameImg = null;
    this.state.image = null;
    this.setState(this.state);
  }
  handleChangeImage(event){
    var that = this;
    var typeImage = ['image/gif', 'image/jpeg', 'image/pjpeg', 'image/x-png', 'image/png', 'image/svg+xml'];
    if(event.target.files && event.target.files[0]){ var i = 0;
      typeImage.forEach(function(item){
        if(item === event.target.files[0].type){
          let reader = new FileReader();
          var val = Math.floor(1000 + Math.random() * 9000);
          var nameImg =""+val+"_"+ event.target.files[0].name;
          reader.onload = (e)=>{
            that.setState({image: e.target.result, nameImg: nameImg});
          }
          reader.readAsDataURL(event.target.files[0]);
        }else{ i++;}
      })
      if(i === typeImage.length){
          this.msg.show('ERROR: You can only select image file !! ', {
                            time: 5000,
                            theme: 'light',
                            type: 'error',
                            icon: <img src="/images/error.png" />
          })
      }
    }
  }
  onChangeContentPost(){
    this.state.contentPost = this.refs.content.value;
    this.setState(this.state);
  }
  render(){
    return(
      <div className="create-post">
      <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
          <div className="row">

            <div className="col-md-7 col-sm-7">
              <div className="form-group">
                <img src={"/images/data/"+this.props.user.picture} alt className="profile-photo-md" />

                  <textarea onChange={this.onChangeContentPost.bind(this)} value={this.state.contentPost} ref="content" id="exampleTextarea" cols="40" rows="2" className="form-control" placeholder="Write what you want.."></textarea>

              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <div className="tools" style={{width:"130%"}}>
                <ul className="publishing-tools list-inline">
                  <li>
                      <i className="ion-close-circled" alt="delete photo" onClick={this.handleCloseImage.bind(this)}></i>
                  </li>
                  <li>
                      <i className="ion-images"><input type="file" onChange={this.handleChangeImage.bind(this)}/></i>
                  </li>
                  <li>
                    <img src={""+this.state.image} alt="no photo" className="preview-image-post"/>
                  </li>
                </ul>

                <button onClick={this.handlePost.bind(this)} className="btn btn-primary pull-right"><span className="ion-paper-airplane pull-left"></span>Post</button>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(Post);