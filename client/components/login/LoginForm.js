import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validateInput from '../shared/validations/login';
import { login } from '../../action/login';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: '',
      errors: {},
      isLoading: false
    };

    /**
     * Bind functions to this
     */
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * Check for form validity
   * 
   * @memberof LoginForm
   */
  isValid(){
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
      // this.props.login(this.state);
    }

    return isValid;
  }

  /**
   * Implement form onSubmit 
   */
  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()){
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state)
        .then(
          (res) => this.context.router.history.push('/'),
          (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
        );
    }
  }

  /**
   * Implement on change for form fields
   * 
   * @memberof LoginForm
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    /**
     * Deconstruct variables
     */
    const { errors, emailAddress, password, isLoading } = this.state;

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
                  error={errors.emailAddress}
                />
            </div>

            <div className="col-md-12 mb-2">
                <label htmlFor="password" className="forms-label-color">Password</label>
                <input 
                  type="text"
                  className="form-control" 
                  name="password" 
                  id="password"
                  value={password}
                  onChange={this.onChange}
                  error={errors.password}
                />
            </div>


            <div className="col-md-12 mb-2">
                <label htmlFor="submit" className="forms-label-color"/>
                <input type="submit" id="submit" value="Sign In" className="btn btn-primary form-control btn-primary-color" disabled={isLoading}/>
                <p className="small text-muted mt-3 text-center">Don't have an account? <a href="sign-up.html">Sign Up</a></p>
            </div>

        </div>
      </form>
    )
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);
