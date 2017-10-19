import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import App from './components/App';
import Home from './components/Home';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import Details from './components/recipes/Details';
import NotFound from './components/errors/NotFound';
import rootReducer from './rootReducer';
import './assets/scss/main.scss';
import './assets/js/main';
// import './assets/js/fontawesome';

const Root = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return (
    <Provider store={store}>
        <Router history = {browserHistory}>
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/signin" component={SignIn}/>
            <Route path="/details" component={Details}/>
          {/* <Route component={NotFound}/> */}
          </div>
      </Router>
    </Provider>
  )
}

render(<Root />, document.getElementById('root'));


