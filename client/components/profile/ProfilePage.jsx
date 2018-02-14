import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileDetail from './ProfileDetail';
import profileAction from '../../action/profile/profileAction';
import updateProfileAction from '../../action/profile/updateProfileAction';

/**
 * @description parent class component for profile page
 *
 * @class ProfilePage
 * @extends {Component}
 */
export class ProfilePage extends Component {
  /**
   * @description Creates an instance of ProfilePage.
   *
   * @param {Object} props constructor props
   *
   * @memberof ProfilePage
   */
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
 * @description lifecycle method for profile page component
 *
 * @memberof ProfilePage
 *
 * @returns {undefined} calls getProfile
 */
  componentDidMount() {
    const id = this.props.login;
    this.props.getProfile(id);
  }

  /**
   * @description lifecycle method used to update state on
   * receiving new props
   *
   * @param {Object} nextProps componentWillReceiveProps props object
   *
   * @memberof ProfilePage
   *
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    const { firstName } = nextProps.profile;
    const { lastName } = nextProps.profile;
    const { emailAddress } = nextProps.profile;

    this.setState({
      firstName, lastName, emailAddress
    });
  }

  /**
   * @description Handle change events
   *
   * @param {Object} event
   *
   * @returns {undefined} sets state on change
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 * @description handle form submission
 *
 * @param {Object} event
 *
 * @memberof ProfilePage
 *
 * @returns {undefined} calls updateProfile on submit
 */
  onSubmit(event) {
    event.preventDefault();
    this.props.updateProfile(this.state);
  }

  /**
 * @description render the profile page template
 *
 * @memberof ProfilePage
 *
 * @returns {JSX} DomELement
 */
  render() {
    return (
      <div>

        <ProfileDetail
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          emailAddress={this.state.emailAddress}
          password={this.state.password}
          newPassword={this.state.newPassword}
        />

        <div className="clearfix m-5" />

      </div>
    );
  }
}


ProfilePage.defaultProps = {
  login: {},
  profile: {}
};

ProfilePage.propTypes = {
  getProfile: PropTypes.func.isRequired,
  login: PropTypes.shape({}),
  profile: PropTypes.shape({}),
  updateProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  login: state.auth.user.id
});

const mapDispatchToProps = dispatch => ({
  getProfile: profileId => dispatch(profileAction(profileId)),
  updateProfile: newProfileDetails =>
    dispatch(updateProfileAction(newProfileDetails))
});


export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
