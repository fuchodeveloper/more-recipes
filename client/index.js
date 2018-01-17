/* eslint-disable react/jsx-filename-extension, max-len */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { enableBatching } from 'redux-batched-actions';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import Home from './components/Home';
import SignUp from './components/auth/SignUp';
import RecipeDetails from './components/recipes/RecipeDetails';
import AddRecipePage from './components/recipes/AddRecipePage';
import MyRecipesPage from './components/recipes/MyRecipesPage';
import UpdateRecipePage from './components/recipes/UpdateRecipePage';
import FavoriteRecipesPage from './components/favorites/FavoriteRecipesPage';
import MostUpvotesPage from './components/most-upvotes/MostUpvotesPage';
import ProfilePage from './components/profile/ProfilePage';
import RecipeSearchPage from './components/recipes/RecipeSearchPage';
import CategoriesPage from './components/categories/CategoriesPage';
import Category from './components/categories/Category';
import rootReducer from './rootReducer';
import LoginPage from './components/auth/LoginPage';
import './assets/scss/main.scss';
import './assets/js/main';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './action/authentication/loginAction';
import logout from './action/authentication/logoutAction';
import requireAuth from './utils/requireAuth';
import NotFound from './components/errors/NotFound';
import Header from './components/navigation/Header';
import Footer from './components/navigation/Footer';
import ErrorBoundary from './components/errors/ErrorBoundary';

const Root = () => {
  const store = createStore(
    enableBatching(rootReducer),
    compose(
      applyMiddleware(thunk),
      process.env.NODE_ENV === 'development' &&
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (localStorage.jwtToken) {
    const timeNow = Math.ceil(new Date().getTime() / 1000);
    const token = jwtDecode(localStorage.jwtToken);
    const tokenExpiryTime = token.exp;

    if (tokenExpiryTime < timeNow) {
      store.dispatch(logout());
    } else {
      setAuthorizationToken(localStorage.jwtToken);
      store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
    }
  }

  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <div>
          <ErrorBoundary>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={LoginPage} />
              <Route path="/recipes/:id" component={RecipeDetails} />
              <Route path="/search" component={RecipeSearchPage} />
              <Route path="/add" component={requireAuth(AddRecipePage)} />
              <Route path="/:name/recipes" component={requireAuth(MyRecipesPage)} />
              <Route path="/favorites" component={requireAuth(FavoriteRecipesPage)} />
              <Route path="/profile" component={requireAuth(ProfilePage)} />
              <Route path="/edit_recipe/:id" component={requireAuth(UpdateRecipePage)} />
              <Route path="/categories" component={requireAuth(CategoriesPage)} />
              <Route path="/category/breakfast" component={requireAuth(Category)} />
              <Route path="/votes" component={MostUpvotesPage} />
              <Route path="*" component={NotFound} />
            </Switch>
            <Footer />
          </ErrorBoundary>
        </div>
      </Router>
    </Provider>
  );
};

render(<Root />, document.getElementById('root'));
