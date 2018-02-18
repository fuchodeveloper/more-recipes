import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default (ComposedComponent) => {
/**
 * @description class to handle authentication
 *
 * @class Authenticate
 *
 * @extends {React.Component}
 */
  class Authenticate extends React.Component {
  /**
   * @description lifecycle method to redirect if user is not authenticated
   *
   * @memberof Authenticate
   *
   * @returns {undefined} calls isAuthenticated on componentWillMount
   */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.context.router.history.push('/login');
      }
    }

    /**
 * @description lifecycle method to receive props update
 *
 * @param {Object} nextProps
 *
 * @memberof Authenticate
 *
 * @returns {undefined} calls isAuthenticated on componentWillUpdate
 */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.history.push('/');
      }
    }

    /**
 * @description renders component to the DOM
 *
 * @memberof Authenticate
 *
 * @returns {JSX} JSX representation of component
 */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });

  return connect(mapStateToProps)(Authenticate);
};
