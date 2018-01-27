import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { List, Icon, Tooltip } from 'antd';
import todolistActions from '../../actions/todolist';
import './todolist.less';

class TodoList extends React.Component {
  render() {
    const { todolist } = this.props;
    return <div style={{marginTop: 10}}>
      <List
        header={<div>待办项列表</div>}
        dataSource={todolist}
        renderItem={item => (<List.Item>
          <div className="todo-item">
            <a onClick={this.props.onTodoClick(item.id)} className={item.computed ? 'completed' : ''} href="javascript:;">{item.text}</a>
            <a onClick={this.props.onTodoDeleteClick(item.id)} className="pull-right" href="javascript:;">
              <Tooltip title="删除">
                <Icon type="delete"/>
              </Tooltip>
            </a>
          </div>
        </List.Item>)}
      />
    </div>;
  }
}

const getVisibilityFilter = state => state.todo.showStatus

const getTodos = state => state.todo.todolist

const getVisibleTodos = createSelector([getVisibilityFilter, getTodos], (visibilityFilter, todos) => {
  console.log(todos);
  switch (visibilityFilter) {
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed)
    default:
      return todos
  }
})
const mapStateToProps = (state, props) => {
  const todolist = getVisibleTodos(state, props);
  return {
    todolist
  }
}
const { toggleTodo, todoDelete } = todolistActions;
const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      return e => {
        dispatch(toggleTodo(id))
      }
    },
    onTodoDeleteClick: (id) => {
      return e => {
        dispatch(todoDelete(id))
      }
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
