import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ProfileDetail from './ProfileDetail';
import Header from '../navigation/Header';
import Footer from '../navigation/Footer';
import profileAction from '../../action/profile/userProfileAction';
import updateProfileAction from '../../action/profile/updateProfileAction';


class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: '',
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      newPassword: '',
      errors: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  componentWillMount(){
    const id = this.props.login;
    this.props.getProfile(id);
  }
  componentWillReceiveProps(nextProps) {
    const profile = nextProps.profile;
    const firstName = nextProps.profile.firstName;
    const lastName = nextProps.profile.lastName;
    const emailAddress = nextProps.profile.emailAddress;
 
    this.props.profile

    this.setState({ profile, firstName, lastName, emailAddress });
  }

  /**
   * Handle change events
   * @param {event} event 
   */
    onChange(event) {
      this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
      event.preventDefault();
      this.props.updateProfile(this.state);
      this.setState({ password: '', newPassword: '' });
    }

  render () {
    return (
      <div>

        <Header />

        <ProfileDetail 
          profile={this.state.profile} 
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          emailAddress={this.state.emailAddress }
          password={this.state.password}
          newPassword={this.state.newPassword}
          // errors={this.state.errors}
        />
        
        <div className="clearfix m-5"></div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    login: state.login.user.id
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: profileId => dispatch(profileAction(profileId)),
    updateProfile: newProfileDetails => dispatch(updateProfileAction(newProfileDetails))
  }
};

// ProfilePage.propType = {

// }

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
