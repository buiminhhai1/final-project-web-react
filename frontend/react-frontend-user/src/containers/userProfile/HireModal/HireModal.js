import React, { useState } from 'react';
import { Modal, Button, Form, DatePicker, Input } from 'antd';

const { RangePicker } = DatePicker;

function HireModal(props) {
  const [money, setMoney] = useState(0);
  const [time, setTime] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      // Should format date value before submit.
      const rangeValue = fieldsValue['range-picker'];
      const values = {
        date: [
          rangeValue[0].format('YYYY-MM-DD'),
          rangeValue[1].format('YYYY-MM-DD')
        ],
        time,
        money
      };
      props.hireTeacher(values);
    });
  }

  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 7 },
      sm: { span: 7 }
    },
    wrapperCol: {
      xs: { span: 16 },
      sm: { span: 16 }
    }
  };

  const rangeConfig = {
    rules: [{ type: 'array', required: true, message: 'Please select time!' }]
  };

  const totalTimeConfig = {
    rules: [
      {
        required: true,
        message: 'Please enter the total time!'
      }
    ]
  };

  return (
    <Modal
      title="Contract's information"
      visible={props.visible}
      onOk={() => props.handleHireTeacher()}
      onCancel={() => props.close()}
      footer={[
        <h5 key="money">
          <b>$</b>
          {money}
        </h5>,
        <Button key="back" onClick={() => props.close()}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={props.loading}
          onClick={e => handleSubmit(e)}
        >
          Confirm
        </Button>
      ]}
    >
      <Form {...formItemLayout}>
        <Form.Item label="Coures time">
          {getFieldDecorator('range-picker', rangeConfig)(<RangePicker />)}
        </Form.Item>
        <Form.Item label="Total time(hours)">
          {getFieldDecorator(
            'total-time',
            totalTimeConfig
          )(
            <Input
              type="number"
              onChange={e => {
                setTime(e.target.value * 1);
                setMoney(e.target.value * props.hourPay);
              }}
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Form.create({ name: 'hire-modal' })(HireModal);
