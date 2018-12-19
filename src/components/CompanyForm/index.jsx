import React, { Component } from 'react';
import {
  Cascader,
  Form,
  Input,
} from 'antd';
import PT from 'prop-types';
import ImPT from 'react-immutable-proptypes';

class CompanyForm extends Component {
  static propTypes = {
    form: PT.object,
    category: ImPT.list.isRequired,
    data: PT.object,
  };

  constructor(props) {
    super(props);
  }

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

  render() {
    const { category, data } = this.props;
    const { getFieldDecorator } = this.props.form;

    const layout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
    };

    const optionsCategory = this.getCategory(category);

    return (
      <Form layout="horizontal">
        <Form.Item label="Наименование" {...layout}>
          {getFieldDecorator('name', {
            initialValue: data.name,
            rules: [{ required: true, message: 'Введите наименование!' }],
          })(<Input/>)}
        </Form.Item>
        <Form.Item label="Перевод" {...layout}>
          {getFieldDecorator('translate', {
            initialValue: data.translate || '',
            rules: [{ required: false, message: 'Введите перевод!' }],
          })(<Input/>)}
        </Form.Item>
        <Form.Item label="Связанная категория" {...layout}>
          {getFieldDecorator('category_id', {
            initialValue: data.category ? [data.category.id, data.category.children.id] : [],
            rules: [{ type: 'array', required: true, message: 'Выберите категорию!' }],
          })(<Cascader options={optionsCategory} displayRender={this.displayRender}/>)}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(CompanyForm);
