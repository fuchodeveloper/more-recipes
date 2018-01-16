import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <h1 className="text-center" style={{ marginTop: '5em' }}>
      <code>404: Resource not found!</code>

      <div className="text-center mt-2">
        <Link to="/">Back to home</Link>
      </div>
    </h1>
  </div>
);

export default NotFound;
