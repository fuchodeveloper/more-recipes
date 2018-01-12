import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import validateInput from '../shared/validations/login';
import login from '../../action/authentication/loginAction';

/**
   * Login form class
   *
   * @class LoginForm
   * @extends {React.Component}
   */
class LoginForm extends React.Component {
  /**
   * Creates an instance of LoginForm.
   * @param {any} props
   * @memberof LoginForm
   */
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: '',
      errors: {},
      isFetching: false
    };

    /**
     * Bind functions to this
     */
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
 * Component called after new props are received
 *
 * @param {any} nextProps
 * @memberof LoginForm
 * @returns {null} null
 */
  componentWillReceiveProps(nextProps) {
    const { isFetching } = nextProps;
    this.setState({ isFetching });
  }

  /**
 * Implement on change for form fields
 *
 * @param {any} e
 * @memberof LoginForm
 * @returns {null} null
 */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
 * Function to handle form submissions
 *
 * @param {any} e
 * @memberof LoginForm
 * @returns {dispatch} dispatch
 */
  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.login(this.state)
        .then(() => {
          if (!this.props.error) {
            this.props.history.push('/');
          }
        });
    }
  }

  /**
   * Handle form validation
   *
   * @returns {object} isValid
   * @memberof LoginForm
   */
  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /**
   * Render the JSX template
   *
   * @returns {html} html
   * @memberof LoginForm
   */
  render() {
    /**
     * Deconstruct variables
     */
    const {
      errors, emailAddress, password, isFetching
    } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="row">

          <div className="col-md-12 mb-2">
            <label htmlFor="emailAddress" className="forms-label-color">Email Address</label>
            <input
              type="text"
              className="form-control"
              id="emailAddress"
              name="emailAddress"
              value={emailAddress}
              onChange={this.onChange}
            />
            <span className="mb-1" />
            { errors.emailAddress && <div className="text-danger text-center">{errors.emailAddress}</div> }
          </div>

          <div className="col-md-12 mb-2">
            <label htmlFor="password" className="forms-label-color">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={password}
              onChange={this.onChange}
            />
            <span className="mb-1" />
            { errors.password && <div className="text-danger text-center">{errors.password}</div> }
            <br />
            {this.props.error && <div className="text-danger text-center">{this.props.error}</div>}


          </div>


          <div className="col-md-12 mb-2">
            <label htmlFor="submit" className="forms-label-color" />
            <input type="submit" id="submit" value="Sign In" className="btn btn-primary form-control btn-primary-color" disabled={isFetching} />
            <p className="small text-muted mt-3 text-center">Don&#8242;t have an account? <Link to="/signup">Sign Up</Link></p>
          </div>

        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({

  error: state.login.error,
  isFetching: state.isFetching
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
