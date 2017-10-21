import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import validateInput from '../shared/validations/signup';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      password_confirmation: '',
      errors: {},
      isLoading: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
          
      this.props.userSignupRequest(this.state)
      .then(() => {
        this.props.addFlashMessage({
          type: 'success',
          text: 'Sign up successful!'
        });
        this.context.router.history.push('/');
      })
      .catch((error) => {
        this.setState({ errors: error.response.data, isLoading: false })
      })
    }

  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={ this.onSubmit }>
        <div className="row"> 
             <div className={classnames("col-md-12 mb-3", {"has-error": errors.firstName})}>
                <label htmlFor="firstName" className="forms-label-color">First Name</label>
                <input 
                  value={this.state.firstName} 
                  type="text"
                  id="firstName" 
                  name="firstName" 
                  className="form-control" 
                  onChange={ this.onChange }
                />
                { errors.firstName && <span className="form-text">{ errors.firstName }</span> }
            </div>

            <div className={classnames("col-md-12 mb-3", {"has-error": errors.lastName})}>
                <label htmlFor="firstName" className="forms-label-color">Last Name</label>
                <input 
                  value={this.state.lastName} 
                  type="text"
                  id="lastName" 
                  name="lastName" 
                  className="form-control" 
                  onChange={ this.onChange }
                />
                { errors.lastName && <span className="form-text">{ errors.lastName }</span> }
            </div>

            <div className={classnames("col-md-12 mb-2", { "has-error": errors.emailAddress })}>
                <label htmlFor="emailAddress" className="forms-label-color">Email Address</label>
                <input 
                  value={this.state.emailAddress} 
                  type="email" 
                  id="emailAddress" 
                  name="emailAddress" 
                  className="form-control" 
                  onChange={ this.onChange }
                />
                { errors.emailAddress && <span className="form-text">{ errors.emailAddress }</span> }
            </div>

            <div className={classnames("col-md-12 mb-2", { "has-error": errors.password })}>
                <label htmlFor="password" className="forms-label-color">Password</label>
                <input 
                  value={this.state.password} 
                  type="password" 
                  id="password" 
                  name="password" 
                  className="form-control" 
                  onChange={ this.onChange }
                />
                { errors.password && <span className="form-text">{ errors.password }</span> }
            </div>

            <div className={classnames("col-md-12 mb-2", { "has-error": errors.password_confirmation })}>
                <label htmlFor="password_confirmation" className="forms-label-color">Confirm Password</label>
                <input 
                  value={this.state.password_confirmation} 
                  type="password" 
                  id="confirmPassword" 
                  name="password_confirmation" 
                  className="form-control" 
                  onChange={ this.onChange }
                />
                { errors.password_confirmation && <span className="form-text">{ errors.password_confirmation }</span> }
            </div>

            <div className="col-md-12 mb-2">
                <label className="forms-label-color"></label>
                {/* <input type="submit" value="Sign Up" className="btn btn-primary form-control btn-primary-color"/> */}
                <div className="form-group"><button  className="btn btn-primary btn-lg" disabled={this.state.isLoading }>Login</button></div>
                <p className="small text-muted mt-3 text-center">Already have an account? <a href="sign-in.html">Sign in</a></p>
            </div>
          </div>
      </form>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default SignupForm;
