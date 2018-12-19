import React, { Component } from 'react';
import { Button, Card, Cascader, Form, Icon, Radio, Upload } from 'antd';
import ImPT from 'react-immutable-proptypes';
import PT from 'prop-types';
import { connect } from 'react-redux';

import {
  uploadStatement,
} from 'store/journal/actions';

class Statement extends Component {
  static propTypes = {
    bills: ImPT.map,
    form: PT.object,
    uploadStatement: PT.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.uploadStatement({ ...values, bill: values.bill[1] });
      }
    });
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

  render() {
    const optionsBills = this.getBills(this.props.bills.get('list'));
    const { getFieldDecorator } = this.props.form;

    const props = {
      beforeUpload: () => false,
      accept: '.csv',
    };

    return (
      <Card title="Загрузить выписку">
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('bank', { initialValue: 'mtbank' })(
              <Radio.Group>
                <Radio.Button value="mtbank">МТБанк</Radio.Button>
                <Radio.Button value="belarusbank" disabled>Беларусбанк</Radio.Button>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('bill', {
              rules: [{ type: 'array', required: true, message: 'Выберите счет!' }],
            })(
              <Cascader options={optionsBills}/>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('file', {
              rules: [{ type: 'object', required: true, message: 'Выберите файл!' }],
            })(
              <Upload {...props}>
                <Button><Icon type="upload" /> Выбрать файл</Button>
              </Upload>
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit">Загрузить выписку</Button>
        </Form>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  journal: state.journal,
  bills: state.bills,
});

const mapDispatchFromProps = dispatch => ({
  uploadStatement: data => dispatch(uploadStatement.request(data)),
});

export default Form.create()(connect(mapStateToProps, mapDispatchFromProps)(Statement));
