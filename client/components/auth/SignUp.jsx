/* eslint-disable max-len, react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import validateSignup from '../../validations/validateSignup';
import signupAction from '../../action/authentication/signupAction';

/**
 * @description class to handle user sign up
 *
 * @class SignUp
 *
 * @extends {Component}
 */
export class SignUp extends Component {
  /**
   * @description Creates an instance of SignUp.
   *
   * @param {Object} props constructor props object
   *
   * @memberof SignUp
   */
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      passwordConfirmation: '',
      errors: {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        passwordConfirmation: '',
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
 * @description function to handle on change event
 *
 * @param {Object} event onChange props object
 *
 * @memberof SignUp
 *
 * @returns {undefined} sets state on change
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 * @description function to handle form submission
 *
 * @param {Object} event onSubmit props object
 *
 * @memberof SignUp
 *
 * @returns {undefined} calls the signupProps
 */
  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });

      this.props.signupProps(this.state);
    }
  }

  /**
 * @description function to validate user sign up input
 *
 * @memberof SignUp
 *
 * @returns {undefined} returns validation state errors
 */
  isValid() {
    const { errors, isValid } = validateSignup(this.state);
    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /**
 * @description Render the JSX template
 *
 * @returns {JSX} JSX representation of component
 *
 * @memberof SignUp
 */
  render() {
    if (this.props.auth) {
      return <Redirect to="/" />;
    }

    return (
      <div>

        <div className="container margin-top-70">
          <div className="margin-top-bottom-auto">
            <h2 className="text-center">Create an account!</h2>
          </div>
          <div className="col-md-5 card mx-auto p-4 mb-5">
            <div className="mx-auto">
              <form onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label
                      htmlFor="firstName"
                      className="forms-label-color"
                    >First Name
                    </label>
                    <input
                      value={this.firstName}
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="form-control"
                      onChange={this.onChange}
                      required
                    />
                    { this.state.errors.firstName &&
                    <span className="text-danger form-text">
                      { this.state.errors.firstName }
                    </span> }
                  </div>

                  <div className="col-md-12 mb-3">
                    <label
                      htmlFor="firstName"
                      className="forms-label-color"
                    >Last Name
                    </label>
                    <input
                      value={this.lastName}
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="form-control"
                      onChange={this.onChange}
                      required
                    />
                    { this.state.errors.lastName && <span className="text-danger form-text">{ this.state.errors.lastName }</span> }
                  </div>

                  <div className="col-md-12 mb-2">
                    <label htmlFor="emailAddress" className="forms-label-color">Email Address</label>
                    <input
                      value={this.emailAddress}
                      type="email"
                      id="emailAddress"
                      name="emailAddress"
                      className="form-control"
                      onChange={this.onChange}
                      required
                    />
                    { this.state.errors.emailAddress && <span className="text-danger form-text">{ this.state.errors.emailAddress }</span> }
                  </div>

                  <div className="col-md-12 mb-2">
                    <label htmlFor="password" className="forms-label-color">Password</label>
                    <input
                      value={this.password}
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      onChange={this.onChange}
                      required
                    />
                    { this.state.errors.password && <span className="text-danger form-text">{ this.state.errors.password }</span> }
                  </div>

                  <div className="col-md-12 mb-2">
                    <label htmlFor="passwordConfirmation" className="forms-label-color">Confirm Password</label>
                    <input
                      value={this.passwordConfirmation}
                      type="password"
                      id="passwordConfirmation"
                      name="passwordConfirmation"
                      className="form-control"
                      onChange={this.onChange}
                      required
                    />
                    { this.state.errors.passwordConfirmation && <span className="text-danger form-text">{ this.state.errors.passwordConfirmation }</span> }
                  </div>
                  <br />

                  <div className="col-md-12 mb-2">
                    <label className="forms-label-color" />
                    <div className="form-group">
                      <button
                        className="btn btn-primary btn-lg btn-primary-color"
                        disabled=""
                        id="signup-submit"
                      >Sign up
                      </button>
                    </div>
                    <p className="small text-muted mt-3 text-center">
                    Already have an account? <Link
                      to="/login"
                      id="login"
                    >Sign in
                                             </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="clearfix m-5" />

      </div>
    );
  }
}

SignUp.defaultProps = {
  auth: false,
  signupProps: () => {}
};

SignUp.propTypes = {
  signupProps: PropTypes.func,
  auth: PropTypes.bool
};


const mapStateToProps = state => ({
  errors: state.auth.error,
  signup: state.auth,
  auth: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  signupProps: userDetails => dispatch(signupAction(userDetails))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
