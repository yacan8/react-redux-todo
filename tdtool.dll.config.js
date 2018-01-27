const path = require('path');
const isDebug = process.env.NODE_ENV !== 'production';
module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'redux-thunk', 'redux-promise', 'reselect', ...isDebug ? ['redux-logger'] : []]
  },
  path: path.join(process.cwd(), isDebug ? 'dll-dev' : 'dll'),
  debug: isDebug
};
