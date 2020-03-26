import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';

export default function WithdrawModal(props) {
  const [email, setEmail] = useState('');

  return (
    <Modal
      title="Please enter your Paypal email"
      visible={props.visible}
      onOk={() => props.withdrawMoney(email)}
      onCancel={() => props.close()}
      footer={[
        <Button key="back" onClick={() => props.close()}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={props.loading}
          onClick={() => props.withdrawMoney(email)}
        >
          Send
        </Button>
      ]}
    >
      <Input
        type="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
    </Modal>
  );
}
