import React, { Component } from 'react';
import {
  Form,
  Input,
} from 'antd';
import PT from 'prop-types';

class Bill extends Component {
  static propTypes = {
    form: PT.object,
    data: PT.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    return (
      <Form layout="horizontal">
        <Form.Item label="Наименование" {...layout}>
          {getFieldDecorator('name', {
            initialValue: this.props.data.name,
            rules: [{ required: true, message: 'Введите наименование!' }],
          })(<Input/>)}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(Bill);
