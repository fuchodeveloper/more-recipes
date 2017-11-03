import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import App from './components/App';
import Home from './components/Home';
import SignUp from './components/auth/SignUp';
import RecipeDetailsPage from './components/recipes/RecipeDetailsPage';
import AddRecipePage from './components/recipes/AddRecipePage';
import MyRecipesPage from './components/recipes/MyRecipesPage';
import UpdateRecipePage from './components/recipes/UpdateRecipePage';
import rootReducer from './rootReducer';
import LoginPage from './components/login/LoginPage';
import './assets/scss/main.scss';
import './assets/js/main';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './action/authentication/loginAction';
import requireAuth from './utils/requireAuth';

const Root = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
  }
  return (
    <Provider store={store}>
        <Router history = {browserHistory}>
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/recipes/:id" component={RecipeDetailsPage}/>
            <Route path="/add_recipe" component={requireAuth(AddRecipePage)}/>
            <Route path='/my_recipes' component={ requireAuth(MyRecipesPage) } />
            <Route path='/edit_recipe' component={ requireAuth(UpdateRecipePage) } />
          </div>
      </Router>
    </Provider>
  )
};

render(<Root />, document.getElementById('root'));


