import React, { Component } from 'react';
import {
  Form,
  Input,
  Icon,
} from 'antd';
import PT from 'prop-types';
import cn from 'classnames';

import listIcons from 'constants/icons';

import style from './index.less';

class IconPicker extends Component {
  static propTypes = {
    id: PT.string,
    value: PT.string,
    onChange: PT.func,
  };

  render() {
    return (
      <div className={style.icons} id={this.props.id}>
        { listIcons.map(icon =>
          <Icon
            key={icon}
            className={cn(style.icon, { [style.selected]: icon === this.props.value })}
            type={icon}
            onClick={() => this.props.onChange(icon)}
          />) }
      </div>
    );
  }
}

class Category extends Component {
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
        <Form.Item>
          {getFieldDecorator('icon', {
            initialValue: this.props.data.icon,
          })(<IconPicker/>)}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(Category);
