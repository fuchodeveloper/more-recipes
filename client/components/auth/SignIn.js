import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from '../../components/navigation/Header';

class SignIn extends React.Component {
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
                <form action="#" method="post">
                    <div className="row">

                        <div className="col-md-12 mb-2">
                            <label for="emailAddress" className="forms-label-color">Email Address</label>
                            <input type="text" className="form-control" id="emailAddress" name="emailAddress"/>
                        </div>

                        <div className="col-md-12 mb-2">
                            <label for="password" className="forms-label-color">Password</label>
                            <input type="text" className="form-control" name="password" id="password"/>
                        </div>


                        <div className="col-md-12 mb-2">
                            <label for="submit" className="forms-label-color"/>
                            <input type="submit" id="submit" value="Sign In" className="btn btn-primary form-control btn-primary-color"/>
                            <p className="small text-muted mt-3 text-center">Don't have an account? <a href="sign-up.html">Sign Up</a></p>
                        </div>

                    </div>
                </form>
            </div>
        </div>

        <div className="clearfix m-5"/>
        
      </div>

      {/* End div */}
      </div>
    );
  }
}

export default SignIn;
