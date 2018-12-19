import React, { Component } from 'react';
import {
  Transfer,
} from 'antd';
import { connect } from 'react-redux';
import PT from 'prop-types';
import ImPT from 'react-immutable-proptypes';

class Currency extends Component {
  static propTypes = {
    form: PT.object,
    currency: ImPT.map.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      targetKeys: [],
      selectedKeys: [],
    };
  }

  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetKeys: nextTargetKeys });
  };

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
  };

  render() {
    const { targetKeys, selectedKeys } = this.state;
    return (
      <Transfer
        dataSource={this.props.currency.get('list').toJS()}
        titles={['Все валюты', 'Выбранные валюты']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={this.handleChange}
        onSelectChange={this.handleSelectChange}
        render={item => `${item.full_name} - ${item.name}`}
        listStyle={{
          width: 300,
          height: 300,
        }}
        rowKey={record => record.name}
      />
    );
  }
}

const mapStateToProps = state => ({
  currency: state.currency,
});

export default connect(mapStateToProps)(Currency);
