import React, { Component } from 'react';
import {
  Layout,
  Menu,
  Icon,
  Breadcrumb,
  Collapse,
  List,
  Card,
  Row,
  Col,
  Avatar,
} from 'antd';
import { Link } from 'react-router-dom';
import PT from 'prop-types';
import ImPT from 'react-immutable-proptypes';
import { connect } from 'react-redux';

const { Content, Header } = Layout;

import { logout } from 'store/auth/actions';

import menu from 'constants/menu';
import breadcrumbNameMap from 'constants/breadcrumbs';

import style from './index.less';

class App extends Component {

  static propTypes = {
    children: PT.element.isRequired,
    location: PT.object,
    bills: ImPT.list,
    userData: ImPT.map,
    logout: PT.func,
  };

  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleLogout = () => {
    this.props.logout();
  };

  renderMenu = menu => menu.map(item => {
    if (item.children) {
      return (
        <Menu.SubMenu key={ item.key } title={<span><Icon type={ item.icon } /><span>{ item.title }</span></span>}>
          { this.renderMenu(item.children) }
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item key={ item.key }>
        <Link to={ item.path }>
          { item.icon && <Icon type={ item.icon } /> }
          <span>{ item.title }</span>
        </Link>
      </Menu.Item>
    );
  });

  render() {
    const { location } = this.props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>
            {breadcrumbNameMap[url]}
          </Link>
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [(
      <Breadcrumb.Item key="main">
        <Link to="/main">Главная</Link>
      </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);

    return (
      <Layout className={ style.page }>
        {/*<Layout>*/}
          <Header className={ style.header }>
            {/*<Icon*/}
              {/*className="trigger"*/}
              {/*type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}*/}
              {/*onClick={this.toggle}*/}
            {/*/>*/}
            <Row>
              <Col xl={{ span: 18, offset: 2 }} lg={21}>
                <Menu mode="horizontal" defaultSelectedKeys={['home']} style={{ lineHeight: '64px' }}>
                  { this.renderMenu(menu) }
                </Menu>
              </Col>
              <Col xl={2} lg={3}>
                <span className={ style.account }>
                  <Avatar icon="user" className={ style.avatar }/>
                  <span>{this.props.userData.get('login')}</span>
                </span>
                <Icon type="logout" className={style.logout} onClick={this.handleLogout}/>
              </Col>
            </Row>
          </Header>
          <Content className={ style.content }>
            <Row gutter={24}>
              <Col xl={{ span: 4, offset: 2 }} lg={{ span: 5, offset: 0 }} sm={24}>
                <Card className={ style.bills }>
                  <Collapse bordered={false} defaultActiveKey={['0', '1']}>
                    {
                      this.props.bills.map((bill, key) => (
                        <Collapse.Panel key={ key } header={ bill.get('name') }>
                          <List
                            size="small"
                            dataSource={bill.get('children') ? bill.get('children').toJS() : []}
                            renderItem={item => (
                              <List.Item key={item.id}>
                                <List.Item.Meta title={item.name}/>
                                <div>{`${item.balance} ${item.currency}`}</div>
                              </List.Item>
                            )}
                          />
                        </Collapse.Panel>
                      ))
                    }
                  </Collapse>
                </Card>
              </Col>
              <Col xl={16} lg={19} sm={24}>
                {/*<Breadcrumb className={ style.breadcrumb }>*/}
                  {/*{ breadcrumbItems }*/}
                {/*</Breadcrumb>*/}
                { this.props.children }
              </Col>
            </Row>
          </Content>
        {/*</Layout>*/}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  bills: state.bills.get('list'),
  userData: state.auth.get('data'),
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout.success()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
