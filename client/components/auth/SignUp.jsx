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

class SignUp extends Component {
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
              <SignupForm userSignupRequest={userSignupRequest} />
            </div>
          </div>
        </div>

        <div className="clearfix m-5" />

        {/* End div */}
      </div>
    );
  }
}

SignUp.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

export default connect(null, { userSignupRequest, addFlashMessage })(SignUp);

