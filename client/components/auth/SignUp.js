import React, { Component } from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../../components/navigation/Header';

class SignUp extends Component {

  constructor(props) {
    super(props);
    // Initialize state properties
    this.state = { 
      credentials: {
        emailAddress: '',
        password: ''
      }
     }
    //  Bin create user function
    this.createUser = this.createUser.bind(this);
  }

  createUser(event) {
    event.preventDefault();
    console.log(event);
  }

  render() {
    return (
      <div>
          {/* Header component for navigation */}
        <Header />

        <div className="container margin-top-70">
        <div className="margin-top-bottom-auto">
            <h2 className="text-center">Create an account</h2>
        </div>
        <div className="col-md-5 card mx-auto p-4 mb-5">
            <div className="mx-auto">
                <form onSubmit={ this.createUser }>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <label for="firstName" className="forms-label-color">First Name</label>
                            <input type="text" id="firstName" name="firstName" className="form-control"/>
                        </div>

                        <div className="col-md-12 mb-2">
                            <label for="lastName" className="forms-label-color">Last Name</label>
                            <input type="text" id="lastName" name="lastName" className="form-control"/>
                        </div>

                        <div className="col-md-12 mb-2">
                            <label for="emailAddress" className="forms-label-color">Email Address</label>
                            <input type="text" id="emailAddress" name="emailAddress" className="form-control"/>
                        </div>

                        <div className="col-md-12 mb-2">
                            <label for="password" className="forms-label-color">Password</label>
                            <input type="text" id="password" name="password" className="form-control"/>
                        </div>

                        <div className="col-md-12 mb-2">
                            <label for="confirmPassword" className="forms-label-color">Confirm Password</label>
                            <input type="text" id="confirmPassword" name="confirmPassword" className="form-control"/>
                        </div>

                        <div className="col-md-12 mb-2">
                            <label className="forms-label-color"></label>
                            <input type="submit" value="Sign Up" className="btn btn-primary form-control btn-primary-color"/>
                            <p className="small text-muted mt-3 text-center">Already have an account? <a href="sign-in.html">Sign in</a></p>
                        </div>
                    </div>
                </form>
            </div>
          </div>
        </div>

        <div className="clearfix m-5"></div>

        {/* End div */}
      </div>
    )
  }
}

export default SignUp;

