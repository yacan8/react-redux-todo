import { createActions } from 'redux-actions';

const actions = createActions({
  ADD_TODO: (value) => ({text: value, computed: false})
})

export default actions;
