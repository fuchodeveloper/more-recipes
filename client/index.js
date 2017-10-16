import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import Home from './components/Home';
import './assets/scss/main.scss';
import './assets/js/main';

const Root = () => {
  // return (
    
  // )
}

render(<Home />, document.getElementById('root'));
