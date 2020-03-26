import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';

const { TextArea } = Input;

export default function ComplainModal(props) {
  const [message, setMessage] = useState('');

  return (
    <Modal
      title="Write your complain"
      visible={props.visible}
      onOk={() => props.sendComplain(message)}
      onCancel={() => props.close()}
      footer={[
        <Button key="back" onClick={() => props.close()}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={props.loading}
          onClick={() => props.sendComplain(message)}
        >
          Send
        </Button>
      ]}
    >
      <TextArea
        rows={4}
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
    </Modal>
  );
}
