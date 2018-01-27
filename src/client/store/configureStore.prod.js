import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import promiseMiddleware from 'redux-promise';

export default function configureStore(initialState) {
  return createStore(rootReducer,
    initialState,
    applyMiddleware(
      thunk,
      promiseMiddleware,
    )
  );
}
