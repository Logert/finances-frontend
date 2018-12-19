import React, { Component } from 'react';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Cascader,
  Radio,
  Icon,
} from 'antd';
import PT from 'prop-types';
import ImPT from 'react-immutable-proptypes';
import moment from 'moment';

import op from 'constants/operations';

class Operation extends Component {
  static propTypes = {
    form: PT.object,
    bills: ImPT.list.isRequired,
    category: ImPT.list.isRequired,
    currency: ImPT.list.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      operation: op.INCOME,
    };
  }

  handleChangeOperation = e => {
    this.setState({ operation: e.target.value });
  };

  getBills = (bills, child) => bills.map(bill => {
    const values = {
      value: bill.get('id'),
      label: bill.get('name'),
    };
    if (bill.get('children')) {
      values.children = this.getBills(bill.get('children'), true);
    } else {
      values.disabled = !child;
    }
    return values;
  }).toJS();

  getCategory = (category, child) => category.map(cat => {
    const values = {
      value: cat.get('id'),
      label: cat.get('name'),
    };
    if (cat.get('children')) {
      values.children = this.getCategory(cat.get('children'), true);
    } else {
      values.disabled = !child;
    }
    if (cat.get('icon')) {
      values.icon = cat.get('icon');
    }
    return values;
  }).toJS();

  displayRender = (labels, selectedOptions) => labels.map((label, i) => {
    const option = selectedOptions[i];
    if (i === 0) {
      return (<span key={option.value}><Icon type={option.icon}/> {label} / </span>);
    }
    return <span key={option.value}>{label}</span>;
  });

  render() {
    const { bills, category, currency } = this.props;
    const { getFieldDecorator } = this.props.form;

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    const optionsBills = this.getBills(bills);

    const optionsCategory = this.getCategory(category);

    const currencySelector = getFieldDecorator('currency', { initialValue: 'BYN' })(
      <Select>
        {
          currency.map(curr => (
            <Select.Option key={curr.get('name')} value={curr.get('name')}>{curr.get('name')}</Select.Option>
          ))
        }
      </Select>
    );

    const sumItem = (
      <Form.Item label="Сумма" key="sum" {...layout}>
        {getFieldDecorator('sum', {
          rules: [{ required: false, message: 'Введите сумму!' }],
        })(<Input type="number" addonAfter={currencySelector}/>)}
      </Form.Item>
    );

    const toBillItem = (
      <Form.Item label="На счет" key="to_bill" {...layout}>
        {getFieldDecorator('to_bill', {
          rules: [{ type: 'array', required: false, message: 'Выберите счет!' }],
        })(<Cascader options={optionsBills}/>)}
      </Form.Item>
    );

    const fromBillItem = (
      <Form.Item label="Со счета" key="from_bill" {...layout}>
        {getFieldDecorator('from_bill', {
          rules: [{ type: 'array', required: false, message: 'Выберите счет!' }],
        })(<Cascader options={optionsBills}/>)}
      </Form.Item>
    );

    const categoryItem = (
      <Form.Item label="Категория" key="category" {...layout}>
        {getFieldDecorator('category', {
          rules: [{ type: 'array', required: false, message: 'Выберите счет!' }],
        })(<Cascader options={optionsCategory} displayRender={this.displayRender}/>)}
      </Form.Item>
    );

    let items = [];
    switch (this.state.operation) {
      case op.INCOME: items.push(sumItem, toBillItem, categoryItem); break;
      case op.EXPEND: items.push(sumItem, fromBillItem, categoryItem); break;
      case op.TRANSFER: items.push(sumItem, fromBillItem, toBillItem); break;
      case op.EXCHANGE: items.push(sumItem); break;
      case op.GOALS: items.push(sumItem); break;
    }

    return (
      <Form layout="horizontal">
        <Form.Item>
          {getFieldDecorator('operation', { initialValue: this.state.operation })(
            <Radio.Group onChange={this.handleChangeOperation}>
              <Radio.Button value={op.INCOME}>Доход</Radio.Button>
              <Radio.Button value={op.EXPEND}>Расход</Radio.Button>
              <Radio.Button value={op.TRANSFER}>Перевод</Radio.Button>
              <Radio.Button value={op.EXCHANGE}>Обмен</Radio.Button>
              <Radio.Button value={op.GOALS}>Цели</Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="Дата операции" {...layout}>
          {getFieldDecorator('date', { initialValue: moment() })(<DatePicker/>)}
        </Form.Item>
        { items }
        <Form.Item label="Комментарий" {...layout}>
          {getFieldDecorator('comment')(<Input.TextArea autosize/>)}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(Operation);
