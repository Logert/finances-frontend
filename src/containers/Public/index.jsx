import React, { Component } from 'react';
import { Row, Col, Card, Spin } from 'antd';
import { connect } from 'react-redux';
import PT from 'prop-types';

import LoginForm from './LoginForm';

import { login, register } from 'store/auth/actions';

import style from './index.less';

class Public extends Component {
  static propTypes = {
    handleLogin: PT.func,
    handleRegister: PT.func,
    loading: PT.bool,
  };

  render() {
    return (
      <Spin spinning={this.props.loading} size="large">
        <div className={ style.public }>
          <Row className={ style.login }>
            <Col xs={{ offset: 2, span: 20 }} lg={{ offset: 9, span: 6 }}>
              <Card title="Авторизация">
                <LoginForm handleLogin={ this.props.handleLogin } handleRegister={ this.props.handleRegister }/>
              </Card>
            </Col>
          </Row>
        </div>
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.get('loading'),
});

const mapDispatchToProps = dispatch => ({
  handleLogin: values => dispatch(login.request(values)),
  handleRegister: values => dispatch(register.request(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Public);
