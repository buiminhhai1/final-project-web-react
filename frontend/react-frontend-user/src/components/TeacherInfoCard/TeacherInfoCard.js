import React from 'react';
import { Card, Avatar, Tag, Divider, Badge } from 'antd';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import './TeacherInfoCard.css';

const { Meta } = Card;

export default function TeacherInfoCard(props) {
  return (
    <div>
      <Card
        className="shadow"
        style={{ width: 220, margin: 8, borderRadius: 5, height: 300 }}
        bodyStyle={{ paddingTop: 0 }}
        loading={props.loading}
        cover={
          <Meta
            style={{ paddingLeft: 16, paddingTop: 16, borderRadius: 5 }}
            avatar={
              <Badge status="success">
                <Avatar
                  className="mr-2 border"
                  size={64}
                  src={props.imageUrl}
                />
              </Badge>
            }
            title={<b className="d-flex align-items-start">{props.name}</b>}
            description={
              <div className="d-flex align-items-start flex-column">
                <p className="m-0">
                  <b style={{ color: '#85bb65' }}>${props.hourPay}</b> /hour
                </p>
                <p className="m-0">
                  <b style={{ color: '#ffbf00' }}>{props.hourWork}</b> hours
                </p>
                <p className="m-0">{props.city}</p>
              </div>
            }
          />
        }
      >
        <Meta
          description={
            <div>
              <Divider />
              <div
                className="subjectTags"
                style={{ marginBottom: 10, overflowY: 'auto', height: 90 }}
              >
                {props.subjects.map(subject => (
                  <Tag
                    key={subject._id}
                    color="#20232A"
                    onClick={() => props.subjectSearch(subject.title)}
                  >
                    {subject.title}
                  </Tag>
                ))}
              </div>
              <div className="d-flex justify-content-center">
                <NavLink to={`/user-profile?userId=${props.userId}`} exact>
                  <Button variant="outline-primary" style={{ fontSize: 15 }}>
                    <b>View profile</b>
                  </Button>
                </NavLink>
              </div>
            </div>
          }
        />
      </Card>
    </div>
  );
}
