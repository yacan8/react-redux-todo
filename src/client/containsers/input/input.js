import React from 'react';
import { connect } from 'react-redux';
import { Input, Form, message } from 'antd';
import UiActions from '../../actions/index';
import InputActions from '../../actions/input';
const Search = Input.Search;
@Form.create()
class TodoInput extends React.Component {
  addTodo = () => {
    const { form } = this.props;
    const { validateFields, setFieldsValue } = form;
    validateFields((err, values) => {
      if (!err) {
        setFieldsValue({text: ''});
        this.props.onAddClick(values.text);
      } else {
        Object.values(err).forEach(e => {
          e.errors.forEach(_e => {
            message.error(_e.message);
          })
        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        {
          getFieldDecorator('text', {
            initialValue: undefined,
            rules: [
              {required: true, message: '请输入待办项'}
            ]
          })(
            <Search placeholder="input todo text"
              onSearch={this.addTodo}
              enterButton="添加"
              size="large"/>
          )
        }
      </Form>
    );
  }
}
const { addTodo } = InputActions;
const { setLoading } = UiActions;
function mapDispatchToProps(dispatch) {
  return {
    onAddClick: (text) => {
      dispatch((dispatch, getState) => {
        dispatch(setLoading(true))
        return new Promise((resolve, reject) => {
          setTimeout(function() { // 模拟发生请求
            dispatch(addTodo(text));
            dispatch(setLoading(false));
            message.success('添加成功')
          }, 500)
        })
      })
    }
  }
}
export default connect(null, mapDispatchToProps)(TodoInput)
