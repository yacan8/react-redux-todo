import actions from '../actions/input';
const { addTodo } = actions;
export default {
  [addTodo]: (state, {payload: { text, completed }}) => {
    const { todolist } = state;
    todolist.push({
      id: todolist.length ? todolist[todolist.length - 1].id + 1 : 1, text, completed
    })
    return { ...state, todolist: todolist.slice(0) }
  }
};
