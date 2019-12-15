import React, { Component } from 'react';
import TeacherInfoCard from '../../components/TeacherInfoCard/TeacherInfoCard';

export default class homepage extends Component {
    render() {
        return (
            <div>
                <TeacherInfoCard loading={false} />
            </div>
        )
    }
}
