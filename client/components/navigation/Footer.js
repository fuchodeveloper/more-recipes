import React from 'react';
import { render } from 'react-dom';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <p className="text-center">
            <strong>&copy; {new Date().getFullYear()} | More-recipes</strong>
        </p>
      </footer>
    )
  }
}

export default Footer;
