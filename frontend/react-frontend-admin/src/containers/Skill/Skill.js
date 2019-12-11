import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import * as actions from '../../store/actions/index';

class Skill extends Component {
  componentDidMount() {
    this.props.onGetListSkill();
  }

  render() {
    const columns = this.props.columnsSkill;
    const data = this.props.skillData;
    return <Table columns={columns} dataSource={data} />;
  }
}
const mapStateToProps = state => ({
  skillData: state.skill.skillData,
  skillColumns: state.skill.skillColumns
});

const mapDispatchToProps = dispatch => ({
  onCreateSkill: (title, content) =>
    dispatch(actions.createSkill(title, content)),
  onUpdateSkill: (_id, title, content) =>
    dispatch(actions.updateSkill(_id, title, content)),
  onDeleteSkill: _id => dispatch(actions.deleteSkill(_id)),
  onGetListSkill: () => dispatch(actions.getListSkill())
});

export default connect(mapStateToProps, mapDispatchToProps)(Skill);
