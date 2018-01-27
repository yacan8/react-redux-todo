import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import initialState from './initialState';
import inputReducersHandle from './input';
import todolistReducersHandle from './todolist';
import statusReducersHandle from './status';
import actions from '../actions';
const { setLoading } = actions;
const loadingReducerHandle = {
  [setLoading](state, action) {
    return {...state, loading: action.payload};
  }
}
const reducers = handleActions(Object.assign({},
  inputReducersHandle,
  loadingReducerHandle,
  todolistReducersHandle,
  statusReducersHandle),
initialState);
const rootReducer = combineReducers({
  todo: reducers
});

export default rootReducer;
