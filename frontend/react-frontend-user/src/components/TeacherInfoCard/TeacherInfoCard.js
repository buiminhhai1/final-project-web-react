import React from 'react';
import { Card, Avatar, Tag, Button } from 'antd';

import './TeacherInfoCard.css'

const { Meta } = Card;

export default function TeacherInfoCard(props) {
    return (
        <div>
            <Card style={{ width: 300, margin: 8, borderRadius: 5 }}
                loading={props.loading} hoverable
                cover={
                    <Meta
                        style={{ padding: 16, marginBottom: 0, backgroundColor: '#E8E8E8', borderRadius: 5 }}
                        avatar={
                            <Avatar size="large"
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title="Name"
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
                            <div style={{ marginBottom: 10 }}>
                                <Tag color="#f50">Math</Tag>
                                <Tag color="#2db7f5">Literature</Tag>
                                <Tag color="#87d068">Physics</Tag>
                                <Tag color="#108ee9">Chemistry</Tag>
                            </div>
                            <Button type="primary"
                            // style={{ backgroundColor: '#EFBB2D', color: '#4e8ac9' }}
                            >
                                <b>View profile</b>
                            </Button>
                        </div>
                    }
                />
            </Card>
        </div>
    )
}
