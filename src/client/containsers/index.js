import React from 'react';
import { connect } from 'react-redux';
import { Layout, Spin } from 'antd';
import TodoInput from './input/input';
import TodoList from './todolist/todolist';
import Status from './status/status';
const { Header, Content } = Layout;

class Home extends React.Component {
  render() {
    return <Layout>
      <Header style={{width: '100%'}}>
        <h1 style={{color: '#fff'}}>react-redux-todo</h1>
      </Header>
      <Spin spinning={this.props.loading}>
        <Content style={{ padding: '0 50px', margin: '20px 0' }}>
          <div style={{ background: '#fff', padding: 20, minHeight: 900 }}>
            <TodoInput />
            <Status />
            <TodoList />
          </div>
        </Content>
      </Spin>
    </Layout>
  }
}
function mapStateToProps(state) {
  return {
    loading: state.todo.loading
  }
}
export default connect(mapStateToProps)(Home);
