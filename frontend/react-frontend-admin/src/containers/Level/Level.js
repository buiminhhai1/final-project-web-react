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

class Level extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      title: '',
      modalName: '',
      confirmName: 'Delete level',
      levelColumns: [
        {
          title: 'Level',
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
                title="edit level"
                onClick={async () => {
                  await this.setState({
                    visible: true,
                    _id: record._id,
                    title: record.title,
                    modalName: 'Edit level'
                  });
                }}
              />
              <Divider type="vertical" />
              <Icon
                type="delete"
                title="delete level"
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
    this.props.onGetListLevel('');
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
    await this.props.onDeleteLevel(_id);
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
      await this.props.onUpdateLevel(_id, title);
      this.setState({
        visible: false,
        confirmLoading: false
      });
    } else {
      await this.props.onCreateLevel(title);
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

  addNewLevel = async () => {
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
                this.props.onGetListLevel(value);
              }}
              enterButton
            />
          </Col>
          <Col span={1} offset={16}>
            <Button type="primary" onClick={this.addNewLevel}>
              Add
            </Button>
          </Col>
        </Row>
        <Spin spinning={this.props.loading}>
          <div style={{ background: 'white' }}>
            <Table
              columns={this.state.levelColumns}
              dataSource={this.props.levelData}
              size="middle"
            />
            {actionMessage}
            {this.props.levelData ? (
              <div>
                <Modal
                  title={this.state.modalName}
                  visible={visible}
                  onOk={this.handleSubmitUpdateForm}
                  confirmLoading={confirmLoading}
                  onCancel={this.handleCancel}
                >
                  <div>
                    <div>
                      Level
                      <span style={{ color: 'red', marginBottom: '5px' }}>
                        *
                      </span>
                    </div>
                    <Input
                      placeholder="Level"
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
                >
                  <span>
                    Do you want to delete
                    {this.state.title}
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
  levelData: state.level.levelData,
  message: state.level.message,
  error: state.level.error,
  loading: state.level.loading
});

const mapDispatchToProps = dispatch => ({
  onCreateLevel: title => dispatch(actions.createLevel(title)),
  onUpdateLevel: (_id, title) => dispatch(actions.updateLevel(_id, title)),
  onDeleteLevel: _id => dispatch(actions.deleteLevel(_id)),
  onGetListLevel: searchString => dispatch(actions.getListLevel(searchString)),
  onRefreshMessage: () => dispatch(actions.refreshMessageCRUD())
});

export default connect(mapStateToProps, mapDispatchToProps)(Level);
