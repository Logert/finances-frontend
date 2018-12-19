import React, { Component } from 'react';
import {
  Card,
  Table,
  DatePicker,
  Row,
  Col,
  Tabs,
} from 'antd';
import { connect } from 'react-redux';
import PT from 'prop-types';
import ImPT from 'react-immutable-proptypes';
import moment from 'moment';

import style from './index.less';

class BudgetCard extends Component {
  static propTypes = {
    date: PT.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  render() {
    return (
      <div>
        {/*<Table dataSource={this.state.data}/>*/}
      </div>
    );
  }
}

class Budget extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
    const start = moment().subtract(12, 'M');
    const end = moment();

    const monthCount = end.diff(start, 'M');
    const months = [];

    for (let i = monthCount; i !== 0; i--) {
      months.push(moment().subtract(i, 'M'));
    }

    this.state = {
      start,
      end,
      months,
    };
  }

  componentDidMount() {

  }

  render() {
    const { start, end, months } = this.state;

    return (
      <Card title="Бюджет">
        <Tabs defaultActiveKey={months[months.length - 1].format('MMMM')}>
          {
            months.map(month => <Tabs.TabPane tab={month.format('MMMM')} key={month.format('MMMM')}>{month.format('MMMM')}</Tabs.TabPane>)
          }
        </Tabs>
      </Card>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchFromProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchFromProps)(Budget);
