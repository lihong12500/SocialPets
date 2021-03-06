import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {set_user, open_popup_user,get_post_err,get_postNewsfeed} from 'userAction';
import {withRouter} from 'react-router-dom';
import BasicInformation from 'BasicInformation';
import ChangePass from 'ChangePass';
import ListPet from 'ListPet';
import ListHistoryUser from 'ListHistoryUser';

class Information extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    if(this.props.type==="person"){
      return(
        <div id="page-contents">
          <div className="row">
            <div className="col-md-3">

              {/* Edit Profile Menu */}
              <ul className="edit-menu">
                <li className="active"><i className="icon ion-ios-information-outline"></i><a data-toggle="tab" href="#BasicInformation">Basic Information</a></li>
                <li ><i className="icon ion-social-github"></i><a data-toggle="tab" href="#PetInformation">Pet Information</a></li>
              </ul>
            </div>

            <div className="tab-content">
              <div id="BasicInformation" className="tab-pane fade in active" style={{color:"#6d6e71"}}>
                  <BasicInformation  type={this.props.type}/>
              </div>
              <div id="PetInformation" className="tab-pane fade" style={{color:"#6d6e71"}}>
                  <ListPet type={this.props.type} />
              </div>
            </div>

          </div>
        </div>
      )
    }else{
      return(
        <div id="page-contents">
              <div className="row">
                <div className="col-md-3">

                  {/* Edit Profile Menu */}
                  <ul className="edit-menu">
                    <li className="active"><i className="icon ion-ios-information-outline"></i><a data-toggle="tab" href="#BasicInformation">Basic Information</a></li>
                    <li ><i className="icon ion-social-github"></i><a data-toggle="tab" href="#PetInformation">Pet Information</a></li>
                    <li ><i className="icon ion-ios-settings"></i><a data-toggle="tab" href="#AccountSettings">History User</a></li>
                    <li ><i className="icon ion-ios-locked"></i><a data-toggle="tab" href="#ChangePassword">Change Password</a></li>
                  </ul>
                </div>

                <div className="tab-content">
                  <div id="BasicInformation" className="tab-pane fade in active" style={{color:"#6d6e71"}}>
                      <BasicInformation />
                  </div>
                  <div id="PetInformation" className="tab-pane fade" style={{color:"#6d6e71"}}>
                      <ListPet />
                  </div>
                  <div id="AccountSettings" className="tab-pane fade" style={{color:"#6d6e71"}}>
                      <ListHistoryUser />
                  </div>
                  <div id="ChangePassword" className="tab-pane fade" style={{color:"#6d6e71"}}>
                      <ChangePass />
                  </div>
                </div>

              </div>
            </div>
      )
    }

  }
}

module.exports = withRouter(connect( function(state){
  return {user: state.userReducer.user};
})(Information));
