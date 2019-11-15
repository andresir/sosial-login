import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {
    clienID,
    secretKey,
    callBackUrl,
    accessTokenRoute,
    userDetailsRoute
  } from './config';
  
  import LinkedinLogo from '../images/linkedin-logo.png';

class HomeBertasbih extends Component {
// COMPONENT FOR LINKEDIN LOGIN ======================================
    constructor(props) {
      super(props);
      this.winUrl =`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clienID}&scope=r_emailaddress,r_liteprofile&redirect_uri=${callBackUrl}&state=98765EeFWf45A53sdfKef4233`
  
      this.linkedinRequest = this.linkedinRequest.bind(this);
      this.getParameterByName = this.getParameterByName.bind(this);
    }
    
    getParameterByName(name, search) {
      const match = RegExp('[?&]' + name + '=([^&]*)').exec(search);
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }
    
    linkedinRequest() {
      const newWindow = window.open(this.winUrl, '_blank', true, 500, 600);
  
      if (window.focus) {
        newWindow.focus();
      }
  
      const intr = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(intr);
        }
        let search;
        try {
          search = newWindow.location.search;
        } catch (e) {
          
        }
  
        if (search) {
          const authCode = this.getParameterByName('code', search);
          const linkedInAuthCode = authCode;
          const REQ_OBJECT = {
            'grant_type': 'authorization_code',
            'code': linkedInAuthCode,
            'redirect_uri': callBackUrl,
            'client_id': clienID,
            'client_secret': secretKey
          };
          axios.post(accessTokenRoute, REQ_OBJECT)
            .then((accessTokens) => {
              const accessToken = accessTokens.data;
  
              const peopleUrl = userDetailsRoute;
              const sentData = {
                'oauth2_access_token' : accessToken
              };
              axios.post(peopleUrl, sentData)
                .then((success) => {
                  const userInfo = success.data;
                  if(userInfo && userInfo.id) {
                    console.log("userInfo", userInfo);
                  }
                })
                .catch((errored) => {
                  console.log("errored", errored);
                });
            })
            .catch((errors) => {
              console.log("errors", errors);
            });
          newWindow.close();
        }
      }, 100);
    }
    render() {
      return (
        <div>
          <span title="Connect With LinkedIn" onClick={this.linkedinRequest}>
            <img src={ LinkedinLogo } alt="Connect With Linkedin" />
          </span>
          <p className="linkedin-text">Connect with your personal LinkedIn account</p>
        </div>
      );
    }
// END COMPONENT FOR LINKEDIN LOGIN ======================================
}

const mapStateToProps = (state) => {
    return { pikachu: state.pikachu };
}

export default connect(mapStateToProps)(HomeBertasbih);
