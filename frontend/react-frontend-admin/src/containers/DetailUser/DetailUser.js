import React, { Component } from 'react';
import { PageHeader, Tag, Typography, Divider } from 'antd';
import { Redirect } from 'react-router-dom';

const { Paragraph, Title } = Typography;

class DetailUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home: this.props.location.userDetail ? null : <Redirect to="/" />
    };
  }

  componentDidMount() {
    console.log('test nav link params');
    console.log(this.props.location.userDetail);
    console.log(this.props);
  }

  render() {
    const { email, name, imageUrl, experience, isTeacher } = this.props.location
      .userDetail
      ? this.props.location.userDetail
      : {
          email: null,
          name: null,
          imageUrl: null,
          isTeacher: null,
          experience: null
        };
    const content = (
      <div className="content">
        <Title level={3}>User profiles</Title>
        <Divider />
        <Title level={4}>
          {experience
            ? experience.skill.map(item => {
                return item.title + ' - ';
              })
            : null}
        </Title>
        <Paragraph>
          {experience && experience.introduction
            ? experience.introduction.description
            : null}
        </Paragraph>
        <Paragraph>
          Ant Design&#x27;s design team preferred to design with the HSB color
          model, which makes it easier for designers to have a clear
          psychological expectation of color when adjusting colors, as well as
          facilitate communication in teams.
        </Paragraph>
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
        >
          {content}
        </PageHeader>
      </div>
    );
  }
}

export default DetailUser;
