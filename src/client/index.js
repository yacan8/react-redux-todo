import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store/configureStore';
import App from './app';
const MOUNT_NODE = document.getElementById('app');

const store = configureStore();

function render() {
  ReactDOM.render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
    MOUNT_NODE
  );
}
try {
  render();
} catch (e) {
  console.error(e);
}

if (module.hot) {
  module.hot.accept(['./reducers', './app'], () => {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      const nextReducer = require('./reducers').default;
      store.replaceReducer(nextReducer);
      render();
    });
  });
}
