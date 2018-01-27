import actions from '../actions/status';
const { statusChange } = actions;
export default {
  [statusChange]: (state, action) => {
    const status = action.payload;
    return { ...state, showStatus: status }
  }
};
