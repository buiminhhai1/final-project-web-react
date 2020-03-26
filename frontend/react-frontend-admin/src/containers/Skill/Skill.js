import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Spin,
  Icon,
  Divider,
  Tag,
  Modal,
  Input,
  message,
  Col,
  Row,
  Button
} from 'antd';
import 'antd/dist/antd.css';
import * as actions from '../../store/actions/index';

const { Search } = Input;

class Skill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      title: '',
      modalName: '',
      confirmName: 'Delete skill',
      skillColumns: [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          render: text => (
            <Tag color={'geekblue'} key={text}>
              <strong>{text.toUpperCase()}</strong>
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
                    title: record.title,
                    modalName: 'Edit skill'
                  });
                }}
              />
              <Divider type="vertical" />
              <Icon
                type="delete"
                title="delete skill"
                onClick={async () => {
                  await this.setState({
                    visibleConfirm: true,
                    _id: record._id,
                    title: record.title
                  });
                }}
              />
            </span>
          )
        }
      ],
      visible: false,
      visibleConfirm: false,
      confirmLoading: false
    };
  }

  componentDidMount() {
    this.props.onGetListSkill('');
  }

  componentDidUpdate() {
    this.props.onRefreshMessage();
    if (this.props.error) {
      this.render.actionMessage = message.error(this.props.message);
    } else if (this.props.message) {
      this.render.actionMessage = message.success(this.props.message);
    }
  }

  handleDeleteForm = async () => {
    const { _id } = this.state;
    await this.props.onDeleteSkill(_id);
    this.setState({
      visibleConfirm: false,
      confirmLoading: false
    });
  };

  handleSubmitUpdateForm = async () => {
    this.setState({
      confirmLoading: true
    });
    const { _id, title } = this.state;
    if (_id) {
      await this.props.onUpdateSkill(_id, title);
      this.setState({
        visible: false,
        confirmLoading: false
      });
    } else {
      await this.props.onCreateSkill(title);
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      visibleConfirm: false
    });
  };

  onTitleChange = ({ target: { value } }) => {
    this.setState({ title: value });
  };

  addNewSkill = async () => {
    this.setState({
      visible: true,
      _id: '',
      title: '',
      modalName: 'Add skill'
    });
  };

  render() {
    const { visible, confirmLoading, visibleConfirm } = this.state;
    const actionMessage = null;

    return (
      <div>
        <Row style={{ margin: '10px 0 20px 0' }}>
          <Col span={6} offset={0}>
            <Search
              placeholder="input search text"
              onSearch={value => {
                this.props.onGetListSkill(value);
              }}
              enterButton
            />
          </Col>
          <Col span={1} offset={16}>
            <Button type="primary" onClick={this.addNewSkill}>
              Add
            </Button>
          </Col>
        </Row>
        <Spin spinning={this.props.loading}>
          <div style={{ background: 'white' }}>
            <Table
              columns={this.state.skillColumns}
              dataSource={this.props.skillData}
              size="middle"
            />
            {actionMessage}
            {this.props.skillData ? (
              <div>
                <Modal
                  title={this.state.modalName}
                  visible={visible}
                  onOk={this.handleSubmitUpdateForm}
                  confirmLoading={confirmLoading}
                  onCancel={this.handleCancel}
                  footer={[
                    <Button key="back" onClick={this.handleCancel}>
                      Cancel
                    </Button>,
                    <Button
                      key="Block"
                      type="primary"
                      onClick={this.handleSubmitUpdateForm}
                      disabled={!this.state.title}
                    >
                      Save
                    </Button>
                  ]}
                >
                  <div>
                    <div>
                      Skill
                      <span style={{ color: 'red', marginBottom: '5px' }}>
                        *
                      </span>
                    </div>
                    <Input
                      placeholder="Skill"
                      value={this.state.title}
                      onChange={this.onTitleChange}
                    />
                  </div>
                </Modal>
                <Modal
                  title={this.state.confirmName}
                  visible={visibleConfirm}
                  onOk={this.handleDeleteForm}
                  confirmLoading={confirmLoading}
                  onCancel={this.handleCancel}
                  footer={[
                    <Button key="back" onClick={this.handleCancel}>
                      Cancel
                    </Button>,
                    <Button
                      key="Block"
                      type="danger"
                      onClick={this.handleDeleteForm}
                      disabled={!this.state._id}
                    >
                      Delete
                    </Button>
                  ]}
                >
                  <span>
                    Do you want to delete
                    {' ' + this.state.title}
                  </span>
                </Modal>
              </div>
            ) : null}
          </div>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  skillData: state.skill.skillData,
  message: state.skill.message,
  error: state.skill.error,
  loading: state.skill.loading
});

const mapDispatchToProps = dispatch => ({
  onCreateSkill: title => dispatch(actions.createSkill(title)),
  onUpdateSkill: (_id, title) => dispatch(actions.updateSkill(_id, title)),
  onDeleteSkill: _id => dispatch(actions.deleteSkill(_id)),
  onGetListSkill: searchString => dispatch(actions.getListSkill(searchString)),
  onRefreshMessage: () => dispatch(actions.refreshMessageCRUD())
});

export default connect(mapStateToProps, mapDispatchToProps)(Skill);
