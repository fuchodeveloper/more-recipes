import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileDetail from './ProfileDetail';
import profileAction from '../../action/profile/userProfileAction';
import updateProfileAction from '../../action/profile/updateProfileAction';

/**
 * @description parent class component for profile page
 *
 * @class ProfilePage
 * @extends {Component}
 */
class ProfilePage extends Component {
  /**
   * @description Creates an instance of ProfilePage.
   * @param {any} props
   * @memberof ProfilePage
   */
  constructor(props) {
    super(props);
    this.state = {
      profile: '',
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      newPassword: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
 * @description lifecycle method for profile page component
 *
 * @memberof ProfilePage
 * @returns {void}
 */
  componentDidMount() {
    const id = this.props.login;
    this.props.getProfile(id);
  }

  /**
   * @description lifecycle method used to update state on receiving new props
   *
   * @param {any} nextProps
   * @memberof ProfilePage
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    const { profile } = nextProps;
    const { firstName } = nextProps.profile;
    const { lastName } = nextProps.profile;
    const { emailAddress } = nextProps.profile;

    this.setState({
      profile, firstName, lastName, emailAddress
    });
  }

  /**
   * @description Handle change events
   * @param {event} event
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 * @description handle form submission
 *
 * @param {any} event
 * @memberof ProfilePage
 * @returns {void}
 */
  onSubmit(event) {
    event.preventDefault();
    this.props.updateProfile(this.state);
    this.setState({ password: '', newPassword: '' });
  }

  /**
 * @description render the profile page template
 *
 * @memberof ProfilePage
 * @returns {dom} DomELement
 */
  render() {
    return (
      <div>

        <ProfileDetail
          profile={this.state.profile}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          emailAddress={this.state.emailAddress}
          password={this.state.password}
          newPassword={this.state.newPassword}
          // errors={this.state.errors}
        />

        <div className="clearfix m-5" />
        
      </div>
    );
  }
}


ProfilePage.defaultProps = {

};

ProfilePage.propTypes = {
  getProfile: PropTypes.func.isRequired,
  login: PropTypes.shape({}).isRequired,
  profile: PropTypes.shape({}).isRequired,
  updateProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  login: state.auth.user.id
});

const mapDispatchToProps = dispatch => ({
  getProfile: profileId => dispatch(profileAction(profileId)),
  updateProfile: newProfileDetails =>
    dispatch(updateProfileAction(newProfileDetails))
});


export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
/** *****************************
 * FIX PROPTYPE VALIDATION ERROR
 */
