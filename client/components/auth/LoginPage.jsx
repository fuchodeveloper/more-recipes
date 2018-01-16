/* eslint-disable max-len, react/no-unused-state */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import validateInput from '../shared/validations/login';
import login from '../../action/authentication/loginAction';

/**
   * @description Login form class
   *
   * @class LoginForm
   *
   * @extends {React.Component}
   */
class LoginPage extends React.Component {
  /**
   * @description Creates an instance of LoginForm.
   *
   * @param {Object} props
   *
   * @memberof LoginForm
   */
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: '',
      errors: {
        emailAddress: '',
        password: '',
        error: ''
      },
    };

    /**
     * Bind functions to this
     */
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
 * @description Implement on change for form fields
 *
 * @param {Object} event
 *
 * @memberof LoginPage
 *
 * @returns {undefined}
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 * @description Function to handle form submissions
 *
 * @param {Object} event
 *
 * @memberof LoginPage
 *
 * @returns {void}
 */
  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.login(this.state);
    }
  }

  /**
   * @description Handle form validation
   *
   * @returns {Object} isValid
   *
   * @memberof LoginPage
   */
  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /**
   * @description Render the JSX template
   *
   * @memberof LoginPage
   *
   * @returns {JSX} JSX representation of component
   */
  render() {
    if (this.props.auth) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div className="container margin-top-70">

          <div className="margin-top-bottom-auto">
            <h2 className="text-center">Welcome Back</h2>
          </div>

          <div className="col-md-5 card mx-auto p-4">
            <div className="mx-auto">

              <form onSubmit={this.onSubmit}>
                <div className="row">

                  <div className="col-md-12 mb-2">
                    <label htmlFor="emailAddress" className="forms-label-color">
            Email Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="emailAddress"
                      name="emailAddress"
                      value={this.emailAddress}
                      onChange={this.onChange}
                      required
                    />
                    <span className="mb-1" />
                    { this.state.errors.emailAddress && <div className="text-danger text-center">{this.state.errors.emailAddress}</div> }
                  </div>

                  <div className="col-md-12 mb-2">
                    <label htmlFor="password" className="forms-label-color">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      value={this.password}
                      onChange={this.onChange}
                      required
                    />
                    <span className="mb-1" />
                    { this.state.errors.password && <div className="text-danger text-center">{this.state.errors.password}</div> }

                  </div>
                  <div className="col-md-12 mb-2">
                    <label htmlFor="submit" className="forms-label-color" />
                    <input
                      type="submit"
                      id="submit"
                      value="Sign In"
                      className="btn btn-primary form-control btn-primary-color"
                      disabled={this.isFetching}
                    />
                    <p className="small text-muted mt-3 text-center">
                    Don&#8242;t have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                  </div>

                </div>
              </form>

            </div>
          </div>

          <div className="clearfix m-5" />


        </div>

        {/* End div */}
      </div>
    );
  }
}

LoginPage.defaultProps = {
  auth: false
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.bool
};

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.auth.error,
  isFetching: state.isFetching,
  auth: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
