import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  PageHeader,
  Tag,
  Typography,
  Divider,
  Icon,
  Popover,
  Statistic,
  Rate,
  Row,
  Table
} from 'antd';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';

const { Paragraph, Title } = Typography;

class DetailUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home: this.props.location.userDetail ? null : <Redirect to="/" />,
      userColumns: [
        {
          title: 'Stakeholder info',
          dataIndex: 'stakeholder',
          key: 'stakeholder',
          render: (text, record) => {
            return (
              <div key={record._id + 'name'}>
                <strong>{record.nameUserContract}</strong>
                <br />
                <strong>{record.emailUserContract}</strong>
              </div>
            );
          }
        },
        {
          title: 'Time contract',
          dataIndex: 'timecontract',
          key: 'timecontract',
          render: (text, record) => {
            return (
              <div key={record._id + 'time'}>
                from {record.from}
                <br />
                to {record.to}
              </div>
            );
          }
        },
        {
          title: 'Hour & price',
          dataIndex: 'ourRate',
          key: 'ourRate',
          render: (text, record) => {
            return (
              <div key={record._id + 'price'}>
                <strong key={record._id + 'price1'}>
                  {record.totalHourCommit}hrs
                </strong>
                <br />
                <strong key={record._id + 'price2'}>{record.hourRate}$</strong>
              </div>
            );
          }
        },
        {
          title: 'Value',
          dataIndex: 'valueofcontract',
          key: 'valueofcontract',
          render: (text, record) => {
            return (
              <div key={record._id + 'value'}>
                {record.totalHourCommit * record.hourRate} $
              </div>
            );
          }
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (text, record) => {
            let color;
            let mesStatus;
            switch (record.status) {
              case 1:
                color = 'green';
                mesStatus = 'Successed';
                break;
              case 2:
                color = 'red';
                mesStatus = 'Failed';
                break;
              default:
                color = 'blue';
                mesStatus = 'Pending';
                break;
            }
            return (
              <Tag key={record._id + 'status'} color={color}>
                {mesStatus}
              </Tag>
            );
          }
        },
        {
          title: 'Rating',
          dataIndex: 'rating',
          status: 'rating',
          render: (text, record) => (
            <Rate
              type=""
              disabled
              key="ratingkey"
              allowHalf
              value={record.score}
              style={{ fontSize: '15px', marginLeft: '0px' }}
            />
          )
        }
      ]
    };
  }

  componentDidMount() {
    this.props.onRefresherDetailUser();
  }

  render() {
    const {
      email,
      name,
      imageUrl,
      experience,
      isTeacher,
      verify,
      status,
      contracts
    } = this.props.location.userDetail
      ? this.props.location.userDetail
      : {
          email: null,
          name: null,
          imageUrl: null,
          isTeacher: null,
          experience: null,
          verify: null,
          status: null,
          contracts: null
        };
    const extraContent = (
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          justifyContent: 'flex-end'
        }}
      >
        <Statistic
          title="Time commit"
          value={isTeacher ? status.timeCommit + ' h' : null}
          style={{
            marginRight: 32
          }}
        />
        <Statistic
          title="Hour rate"
          prefix="$"
          value={isTeacher ? status.hourRate : null}
        />
      </div>
    );
    const content = (
      <div className="content">
        <Title level={3}>User profiles</Title>
        <Divider />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Title level={4}>
            {experience
              ? experience.skill.map((item, index) => {
                  if (index === experience.skill.length - 1) return item.title;
                  return item.title + ' - ';
                })
              : null}
          </Title>
          {isTeacher ? extraContent : null}
        </div>
        <Paragraph>
          {experience && experience.introduction
            ? experience.introduction.description
            : null}
        </Paragraph>
        {isTeacher ? (
          <div>
            <Divider />
            <Title level={4}>Level</Title>
            <div>
              {isTeacher ? (
                <Tag key={experience.level._id} color="geekblue">
                  {experience.level.title.toUpperCase()}
                </Tag>
              ) : null}
            </div>
            <Divider />
            <Title level={4}>Skill</Title>
            <div>
              {experience.skill.map(item => (
                <Tag key={item._id} color="geekblue">
                  {item.title.toUpperCase()}
                </Tag>
              ))}
            </div>
            <Divider />
            <Title level={4}>Education Level</Title>
            <div>
              {experience.educationLevel.map(item => (
                <Tag key={item._id} color="geekblue">
                  {item.title.toUpperCase()}
                </Tag>
              ))}
            </div>
            <Divider />
            <Title level={4}>Teaching location</Title>
            <div>
              <Tag key={experience.location._id} color="geekblue">
                {experience.location.city.toUpperCase()}
              </Tag>
              {experience.location.district.map(item => (
                <Tag color="green" key={item._id}>
                  {item.name}
                </Tag>
              ))}
              <Divider />
            </div>
          </div>
        ) : null}
        <Title level={4}>History Contract</Title>
        <Table
          bordered
          columns={this.state.userColumns}
          dataSource={contracts}
          rowKey={record => {
            return record._id;
          }}
        />
      </div>
    );

    return (
      <div style={{ background: 'white' }}>
        {this.state.home}
        <PageHeader
          title={name}
          style={{
            border: '1px solid rgb(235, 237, 240)',
            background: 'white!important'
          }}
          subTitle={email}
          tags={
            isTeacher ? (
              <Tag color="#87d068">Teacher</Tag>
            ) : (
              <Tag color="#2db7f5">Student</Tag>
            )
          }
          avatar={{
            src: imageUrl
          }}
          extra={[
            isTeacher ? (
              <Popover
                key={name + 'title'}
                content={
                  <div>
                    {status.availability
                      ? 'Teacher is free now'
                      : 'Teacher is busy now'}
                  </div>
                }
                trigger="hover"
              >
                <Tag color={status.availability ? '#2db7f5' : '#f50'}>
                  Availability
                </Tag>
              </Popover>
            ) : null,
            verify ? (
              <Popover
                key={name}
                content={<div>Verified user</div>}
                trigger="hover"
              >
                <Icon
                  type="check-circle"
                  theme="twoTone"
                  twoToneColor="#52c41a"
                />
              </Popover>
            ) : null,
            isTeacher ? (
              <div key="ratingdiv">
                <Row key="ratingrow">
                  <Rate
                    type=""
                    disabled
                    key="ratingkey"
                    allowHalf
                    defaultValue={0}
                    style={{ fontSize: '18px', marginLeft: '0px' }}
                  />
                </Row>
                <Row key="valuerating">haha</Row>
              </div>
            ) : null
          ]}
        >
          {content}
        </PageHeader>
      </div>
    );
  }
}

const mapDispatchtoProps = dispatch => ({
  onRefresherDetailUser: () => dispatch(actions.refreshMessageUUser())
});
export default connect(null, mapDispatchtoProps)(DetailUser);
