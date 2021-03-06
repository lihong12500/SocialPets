import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {Modal,Button} from 'react-bootstrap';
import {change_loading,close_popup_change_picture,change_picture} from 'userAction';

class PopupChangePicture extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      newPicture : false,
      image: "",
      nameImg:""
    }
  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'light',
    time: 1000,
    transition: 'scale'
  }
  close(){
    var {dispatch} = this.props;
    dispatch(close_popup_change_picture());
    this.setState({newPicture: false,image: ""});
  }
  handleChangeImage(event){
    var that = this;
    var typeImage = ['image/gif', 'image/jpeg', 'image/pjpeg', 'image/x-png', 'image/png', 'image/svg+xml'];
    if(event.target.files && event.target.files[0]){
      var i = 0;
      typeImage.forEach(function(item){
        if(item === event.target.files[0].type){
          let reader = new FileReader();
          var val = Math.floor(1000 + Math.random() * 9000);
          var nameImg =""+val+"_"+ event.target.files[0].name;
          reader.onload = (e)=>{
            that.setState({newPicture: true,image: e.target.result, nameImg: nameImg});
          }
          reader.readAsDataURL(event.target.files[0]);
        }else{ i++;}
      })
      if(i === typeImage.length){
          this.msg.show('ERROR: You can only select image file !! ', {
                            type: 'error',
                            icon: <img src="/images/error.png" />
          })
      }
    }
  }
  savePicture(){
    let {dispatch} = this.props;
      dispatch(change_loading(true));
    let that = this;
    let {nameImg} = this.state;
    if(this.state.newPicture){
        // remove .jpg.jpg before save in folder
        var position = nameImg.lastIndexOf(".");
        if(position>0) nameImg = nameImg.substring(0,position);
        io.socket.post('/post/handleImg',{result:this.state.image,name:nameImg}, function(resData, jwres){
          if(!resData.err && resData.link){
            // if Type of Popup is picture, it's mean that will change User's Picture
            if(that.props.type === "picture"){
              io.socket.post('/user/changePicture', {link: resData.link, id: that.props.user.id}, function(resData, jwres){
                dispatch(change_loading(false));
                if(resData.ok){
                  var user = resData.ok[0];
                  that.msg.show('Your picture was change success <3 Waiting process your image... ', {
                                    type: 'success',
                                    icon: <img src="/images/success.png" />
                  })

                    dispatch(change_picture(user));
                    dispatch(close_popup_change_picture());

                }else{
                  that.msg.show('ERROR: Somethings are wrong !! ', {
                                    type: 'error',
                                    icon: <img src="/images/error.png" />
                  })
                }
              })
            }else{  // else change User's Cover
              io.socket.post('/user/changeCover', {link: resData.link, id: that.props.user.id}, function(resData, jwres){
                dispatch(change_loading(false));
                if(resData.ok){
                  var user = resData.ok[0];
                  that.msg.show('Your cover was change success <3 Waiting process your image... ', {
                                    type: 'success',
                                    icon: <img src="/images/success.png" />
                  })

                    dispatch(change_picture(user));
                    dispatch(close_popup_change_picture());

                }else{
                  that.msg.show('ERROR: Somethings are wrong !! ', {
                                    type: 'error',
                                    icon: <img src="/images/error.png" />
                  })
                }
              })
            }
          }else{
            dispatch(change_loading(false));
            that.msg.show('ERROR: '+resData.err, {
                                        type: 'error',
                                        icon: <img src="/images/error.png" />
            })
          }
        })
      }else{
        dispatch(change_loading(false));
        that.msg.show('Nothing change !! ', {
                                    type: 'warning',
                                    icon: <img src="/images/error.png" />
        })
      }
  }
  renderPicture(){
    let that = this;
    if(!this.state.newPicture){
      if(this.props.type==="picture"){
        return(
               <img src={that.props.user.picture} alt="" className="img-responsive post-image" />
               )
      }else{
        return(
               <img src={that.props.user.cover} alt="" className="img-responsive post-image" />
               )
      }
    }else{
      return(
              <img src={that.state.image} alt="" className="img-responsive post-image" />
             )
    }
  }
  render(){
    let that = this;
    var renderPicture = this.state.newPicture===false ? <img src={that.props.user.picture} alt="" className="img-responsive post-image" /> : <img src={""+that.state.image} alt="" className="img-responsive post-image" />;
    return(
      <div className="popup-form">
      <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
          <Modal bsSize="sm" show={this.props.showPopupChangePicture} onHide={this.close}>
            <div className="modal-content">
              <div className="post-content">

                {this.renderPicture()}

              </div>
            </div>
              <Modal.Footer>
                <ul className="publishing-tools list-inline">
                  <li>
                      <i className="ion-images">Select picture<input type="file" style={{maxWidth:"100%", minHeight:"80%"}} onChange={this.handleChangeImage.bind(this)}/></i>
                  </li>
                </ul>
                <button id="changeImg" className="btnS btn-success" onClick={this.savePicture.bind(this)}>
                  <span className="ion-checkmark-circled pull-left"></span>Change Picture
                </button>
                <button id="closeChangeImg" className="btnS btn-warning" onClick={this.close.bind(this)}><span className="ion-close-circled pull-left"></span>Tho??t</button>
              </Modal.Footer>
          </Modal>
      </div>
    )
  }
}

module.exports = connect(function(state){
    return{showPopupChangePicture: state.userReducer.showPopupChangePicture, user: state.userReducer.user};
})(PopupChangePicture);
