import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Spin, Icon, Divider, Tag, Modal, Input, message } from 'antd';
import * as actions from '../../store/actions/index';

class Skill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      title: '',
      skillColumns: [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          render: text => (
            <Tag color={'green'} key={text}>
              {text.toUpperCase()}
            </Tag>
          )
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span>
              <Icon
                type="edit"
                title="edit skill"
                onClick={async () => {
                  await this.setState({
                    visible: true,
                    _id: record._id,
                    title: record.title
                  });
                }}
              />
              <Divider type="vertical" />
              <Icon type="delete" title="delete skill" />
            </span>
          )
        }
      ],
      visible: false,
      confirmLoading: false
    };
  }

  componentDidMount() {
    this.props.onGetListSkill();
  }

  handleSubmitUpdateForm = async () => {
    this.setState({
      confirmLoading: true
    });
    const { _id, title } = this.state;
    await this.props.onUpdateSkill(_id, title);
    this.setState({
      visible: false,
      confirmLoading: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  onTitleChange = ({ target: { value } }) => {
    this.setState({ title: value });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    let skillResult = <Spin indicator={antIcon} />;
    if (this.props.skillData) {
      skillResult = (
        <Table
          columns={this.state.skillColumns}
          dataSource={this.props.skillData}
        />
      );
    }
    let actionMessage = null;
    if (this.props.error) {
      actionMessage = message.error(this.props.message);
    } else if (this.props.message) {
      actionMessage = message.success(this.props.message);
    }

    return (
      <div>
        {skillResult}
        {actionMessage}
        {this.props.skillData ? (
          <Modal
            title="Edit Skill"
            visible={visible}
            onOk={this.handleSubmitUpdateForm}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
            <div>
              <div>
                Title
                <span style={{ color: 'red' }}>*</span>
              </div>
              <Input
                placeholder="Title"
                value={this.state.title}
                onChange={this.onTitleChange}
              />
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  skillData: state.skill.skillData,
  skillColumns: state.skill.skillColumns,
  message: state.skill.message,
  error: state.skill.error
});

const mapDispatchToProps = dispatch => ({
  onCreateSkill: title => dispatch(actions.createSkill(title)),
  onUpdateSkill: (_id, title) => dispatch(actions.updateSkill(_id, title)),
  onDeleteSkill: _id => dispatch(actions.deleteSkill(_id)),
  onGetListSkill: () => dispatch(actions.getListSkill())
});

export default connect(mapStateToProps, mapDispatchToProps)(Skill);
