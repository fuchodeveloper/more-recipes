import React, { Component } from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import validator from 'validator';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from '../../components/navigation/Header';
import SignupForm from './SignupForm';
import { userSignupRequest } from '../../action/authentication/signupActions';
import { addFlashMessage } from '../../action/flashMessages';

class SignUp extends Component {

  
  // constructor(props) {
  //   super(props);
  //   // Initialize state properties
  //   this.state = { 
  //       firstName: '',
  //       lastName: '',
  //       emailAddress: '',
  //       password: '',
  //       confirmPassword: ''
  //     }

  //   //  Bind create user and onChange function
  //   // this.onChange = this.onChange.bind(this);
  //   this.createUser = this.createUser.bind(this);
  // }

  // handleUserInput(event) {
  //   event.preventDefault();
  //   const name = event.target.name;
  //   const value = event.target.value.trim();
    
    
  //   this.setState({[name]: value});
  // }

  // createUser(event) {
  //   event.preventDefault();
  //   const user = {
  //     firstName: this.state.firstName,
  //     lastName: this.state.lastName,
  //     emailAddress: this.state.emailAddress,
  //     password: this.state.password,
  //     confirmPassword: this.state.confirmPassword
  //   }

  //   this.setState({ user })

  //   return axios.post('/api/v1/users/signup', {
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     emailAddress: user.emailAddress,
  //     password: user.password,
  //     password_confirmation: user.password
  //   })
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }

  // signUp(user){
  //   return axios.post('/api/v1/users/signup', {
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     emailAddress: user.emailAddress,
  //     password: user.password
  //   })
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }

  render() {
    const { userSignupRequest, addFlashMessage } = this.props;
    return (
      <div>
          {/* Header component for navigation */}
        <Header />

        <div className="container margin-top-70">
        <div className="margin-top-bottom-auto">
            <h2 className="text-center">Create an account!</h2>
        </div>
        <div className="col-md-5 card mx-auto p-4 mb-5">
            <div className="mx-auto">
                <SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage}/>
            </div>
          </div>
        </div>

        <div className="clearfix m-5"></div>

        {/* End div */}
      </div>
    )
  }
}

SignUp.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

export default connect(null, { userSignupRequest, addFlashMessage })(SignUp);

