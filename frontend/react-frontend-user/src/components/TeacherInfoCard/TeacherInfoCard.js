import React from 'react';
import { Card, Avatar, Tag, Button, Divider } from 'antd';
import { NavLink } from 'react-router-dom';

import './TeacherInfoCard.css'

const { Meta } = Card;

export default function TeacherInfoCard(props) {
    return (
        <div>
            <Card className="shadow"
                style={{ width: 250, margin: 8, borderRadius: 5 }}
                bodyStyle={{ paddingTop: 0 }}
                loading={props.loading}
                cover={
                    <Meta
                        style={{ paddingLeft: 16, paddingTop: 16, borderRadius: 5 }}
                        avatar={
                            <Avatar size="large"
                                src={props.imageUrl} />
                        }
                        title={props.name}
                        description={
                            <div>
                                <p><b>$100</b> /hr</p>
                                <p>District 8, Ho Chi Minh City</p>
                            </div>
                        }
                    />
                }>
                <Meta
                    description={
                        <div>
                            <Divider />
                            <div style={{ marginBottom: 10 }}>
                                <Tag color="#f50">Math</Tag>
                                <Tag color="#2db7f5">Literature</Tag>
                                <Tag color="#87d068">Physics</Tag>
                                <Tag color="#108ee9">Chemistry</Tag>
                            </div>
                            <NavLink to={`/user-profile?userId=${props.userId}`} exact>
                                <Button type="primary">
                                    <b>View profile</b>
                                </Button>
                            </NavLink>
                        </div>
                    }
                />
            </Card>
        </div>
    )
}
