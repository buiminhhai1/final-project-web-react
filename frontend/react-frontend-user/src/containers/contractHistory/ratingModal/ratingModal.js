import React, { useState } from 'react';
import { Modal, Button, Input, Rate } from 'antd';

const { TextArea } = Input;
const ratingLevel = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

export default function RatingModal(props) {
  const [message, setMessage] = useState('');
  const [rate, setRate] = useState(3);

  return (
    <Modal
      title="Rating"
      visible={props.visible}
      onOk={() => props.submitRating(message)}
      onCancel={() => props.close()}
      footer={[
        <Button key="back" onClick={() => props.close()}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={props.loading}
          onClick={() => props.submitRating({ message, rate })}
        >
          Rating
        </Button>
      ]}
    >
      <span className="d-flex justify-content-center align-items-center mb-3">
        <Rate
          tooltips={ratingLevel}
          onChange={value => setRate(value)}
          value={rate}
        />
        {rate ? (
          <span className="ant-rate-text">{ratingLevel[rate - 1]}</span>
        ) : (
          ''
        )}
      </span>
      <TextArea
        rows={4}
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Leave a comment"
      />
    </Modal>
  );
}
