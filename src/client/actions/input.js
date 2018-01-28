import { createActions } from 'redux-actions';

const actions = createActions({
  ADD_TODO: (value) => ({text: value, completed: false})
})

export default actions;
