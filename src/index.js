/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { CognitoIdentityServiceProvider, CognitoUserPool, CognitoUserAttribute, CognitoUser } as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
*/


import {Config, CognitoIdentityCredentials} from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUserAttribute
} from "amazon-cognito-identity-js";
import React from "react";
import ReactDOM from "react-dom";
import appConfig from "./config";

Config.region = appConfig.region;
Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: appConfig.IdentityPoolId
});

const userPool = new CognitoUserPool({
  UserPoolId: appConfig.UserPoolId,
  ClientId: appConfig.ClientId,
});

//Import the AWS Cognito package
//import { CognitoIdentityServiceProvider, CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';

/*	
 var poolData = {
        UserPoolId : 'us-west-2_uCKj8WQdj', // Your user pool id here
        ClientId : '3oif839ghn4ft9rbmck44goep7' // Your client id here
    };
*/


/*
class App extends Component {
  const poolData = { UserPoolId: 'us-west-2_uCKj8WQdj', ClientId: '3oif839ghn4ft9rbmck44goep7' };
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
}


const poolData = { UserPoolId: 'us-west-2_uCKj8WQdj', ClientId: 'cgd7jlouufro6otl9jv2bcqol' };
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

var CognitoUserAttribute = '';
*/

/*
    //var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
 
    var attributeList = [];
 
    var dataEmail = {
        Name : 'email',
        Value : 'email@mydomain.com'
    };
 
    var dataPhoneNumber = {
        Name : 'phone_number',
        Value : '+15555555555'
    };
    //var attributeEmail = new AmazonCognitoIdentity.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
    //var attributePhoneNumber = new AmazonCognitoIdentity.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);
 
    //attributeList.push(attributeEmail);
    //attributeList.push(attributePhoneNumber);
 
    userPool.signUp('username', 'password', attributeList, null, function(err, result){
    	let CognitoUser = ''
    	console.log("hello")
        if (err) {
            alert(err);
            return;
        }
        CognitoUser = result.user;
        console.log('user name is ' + CognitoUser.getUsername());
    });

*/

function clearform() {
  	document.getElementById('emailinput').value='';
  	document.getElementById('passinput').value='';
  }

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      })
    ];
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('user name is ' + result.user.getUsername());
      console.log('call result: ' + result);
      clearform();
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="text"
        	   id="emailinput"
               value={this.state.email}
               placeholder="Email"
               onChange={this.handleEmailChange.bind(this)}/>
        <input type="password"
        	   id="passinput"
               value={this.state.password}
               placeholder="Password"
               onChange={this.handlePasswordChange.bind(this)}/>
        <input type="submit"/>
      </form>
    );
  }

  

  

}

ReactDOM.render(<SignUpForm />, document.getElementById('root'));


// ========================================
/*
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
*/


//AWS Cognito testing area below here ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

