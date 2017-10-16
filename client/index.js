import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { browserHistory } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import Details from './components/recipes/Details';
import NotFound from './components/errors/NotFound';
import './assets/scss/main.scss';
import './assets/js/main';
import './assets/js/fontawesome';

const Root = () => {
  return (
    <Router history = {browserHistory}>
      <div>
      <Route exact path="/" component={Home}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/signin" component={SignIn}/>
      <Route path="/details" component={Details}/>
      <Route component={NotFound}/>
      </div>
    </Router>
  )
}

render(<Root />, document.getElementById('root'));
