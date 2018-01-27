import React from 'react';
import { connect } from 'react-redux';
import { Radio } from 'antd';
import statusActions from '../../actions/status';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class Status extends React.Component {
  render() {
    return (<div style={{marginTop: 20}}>
      <RadioGroup value={this.props.value} onChange={this.props.onChange}>
        <RadioButton value="SHOW_ALL">全部</RadioButton>
        <RadioButton value="SHOW_ACTIVE">未完成</RadioButton>
        <RadioButton value="SHOW_COMPLETED">已完成</RadioButton>
      </RadioGroup>
    </div>);
  }
}
const { statusChange } = statusActions;
function mapStateToProps(state) {
  return {
    value: state.todo.showStatus
  }
}
function mapDispatchToProps(dispatch) {
  return {
    onChange: e => {
      dispatch(statusChange(e.target.value))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Status);
