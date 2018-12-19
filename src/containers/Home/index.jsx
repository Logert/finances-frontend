import React, { Component, Fragment } from 'react';
import {
  Card,
  DatePicker,
  Row,
  Col,
} from 'antd';
import { connect } from 'react-redux';
import PT from 'prop-types';
import ImPT from 'react-immutable-proptypes';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import moment from 'moment';

import op from 'constants/operations';

import {
  getDynamicCurrencyList,
} from 'store/currency/actions';

import {
  getJournalList,
} from 'store/journal/actions';

import style from './index.less';

class Home extends Component {
  static propTypes = {
    form: PT.object,
    currency: ImPT.map,
    journal: ImPT.map,
    getDynamicCurrencyList: PT.func,
    getJournalList: PT.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      start: moment().subtract(6, 'M'),
      end: moment(),
      format: 'YYYY-MM-DD',
    };
  }

  componentDidMount() {
    const { start, end, format } = this.state;
    this.props.getDynamicCurrencyList({ start: start.format(format), end: end.format(format) });
    this.props.getJournalList();
  }

  handleChangeDate = date => {
    this.setState({ start: date[0], end: date[1] },
      () => {
        const { start, end, format } = this.state;
        this.props.getDynamicCurrencyList({ start: start.format(format), end: end.format(format) });
      }
    );
  };

  render() {
    const { start, end } = this.state;
    const topExpend = this.props.journal.get('list')
      .filter(item => item.get('operation') === op.EXPEND)
      .sort((a, b) => +b.get('sum') - +a.get('sum'))
      .map(item => ({ name: item.getIn(['category', 'children', 'name']), value: +item.get('sum') }))
      .setSize(5)
      .toJS();

    const dynamics = this.props.journal.get('list')
      .sort((a, b) => moment(a.get('date')).valueOf() - moment(b.get('date')).valueOf())
      .map(item => ({
        category: item.getIn(['category', 'children', 'name']),
        bill: item.getIn(['bill', 'children', 'name']),
        date: moment(item.get('date')).format('DD.MM.YYYY'),
        sum: item.get('operation') === op.EXPEND ? 0 - +item.get('sum') : +item.get('sum'),
        operation: item.get('operation'),
      }))
      .toJS();

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
      <Fragment>
        <Row className={style.dynamics}>
          <Col>
            <Card title="Динамика расходов и доходов">
              <LineChart width={700} height={300} data={dynamics}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date"/>
                <YAxis name="BYN"/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="sum" stroke="#82ca9d" fill="#82ca9d" dot={false}/>
              </LineChart>
            </Card>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col md={12} sm={24}>
            <Card title="Динамика валюты">
              <DatePicker.RangePicker className={style.date} onChange={this.handleChangeDate} defaultValue={[start, end]} />
              <LineChart width={300} height={300} data={this.props.currency.get('dynamics').toJS()}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="Date"/>
                <YAxis name="BYN"/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="USD" stroke="#82ca9d" fill="#82ca9d" dot={false}/>
                <Line type="monotone" dataKey="EUR" stroke="#ffc658" fill="#ffc658" dot={false}/>
                <Line type="monotone" dataKey="RUB" stroke="#8884d8" fill="#8884d8" dot={false}/>
              </LineChart>
            </Card>
          </Col>
          <Col md={12} sm={24}>
            <Card title="Топ 5 расходов">
              <PieChart width={300} height={300}>
                <Pie data={topExpend} outerRadius={80} fill="#8884d8" label>
                  {
                    topExpend.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                  }
                </Pie>
                <Tooltip/>
                <Legend/>
              </PieChart>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  currency: state.currency,
  journal: state.journal,
});

const mapDispatchFromProps = dispatch => ({
  getDynamicCurrencyList: data => dispatch(getDynamicCurrencyList.request(data)),
  getJournalList: data => dispatch(getJournalList.request(data)),
});

export default connect(mapStateToProps, mapDispatchFromProps)(Home);
