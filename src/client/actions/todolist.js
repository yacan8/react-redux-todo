import { createActions } from 'redux-actions';

const actions = createActions({
  TOGGLE_TODO: id => id,
  TODO_DELETE: id => id
})

export default actions;
