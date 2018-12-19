import React, { Component } from 'react';
import { Calendar, Badge } from 'antd';
import ImPT from 'react-immutable-proptypes';
import PT from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  getJournalList,
} from 'store/journal/actions';

import op from 'constants/operations';

moment.locale('ru');

import style from './style.less';

class CalendarJournal extends Component {
  static propTypes = {
    journal: ImPT.map.isRequired,
    getJournalList: PT.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getJournalList();
  }

  replaceOperation = operation => {
    switch (operation) {
      case op.INCOME: return 'success';
      case op.EXPEND: return 'error';
    }
  };

  dateCellRender = value => {
    const list = this.props.journal.get('list').filter(item => moment(item.get('date')).dayOfYear() === value.dayOfYear());
    return (
      <ul className={style.day}>
        {
          list.map(item => (
            <li key={item.getIn(['id'])}>
              <Badge status={this.replaceOperation(item.get('operation'))} text={item.getIn(['category', 'children', 'name'])} />
            </li>
          ))
        }
      </ul>
    );
  };

  render() {
    return (
      <Calendar
        className={style.calendar}
        dateCellRender={this.dateCellRender}
      />
    );
  }
}

const mapStateToProps = state => ({
  journal: state.journal,
});

const mapDispatchFromProps = dispatch => ({
  getJournalList: data => dispatch(getJournalList.request(data)),
});

export default connect(mapStateToProps, mapDispatchFromProps)(CalendarJournal);
