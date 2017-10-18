import React, { Component } from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import validator from 'validator';
import axios from 'axios';
import Header from '../../components/navigation/Header';

class SignUp extends Component {

  
  constructor(props) {
    super(props);
    // Initialize state properties
    this.state = { 
      // credentials: {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        // errors: {},
        // emailValid: false,
        // passwordValid: false,
        // formValid: false
      }
    //  }
    //  Bind create user and onChange function
    // this.onChange = this.onChange.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  handleUserInput(event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value.trim();
    

    // if (!validator.isEmail(this.state.emailAddress)) {
    //   this.state.errors.emailAddress = 'Check email again.';
    // }   

    
    this.setState({[name]: value});
  }

  createUser(event) {
    event.preventDefault();
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailAddress: this.state.emailAddress,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    }

    // if (validator.isEmpty(user.firstName)) {
    //   errors.firstName = 'Field is required.';
    // }
    this.setState({ user })

    return axios.post('/api/v1/users/signup', {
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      password: user.password,
      password_confirmation: user.password
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }

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
                <form onSubmit={ (event) => this.createUser(event) }>
                    <div className="row"> 
                        <div className="col-md-12 mb-3">
                            <label htmlFor="firstName" className="forms-label-color">First Name</label>
                            <input value={this.state.firstName} type="text" id="firstName" name="firstName" className="form-control" onChange={(event) => this.handleUserInput(event)}/>
                        </div>

                        <div className="col-md-12 mb-2">
                            <label htmlFor="lastName" className="forms-label-color">Last Name</label>
                            <input value={this.state.lastName} type="text" id="lastName" name="lastName" className="form-control" onChange={(event) => this.handleUserInput(event)}/>
                        </div>

                        <div className="col-md-12 mb-2">
                            <label htmlFor="emailAddress" className="forms-label-color">Email Address</label>
                            <input value={this.state.emailAddress} type="email" id="emailAddress" name="emailAddress" className="form-control" onChange={(event) => this.handleUserInput(event)}/>
                        </div>

                        <div className="col-md-12 mb-2">
                            <label htmlFor="password" className="forms-label-color">Password</label>
                            <input value={this.state.password} type="password" id="password" name="password" className="form-control" onChange={(event) => this.handleUserInput(event)}/>
                        </div>

                        <div className="col-md-12 mb-2">
                            <label htmlFor="confirmPassword" className="forms-label-color">Confirm Password</label>
                            <input value={this.state.confirmPassword} type="password" id="confirmPassword" name="confirmPassword" className="form-control" onChange={(event) => this.handleUserInput(event)}/>
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

