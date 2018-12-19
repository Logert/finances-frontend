import React, { Component, Fragment } from 'react';
import { Input, Form, Button, Icon } from 'antd';
import PT from 'prop-types';

class LoginForm extends Component {
  static propTypes = {
    handleLogin: PT.func,
    handleRegister: PT.func,
    form: PT.object,
  };

  state = {
    register: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleLogin(values);
      }
    });
  };

  handleSubmitRegister = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleRegister({ values, registerSuccess: () => this.setState({ register: false }) });
      }
    });
  };

  handleRegister = () => {
    this.setState({ register: true });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={ () => {} } autoComplete="off">
        <Form.Item>
          {
            getFieldDecorator('login', { rules: [{ required: true, message: 'Введите логин!' }] })(
              <Input prefix={ <Icon type="user"/> } size="large" placeholder="Логин"/>
            )
          }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('password', { rules: [{ required: true, message: 'Введите пароль!' }] })(
              <Input prefix={ <Icon type="lock"/> } type="password" size="large" placeholder="Пароль"/>
            )
          }
        </Form.Item>
        {
          this.state.register ? (
            <Fragment>
              <Form.Item>
                {
                  getFieldDecorator('name', { rules: [{ required: true, message: 'Введите ФИО!' }] })(
                    <Input size="large" placeholder="ФИО"/>
                  )
                }
              </Form.Item>
              <Form.Item>
                {
                  getFieldDecorator('email')(
                    <Input prefix={ <Icon type="email"/> } size="large" placeholder="E-mail"/>
                  )
                }
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={ { width: '100%' } } onClick={ this.handleSubmitRegister }>Регистрация</Button>
              </Form.Item>
            </Fragment>
          ) : (
            <Fragment>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={ { width: '100%' } } onClick={ this.handleSubmit }>Войти</Button>
              </Form.Item>
              <a onClick={ this.handleRegister }>Регистрация</a>
            </Fragment>
          )
        }
      </Form>
    );
  }
}

export default Form.create()(LoginForm);
