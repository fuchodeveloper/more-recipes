/* eslint-disable react/jsx-filename-extension, max-len */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { browserHistory } from 'react-router';
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
import LoginPage from './components/auth/LoginPage';
import './assets/scss/main.scss';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './action/authentication/loginAction';
import logout from './action/authentication/logoutAction';
import requireAuth from './utils/requireAuth';
import NotFound from './components/errors/NotFound';
import Header from './components/navigation/Header';
import Footer from './components/navigation/Footer';
import ErrorBoundary from './components/errors/ErrorBoundary';
import configureStore from './store/configureStore';

const Root = () => {
  const store = configureStore();

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
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/recipes/:id" component={RecipeDetails} />
              <Route exact path="/search" component={RecipeSearchPage} />
              <Route exact path="/add" component={requireAuth(AddRecipePage)} />
              <Route exact path="/:name/recipes" component={requireAuth(MyRecipesPage)} />
              <Route exact path="/favorites" component={requireAuth(FavoriteRecipesPage)} />
              <Route exact path="/profile" component={requireAuth(ProfilePage)} />
              <Route exact path="/update/:id" component={requireAuth(UpdateRecipePage)} />
              <Route exact path="/votes" component={MostUpvotesPage} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </ErrorBoundary>
        </div>
      </Router>
    </Provider>
  );
};

render(<Root />, document.getElementById('root'));
