import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from '../../components/navigation/Header';
import LoginForm from './LoginForm';

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        {/* Header component for navigation */}
        <Header />

        <div className="container margin-top-70">

        <div className="margin-top-bottom-auto">
            <h2 className="text-center">Welcome Back</h2>
        </div>

        <div className="col-md-5 card mx-auto p-4">
            <div className="mx-auto">

              <LoginForm />

            </div>
        </div>

        <div className="clearfix m-5"/>
        
      </div>

      {/* End div */}
      </div>
    );
  }
}

export default LoginPage;
