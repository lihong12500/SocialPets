import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import validateInfoUser from 'validateInfoUser';
import {set_user} from 'userAction';

class BasicInformation extends React.Component{
  constructor(props){
    super(props);
    this.checkChange = this.checkChange.bind(this);
  }
  componentWillReceiveProps(nextProps){

  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'light',
    time: 3000,
    transition: 'scale'
  }
  checkChange(new_user){
    if((new_user.name == this.props.user.name) && (new_user.phone == this.props.user.phone) && (new_user.day_date == this.props.user.day_date)
      && (new_user.month_date == this.props.user.month_date)&& (new_user.year_date == this.props.user.year_date)&& (new_user.gender == this.props.user.gender)
      && (new_user.address == this.props.user.address)&& (new_user.country == this.props.user.country)&& (new_user.petlove == this.props.user.petlove)
      && (new_user.description == this.props.user.description)&& (new_user.job == this.props.user.job)&& (new_user.university == this.props.user.university)
    ){
      return false;
    }else{
      return true;
    }
  }
  handleUpdate(event){
    var that = this;
    let {dispatch} = this.props;
    event.preventDefault();
    var d = new Date();
    var age = d.getFullYear() - parseInt(this.refs.year.value);
    var date = ""+this.refs.month.value+" "+this.refs.day.value+" "+this.refs.year.value;
    var sex = ""+this.refs.gender.value;
    var Obj = {
        name: this.refs.name.value,
        phone: this.refs.phone.value,
        day_date: this.refs.day.value,
        month_date: this.refs.month.value,
        year_date: this.refs.year.value,
        age_range: ""+age,
        gender: sex,
        address: this.refs.address.value,
        country: this.refs.country.value,
        petlove: this.refs.petlove.value,
        description: this.refs.description.value,
        job: this.refs.job.value,
        university : this.refs.university.value,
    };
    if(this.checkChange(Obj) === true){
      io.socket.post('/user/updateInfo',{Obj, userId:this.props.user.id}, function(resData, jwres){
          if(resData.error){
              var errors = resData.invalidAttributes;
              validateInfoUser(errors, function(errContent){
                  if(errContent.length != 0){
                      errContent.map(function(i,index){
                          that.msg.show('ERROR: '+errContent[index], {
                            type: 'error',
                            icon: <img src="/images/error.png" />
                          })
                      })
                  }
              })
          }else{
                      that.msg.show('SUCCESS: You updated success', {
                            type: 'success',
                            icon: <img src="/images/success.png" />
                      })
                      dispatch(set_user(resData.user));
          }
      })
    }else{
      that.msg.show('Kh??ng c?? s??? thay ?????i ', {
        type: 'warning',
        icon: <img src="/images/error.png" />
      })
    }

  }
  render(){
    let renderBtnSave = this.props.type==="person"?null:<button className="btn btn-primary" onClick={this.handleUpdate.bind(this)}>Save Changes</button>;
    let userInfo = this.props.type==="person"?this.props.person:this.props.user;
    return(
                  <div className="col-md-7">
                  <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                      <div className="edit-profile-container">
                        <div className="block-title">
                          <h4 className="grey"><i className="icon ion-android-checkmark-circle"></i>Edit basic information</h4>
                          <div className="line"></div>
                        </div>
                        <div className="edit-block">
                          <form name="basic-info" id="basic-info" className="form-inline">
                            <div className="row">
                              <div className="form-group col-xs-6">
                                <label htmlFor="firstname">Name</label>
                                <input className="form-control input-group-lg" type="text" ref="name" title="Enter name" placeholder="Your name" defaultValue={userInfo.name} />
                              </div>
                              <div className="form-group col-xs-6">
                                <label htmlFor="lastname" className="">Phone number</label>
                                <input className="form-control input-group-lg" type="text" ref="phone" title="Enter phone" placeholder="Phone number" defaultValue={userInfo.phone} />
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-xs-6">
                                <label htmlFor="email">My email</label>
                                <input className="form-control input-group-lg" type="text" title="Enter Email" placeholder="My Email" readOnly value={userInfo.email} />
                              </div>
                              <div className="form-group col-xs-6">
                                <label htmlFor="email">Pet love</label>
                                <input className="form-control input-group-lg" type="text" ref="petlove" title="Enter pet" placeholder="pet you love" defaultValue={userInfo.petlove} />
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-xs-6">
                                <label htmlFor="email">Yout Job</label>
                                <input className="form-control input-group-lg" type="text" ref="job" title="Enter job" placeholder="My job" defaultValue={userInfo.job} />
                              </div>
                              <div className="form-group col-xs-6">
                                <label htmlFor="email">University</label>
                                <input className="form-control input-group-lg" type="text" ref="university" title="Enter pet" placeholder="Your university" defaultValue={userInfo.university} />
                              </div>
                            </div>
                            <div className="row">
                              <p className="custom-label"><strong>Date of Birth</strong></p>
                              <div className="form-group col-sm-3 col-xs-6">
                                <label htmlFor="month" className="sr-only"></label>
                                <select defaultValue={userInfo.day_date} ref="day" className="form-control">
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                  <option>6</option>
                                  <option>7</option>
                                  <option>8</option>
                                  <option>9</option>
                                  <option>10</option>
                                  <option>11</option>
                                  <option>12</option>
                                  <option>13</option>
                                  <option>14</option>
                                  <option>15</option>
                                  <option>16</option>
                                  <option>17</option>
                                  <option>18</option>
                                  <option>19</option>
                                  <option>20</option>
                                  <option>21</option>
                                  <option>22</option>
                                  <option>23</option>
                                  <option>24</option>
                                  <option>25</option>
                                  <option>26</option>
                                  <option>27</option>
                                  <option>28</option>
                                  <option>29</option>
                                  <option>30</option>
                                  <option>31</option>
                                </select>
                              </div>
                              <div className="form-group col-sm-3 col-xs-6">
                                <label htmlFor="month" className="sr-only"></label>
                                <select defaultValue={userInfo.month_date} ref="month"  className="form-control">
                                  <option>Jan</option>
                                  <option>Feb</option>
                                  <option>Mar</option>
                                  <option>Apr</option>
                                  <option>May</option>
                                  <option>Jun</option>
                                  <option>Jul</option>
                                  <option>Aug</option>
                                  <option>Sep</option>
                                  <option>Oct</option>
                                  <option>Nov</option>
                                  <option>Dec</option>
                                </select>
                              </div>
                              <div className="form-group col-sm-6 col-xs-12">
                                <label htmlFor="year" className="sr-only"></label>
                                <select defaultValue={userInfo.year_date} ref="year" className="form-control">
                                  <option>1985</option>
                                  <option>1986</option>
                                  <option>1987</option>
                                  <option>1988</option>
                                  <option>1989</option>
                                  <option>1990</option>
                                  <option>1991</option>
                                  <option>1992</option>
                                  <option>1993</option>
                                  <option>1994</option>
                                  <option>1995</option>
                                  <option>1996</option>
                                  <option>1997</option>
                                  <option>1998</option>
                                  <option>1999</option>
                                  <option>2000</option>
                                  <option>2001</option>
                                  <option>2002</option>
                                  <option>2004</option>
                                  <option>2005</option>
                                  <option>2006</option>
                                  <option>2007</option>
                                  <option>2008</option>
                                  <option>2009</option>
                                  <option>2010</option>
                                  <option>2011</option>
                                  <option>2012</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-group gender">
                              <span className="custom-label"><strong>I am a: </strong></span>
                              <select defaultValue={userInfo.gender} ref="gender"  className="form-control" >
                                <option>Female</option>
                                <option>Male</option>
                              </select>
                            </div>
                            <div className="row">
                              <div className="form-group col-xs-6">
                                <label htmlFor="city">Address</label>
                                <input ref="address" className="form-control input-group-lg" type="text"title="Enter address" placeholder="Your address" defaultValue={userInfo.address}/>
                              </div>
                              <div className="form-group col-xs-6">
                                <label htmlFor="country">My country</label>
                                <select defaultValue={userInfo.country} ref="country"  className="form-control">
                                  <option defaultValue="AFG">Afghanistan</option>
                                  <option defaultValue="ALA">Bland Islands</option>
                                  <option defaultValue="ALB">Albania</option>
                                  <option defaultValue="DZA">Algeria</option>
                                  <option defaultValue="ASM">American Samoa</option>
                                  <option defaultValue="AND">Andorra</option>
                                  <option defaultValue="AGO">Angola</option>
                                  <option defaultValue="AIA">Anguilla</option>
                                  <option defaultValue="ATA">Antarctica</option>
                                  <option defaultValue="ATG">Antigua and Barbuda</option>
                                  <option defaultValue="ARG">Argentina</option>
                                  <option defaultValue="ARM">Armenia</option>
                                  <option defaultValue="ABW">Aruba</option>
                                  <option defaultValue="AUS">Australia</option>
                                  <option defaultValue="AUT">Austria</option>
                                  <option defaultValue="AZE">Azerbaijan</option>
                                  <option defaultValue="BHS">Bahamas</option>
                                  <option defaultValue="BHR">Bahrain</option>
                                  <option defaultValue="BGD">Bangladesh</option>
                                  <option defaultValue="BRB">Barbados</option>
                                  <option defaultValue="BLR">Belarus</option>
                                  <option defaultValue="BEL">Belgium</option>
                                  <option defaultValue="BLZ">Belize</option>
                                  <option defaultValue="BEN">Benin</option>
                                  <option defaultValue="BMU">Bermuda</option>
                                  <option defaultValue="BTN">Bhutan</option>
                                  <option defaultValue="BOL">Bolivia, Plurinational State of</option>
                                  <option defaultValue="BES">Bonaire, Sint Eustatius and Saba</option>
                                  <option defaultValue="BIH">Bosnia and Herzegovina</option>
                                  <option defaultValue="BWA">Botswana</option>
                                  <option defaultValue="BVT">Bouvet Island</option>
                                  <option defaultValue="BRA">Brazil</option>
                                  <option defaultValue="IOT">British Indian Ocean Territory</option>
                                  <option defaultValue="BRN">Brunei Darussalam</option>
                                  <option defaultValue="BGR">Bulgaria</option>
                                  <option defaultValue="BFA">Burkina Faso</option>
                                  <option defaultValue="BDI">Burundi</option>
                                  <option defaultValue="KHM">Cambodia</option>
                                  <option defaultValue="CMR">Cameroon</option>
                                  <option defaultValue="CAN">Canada</option>
                                  <option defaultValue="CPV">Cape Verde</option>
                                  <option defaultValue="CYM">Cayman Islands</option>
                                  <option defaultValue="CAF">Central African Republic</option>
                                  <option defaultValue="TCD">Chad</option>
                                  <option defaultValue="CHL">Chile</option>
                                  <option defaultValue="CHN">China</option>
                                  <option defaultValue="CXR">Christmas Island</option>
                                  <option defaultValue="CCK">Cocos (Keeling) Islands</option>
                                  <option defaultValue="COL">Colombia</option>
                                  <option defaultValue="COM">Comoros</option>
                                  <option defaultValue="COG">Congo</option>
                                  <option defaultValue="COD">Congo, the Democratic Republic of the</option>
                                  <option defaultValue="COK">Cook Islands</option>
                                  <option defaultValue="CRI">Costa Rica</option>
                                  <option defaultValue="CIV">C???te dIvoire</option>
                                  <option defaultValue="HRV">Croatia</option>
                                  <option defaultValue="CUB">Cuba</option>
                                  <option defaultValue="CUW">Cura???ao</option>
                                  <option defaultValue="CYP">Cyprus</option>
                                  <option defaultValue="CZE">Czech Republic</option>
                                  <option defaultValue="DNK">Denmark</option>
                                  <option defaultValue="DJI">Djibouti</option>
                                  <option defaultValue="DMA">Dominica</option>
                                  <option defaultValue="DOM">Dominican Republic</option>
                                  <option defaultValue="ECU">Ecuador</option>
                                  <option defaultValue="EGY">Egypt</option>
                                  <option defaultValue="SLV">El Salvador</option>
                                  <option defaultValue="GNQ">Equatorial Guinea</option>
                                  <option defaultValue="ERI">Eritrea</option>
                                  <option defaultValue="EST">Estonia</option>
                                  <option defaultValue="ETH">Ethiopia</option>
                                  <option defaultValue="FLK">Falkland Islands (Malvinas)</option>
                                  <option defaultValue="FRO">Faroe Islands</option>
                                  <option defaultValue="FJI">Fiji</option>
                                  <option defaultValue="FIN">Finland</option>
                                  <option defaultValue="FRA">France</option>
                                  <option defaultValue="GUF">French Guiana</option>
                                  <option defaultValue="PYF">French Polynesia</option>
                                  <option defaultValue="ATF">French Southern Territories</option>
                                  <option defaultValue="GAB">Gabon</option>
                                  <option defaultValue="GMB">Gambia</option>
                                  <option defaultValue="GEO">Georgia</option>
                                  <option defaultValue="DEU">Germany</option>
                                  <option defaultValue="GHA">Ghana</option>
                                  <option defaultValue="GIB">Gibraltar</option>
                                  <option defaultValue="GRC">Greece</option>
                                  <option defaultValue="GRL">Greenland</option>
                                  <option defaultValue="GRD">Grenada</option>
                                  <option defaultValue="GLP">Guadeloupe</option>
                                  <option defaultValue="GUM">Guam</option>
                                  <option defaultValue="GTM">Guatemala</option>
                                  <option defaultValue="GGY">Guernsey</option>
                                  <option defaultValue="GIN">Guinea</option>
                                  <option defaultValue="GNB">Guinea-Bissau</option>
                                  <option defaultValue="GUY">Guyana</option>
                                  <option defaultValue="HTI">Haiti</option>
                                  <option defaultValue="HMD">Heard Island and McDonald Islands</option>
                                  <option defaultValue="VAT">Holy See (Vatican City State)</option>
                                  <option defaultValue="HND">Honduras</option>
                                  <option defaultValue="HKG">Hong Kong</option>
                                  <option defaultValue="HUN">Hungary</option>
                                  <option defaultValue="ISL">Iceland</option>
                                  <option defaultValue="IND">India</option>
                                  <option defaultValue="IDN">Indonesia</option>
                                  <option defaultValue="IRN">Iran, Islamic Republic of</option>
                                  <option defaultValue="IRQ">Iraq</option>
                                  <option defaultValue="IRL">Ireland</option>
                                  <option defaultValue="IMN">Isle of Man</option>
                                  <option defaultValue="ISR">Israel</option>
                                  <option defaultValue="ITA">Italy</option>
                                  <option defaultValue="JAM">Jamaica</option>
                                  <option defaultValue="JPN">Japan</option>
                                  <option defaultValue="JEY">Jersey</option>
                                  <option defaultValue="JOR">Jordan</option>
                                  <option defaultValue="KAZ">Kazakhstan</option>
                                  <option defaultValue="KEN">Kenya</option>
                                  <option defaultValue="KIR">Kiribati</option>
                                  <option defaultValue="PRK">Korea, Democratic People s Republic of</option>
                                  <option defaultValue="KOR">Korea, Republic of</option>
                                  <option defaultValue="KWT">Kuwait</option>
                                  <option defaultValue="KGZ">Kyrgyzstan</option>
                                  <option defaultValue="LAO">Lao People is Democratic Republic</option>
                                  <option defaultValue="LVA">Latvia</option>
                                  <option defaultValue="LBN">Lebanon</option>
                                  <option defaultValue="LSO">Lesotho</option>
                                  <option defaultValue="LBR">Liberia</option>
                                  <option defaultValue="LBY">Libya</option>
                                  <option defaultValue="LIE">Liechtenstein</option>
                                  <option defaultValue="LTU">Lithuania</option>
                                  <option defaultValue="LUX">Luxembourg</option>
                                  <option defaultValue="MAC">Macao</option>
                                  <option defaultValue="MKD">Macedonia, the former Yugoslav Republic of</option>
                                  <option defaultValue="MDG">Madagascar</option>
                                  <option defaultValue="MWI">Malawi</option>
                                  <option defaultValue="MYS">Malaysia</option>
                                  <option defaultValue="MDV">Maldives</option>
                                  <option defaultValue="MLI">Mali</option>
                                  <option defaultValue="MLT">Malta</option>
                                  <option defaultValue="MHL">Marshall Islands</option>
                                  <option defaultValue="MTQ">Martinique</option>
                                  <option defaultValue="MRT">Mauritania</option>
                                  <option defaultValue="MUS">Mauritius</option>
                                  <option defaultValue="MYT">Mayotte</option>
                                  <option defaultValue="MEX">Mexico</option>
                                  <option defaultValue="FSM">Micronesia, Federated States of</option>
                                  <option defaultValue="MDA">Moldova, Republic of</option>
                                  <option defaultValue="MCO">Monaco</option>
                                  <option defaultValue="MNG">Mongolia</option>
                                  <option defaultValue="MNE">Montenegro</option>
                                  <option defaultValue="MSR">Montserrat</option>
                                  <option defaultValue="MAR">Morocco</option>
                                  <option defaultValue="MOZ">Mozambique</option>
                                  <option defaultValue="MMR">Myanmar</option>
                                  <option defaultValue="NAM">Namibia</option>
                                  <option defaultValue="NRU">Nauru</option>
                                  <option defaultValue="NPL">Nepal</option>
                                  <option defaultValue="NLD">Netherlands</option>
                                  <option defaultValue="NCL">New Caledonia</option>
                                  <option defaultValue="NZL">New Zealand</option>
                                  <option defaultValue="NIC">Nicaragua</option>
                                  <option defaultValue="NER">Niger</option>
                                  <option defaultValue="NGA">Nigeria</option>
                                  <option defaultValue="NIU">Niue</option>
                                  <option defaultValue="NFK">Norfolk Island</option>
                                  <option defaultValue="MNP">Northern Mariana Islands</option>
                                  <option defaultValue="NOR">Norway</option>
                                  <option defaultValue="OMN">Oman</option>
                                  <option defaultValue="PAK">Pakistan</option>
                                  <option defaultValue="PLW">Palau</option>
                                  <option defaultValue="PSE">Palestinian Territory, Occupied</option>
                                  <option defaultValue="PAN">Panama</option>
                                  <option defaultValue="PNG">Papua New Guinea</option>
                                  <option defaultValue="PRY">Paraguay</option>
                                  <option defaultValue="PER">Peru</option>
                                  <option defaultValue="PHL">Philippines</option>
                                  <option defaultValue="PCN">Pitcairn</option>
                                  <option defaultValue="POL">Poland</option>
                                  <option defaultValue="PRT">Portugal</option>
                                  <option defaultValue="PRI">Puerto Rico</option>
                                  <option defaultValue="QAT">Qatar</option>
                                  <option defaultValue="REU">R???union</option>
                                  <option defaultValue="ROU">Romania</option>
                                  <option defaultValue="RUS">Russian Federation</option>
                                  <option defaultValue="RWA">Rwanda</option>
                                  <option defaultValue="BLM">Saint Barth???lemy</option>
                                  <option defaultValue="SHN">Saint Helena, Ascension and Tristan da Cunha</option>
                                  <option defaultValue="KNA">Saint Kitts and Nevis</option>
                                  <option defaultValue="LCA">Saint Lucia</option>
                                  <option defaultValue="MAF">Saint Martin (French part)</option>
                                  <option defaultValue="SPM">Saint Pierre and Miquelon</option>
                                  <option defaultValue="VCT">Saint Vincent and the Grenadines</option>
                                  <option defaultValue="WSM">Samoa</option>
                                  <option defaultValue="SMR">San Marino</option>
                                  <option defaultValue="STP">Sao Tome and Principe</option>
                                  <option defaultValue="SAU">Saudi Arabia</option>
                                  <option defaultValue="SEN">Senegal</option>
                                  <option defaultValue="SRB">Serbia</option>
                                  <option defaultValue="SYC">Seychelles</option>
                                  <option defaultValue="SLE">Sierra Leone</option>
                                  <option defaultValue="SGP">Singapore</option>
                                  <option defaultValue="SXM">Sint Maarten (Dutch part)</option>
                                  <option defaultValue="SVK">Slovakia</option>
                                  <option defaultValue="SVN">Slovenia</option>
                                  <option defaultValue="SLB">Solomon Islands</option>
                                  <option defaultValue="SOM">Somalia</option>
                                  <option defaultValue="ZAF">South Africa</option>
                                  <option defaultValue="SGS">South Georgia and the South Sandwich Islands</option>
                                  <option defaultValue="SSD">South Sudan</option>
                                  <option defaultValue="ESP">Spain</option>
                                  <option defaultValue="LKA">Sri Lanka</option>
                                  <option defaultValue="SDN">Sudan</option>
                                  <option defaultValue="SUR">Suriname</option>
                                  <option defaultValue="SJM">Svalbard and Jan Mayen</option>
                                  <option defaultValue="SWZ">Swaziland</option>
                                  <option defaultValue="SWE">Sweden</option>
                                  <option defaultValue="CHE">Switzerland</option>
                                  <option defaultValue="SYR">Syrian Arab Republic</option>
                                  <option defaultValue="TWN">Taiwan, Province of China</option>
                                  <option defaultValue="TJK">Tajikistan</option>
                                  <option defaultValue="TZA">Tanzania, United Republic of</option>
                                  <option defaultValue="THA">Thailand</option>
                                  <option defaultValue="TLS">Timor-Leste</option>
                                  <option defaultValue="TGO">Togo</option>
                                  <option defaultValue="TKL">Tokelau</option>
                                  <option defaultValue="TON">Tonga</option>
                                  <option defaultValue="TTO">Trinidad and Tobago</option>
                                  <option defaultValue="TUN">Tunisia</option>
                                  <option defaultValue="TUR">Turkey</option>
                                  <option defaultValue="TKM">Turkmenistan</option>
                                  <option defaultValue="TCA">Turks and Caicos Islands</option>
                                  <option defaultValue="TUV">Tuvalu</option>
                                  <option defaultValue="UGA">Uganda</option>
                                  <option defaultValue="UKR">Ukraine</option>
                                  <option defaultValue="ARE">United Arab Emirates</option>
                                  <option defaultValue="GBR">United Kingdom</option>
                                  <option defaultValue="USA">United States</option>
                                  <option defaultValue="UMI">United States Minor Outlying Islands</option>
                                  <option defaultValue="URY">Uruguay</option>
                                  <option defaultValue="UZB">Uzbekistan</option>
                                  <option defaultValue="VUT">Vanuatu</option>
                                  <option defaultValue="VEN">Venezuela, Bolivarian Republic of</option>
                                  <option defaultValue="VNM">Viet Nam</option>
                                  <option defaultValue="VGB">Virgin Islands, British</option>
                                  <option defaultValue="VIR">Virgin Islands, U.S.</option>
                                  <option defaultValue="WLF">Wallis and Futuna</option>
                                  <option defaultValue="ESH">Western Sahara</option>
                                  <option defaultValue="YEM">Yemen</option>
                                  <option defaultValue="ZMB">Zambia</option>
                                  <option defaultValue="ZWE">Zimbabwe</option>
                                </select>
                              </div>
                            </div>
                            <div className="row">
                              <div className="form-group col-xs-12">
                                <label htmlFor="my-info">About me</label>
                                <textarea ref="description" defaultValue={userInfo.description} className="form-control" placeholder="Some texts about me" rows="4" cols="400"></textarea>
                              </div>
                            </div>
                            {renderBtnSave}
                          </form>
                        </div>
                      </div>
                </div>
    )
  }
}
module.exports = (connect( function(state){
  return {user: state.userReducer.user, person: state.userReducer.person};
})(BasicInformation));
