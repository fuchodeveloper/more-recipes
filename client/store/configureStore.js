import { createStore, applyMiddleware, compose } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import thunk from 'redux-thunk';
import rootReducer from '../rootReducer';

const configureStore = () => {
  if (process.env.NODE_ENV === 'production') {
    return createStore(
      enableBatching(rootReducer),
      compose(applyMiddleware(thunk))
    );
  }
  return createStore(
    enableBatching(rootReducer),
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
};

export default configureStore;
