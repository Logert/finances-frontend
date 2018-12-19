import React, { Component } from 'react';
import {
  Form,
  Input,
  Select,
} from 'antd';
import PT from 'prop-types';
import ImPT from 'react-immutable-proptypes';

class SubCategory extends Component {
  static propTypes = {
    form: PT.object,
    category: ImPT.list.isRequired,
    categoryId: PT.string,
    data: PT.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { category } = this.props;
    const { getFieldDecorator } = this.props.form;

    const layout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
    };

    return (
      <Form layout="horizontal">
        <Form.Item label="Наименование" {...layout}>
          {getFieldDecorator('name', {
            initialValue: this.props.data.name,
            rules: [{ required: true, message: 'Введите наименование!' }],
          })(<Input/>)}
        </Form.Item>
        <Form.Item label="Подкатегория для" {...layout}>
          {getFieldDecorator('category_id', {
            initialValue: this.props.data.category_id,
            rules: [{ required: true, message: 'Выберите подкатегорию!' }],
          })(<Select>
            {
              category.map(curr => (
                <Select.Option key={curr.get('id')} value={curr.get('id')}>{curr.get('name')}</Select.Option>
              ))
            }
          </Select>)}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(SubCategory);
