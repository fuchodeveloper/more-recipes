import React, { Component } from 'react';
import { render } from 'react-dom';

class NotFound extends Component {
  render() {
    return (
      <div>
        <h1>
          <code>404: Resource not found!</code>
        </h1>
      </div>
    );
  }
}

export default NotFound;
