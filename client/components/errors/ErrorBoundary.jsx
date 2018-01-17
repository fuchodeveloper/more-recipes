import React from 'react';
import PropTypes from 'prop-types';
/**
 * @description class to handle unexpected errors
 *
 * @class ErrorBoundary
 *
 * @extends {React.Component}
 */
class ErrorBoundary extends React.Component {
  /**
   * Creates an instance of ErrorBoundary.
   *
   * @param {Object} props
   *
   * @memberof ErrorBoundary
   */
  constructor(props) {
    super(props);
    this.state = {
      unexpectedError: false
    };
  }

  /**
 * @description component lifecycle method to catch errors
 *
 * @memberof ErrorBoundary
 *
 * @returns {undefined}
 */
  componentDidCatch() {
    this.setState({ unexpectedError: true });
  }

  /**
 * @description render JSX for error
 *
 * @memberof ErrorBoundary
 *
 * @returns {JSX} JSX template
 */
  render() {
    if (this.state.unexpectedError) {
      return (
        <div>
          <h1 className="text-center" style={{ marginTop: '5em' }}>
            <code>Oh-no! Something went wrong!</code>

            <div className="text-center mt-2">
              <a href="/">Back to home</a>
            </div>
          </h1>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;
