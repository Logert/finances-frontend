import React, { Component } from 'react';
import {
  Tabs,
  Card,
} from 'antd';

import Bills from 'containers/Bills';
import Category from 'containers/Category';
import Currency from 'containers/Currency';
import Company from 'containers/Company';

class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card title="Настройки">
        <Tabs>
          <Tabs.TabPane tab="Счета" key="1"><Bills/></Tabs.TabPane>
          <Tabs.TabPane tab="Категории" key="2"><Category/></Tabs.TabPane>
          <Tabs.TabPane tab="Валюты" key="3"><Currency/></Tabs.TabPane>
          <Tabs.TabPane tab="Контрагенты" key="company"><Company/></Tabs.TabPane>
          <Tabs.TabPane tab="Профиль" key="4">Профиль</Tabs.TabPane>
        </Tabs>
      </Card>
    );
  }
}

export default Settings;
