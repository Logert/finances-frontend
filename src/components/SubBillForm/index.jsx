import React, { Component } from 'react';
import {
  Form,
  Input,
  Select,
} from 'antd';
import PT from 'prop-types';
import ImPT from 'react-immutable-proptypes';

class SubBill extends Component {
  static propTypes = {
    form: PT.object,
    bills: ImPT.list.isRequired,
    currency: ImPT.list.isRequired,
    data: PT.object,
  };

  constructor(props) {
    super(props);
  }

  getBills = bills => bills.map(bill => {
    const values = {
      value: bill.get('id'),
      label: bill.get('name'),
    };
    if (bill.get('children')) {
      values.children = this.getBills(bill.get('children') || []);
    }
    return values;
  }).toJS();

  render() {
    const { bills, currency } = this.props;
    const { getFieldDecorator } = this.props.form;

    const layout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
    };

    const currencySelector = getFieldDecorator('currency', { initialValue: 'BYN' })(
      <Select>
        {
          currency.map(curr => (
            <Select.Option key={curr.get('id')} value={curr.get('name')}>{curr.get('name')}</Select.Option>
          ))
        }
      </Select>
    );

    return (
      <Form layout="horizontal">
        <Form.Item label="Название субсчета" {...layout}>
          {getFieldDecorator('name', {
            initialValue: this.props.data.name,
            rules: [{ required: true, message: 'Введите наименование!' }],
          })(<Input/>)}
        </Form.Item>
        <Form.Item label="Начальный баланс" {...layout}>
          {getFieldDecorator('balance', {
            initialValue: this.props.data.balance || 0,
            rules: [{ required: true, message: 'Введите баланс!' }],
          })(<Input type="number" addonAfter={currencySelector}/>)}
        </Form.Item>
        <Form.Item label="Субсчет для" {...layout}>
          {getFieldDecorator('bill_id', {
            initialValue: this.props.data.bill_id,
            rules: [{ required: true, message: 'Выберите субсчет!' }],
          })(<Select>
            {
              bills.map(curr => (
                <Select.Option key={curr.get('id')} value={curr.get('id')}>{curr.get('name')}</Select.Option>
              ))
            }
          </Select>)}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(SubBill);
