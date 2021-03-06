import React from 'react';
import PropTypes from 'prop-types';

const ProfileDetail = props => (

  <div className="container margin-top-70">

    <div>
      <h1
        className="text-center p-4 center-hero-text"
        id="myProfile"
      >My Profile
      </h1>
    </div>

    <div className="margin-top-50 margin-bottom-50" />

    <div className="col-md-6 mx-auto p-3 user-profile-card">
      <form className="container" onSubmit={props.onSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className="form-control text-muted"
              id="firstName"
              name="firstName"
              required
              value={props.firstName}
              onChange={props.onChange}
            />

          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control text-muted"
              id="lastName"
              name="lastName"
              required
              value={props.lastName}
              onChange={props.onChange}
            />

          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="emailAddress">Email Address</label>
            <input
              type="email"
              className="form-control text-muted"
              id="emailAddress"
              name="emailAddress"
              required
              value={props.emailAddress}
              onChange={props.onChange}
            />

          </div>
        </div>

        <button
          className="btn btn-primary btn-primary-color"
          type="submit"
          id="profile-submit"
        >
          Save Changes
        </button>
      </form>
    </div>


    <br />
  </div>
);

ProfileDetail.propTypes = {
  emailAddress: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ProfileDetail;
