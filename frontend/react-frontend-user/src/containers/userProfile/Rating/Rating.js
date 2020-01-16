import React from 'react';
// import { Row, Col } from 'react-bootstrap';
import { Rate } from 'antd';

import './Rating.css'

export default function Rating(props) {
    return (
        <div className="row">
            <div className="col d-flex flex-column" sm>
                <h5 className="mb-0"><b>{props.name}</b></h5>
                <div className="mb-0 d-flex align-items-center">
                    <Rate className="rating"
                        style={{ fontSize: 13, marginRight: 5, color: '#61DAFB' }}
                        disabled
                        defaultValue={props.rate} />
                    <b className="mr-2">{props.rate}.00</b>
                    {props.startDate.slice(0, -3).replace('-', '/')} - {props.endDate.slice(0, -3).replace('-', '/')}
                </div>
                <i style={{ whiteSpace: 'pre-wrap' }}>{props.review}</i>
            </div>
            <div className="col d-flex flex-column align-items-end flex-responsive" sm>
                <b>${props.hourPay * props.hourWork}</b>
                <p className="mb-0">${props.hourPay}.00 / hr</p>
                <h6>{props.hourWork} hours</h6>
            </div>
        </div>
    )
}
