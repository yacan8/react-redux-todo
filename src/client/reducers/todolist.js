import actions from '../actions/todolist';
const { toggleTodo, todoDelete } = actions;
export default {
  [toggleTodo](state, action) {
    const id = action.payload;
    const { todolist } = state;
    todolist.forEach(item => {
      if (item.id === id) {
        item.computed = !item.computed;
      }
    })
    return { ...state, todolist: todolist.slice(0) }
  },
  [todoDelete](state, action) {
    const id = action.payload;
    const { todolist } = state;
    return { ...state, todolist: todolist.filter(item => item.id !== id) }
  }
};
