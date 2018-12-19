import React, { Component } from 'react';
import { Card, Table, Divider, Button, Modal, Icon } from 'antd';
import ImPT from 'react-immutable-proptypes';
import PT from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  addJournal,
  getJournalList,
  updateJournal,
  deleteJournal,
} from 'store/journal/actions';

import op from 'constants/operations';

moment.locale('ru');

import OperationForm from 'components/OperationForm';

class Journal extends Component {
  static propTypes = {
    bills: ImPT.map.isRequired,
    category: ImPT.map.isRequired,
    currency: ImPT.map.isRequired,
    journal: ImPT.map.isRequired,
    addJournal: PT.func,
    updateJournal: PT.func,
    deleteJournal: PT.func,
    getJournalList: PT.func,
    history: PT.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  componentDidMount() {
    this.props.getJournalList();
  }

  showModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  handleSubmit = () => {
    const form = this.form.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      let data = {
        category_id: values.category[1],
        comment: values.comment,
        date: values.date.valueOf(),
        sum: values.sum,
        operation: values.operation,
      };

      switch (values.operation) {
        case op.INCOME: data.bill_id = values.to_bill[1]; break;
        case op.EXPEND: data.bill_id = values.from_bill[1]; break;
      }

      this.props.addJournal(data);

      form.resetFields();
      this.closeModal();
    });
  };

  goToStatement = () => {
    this.props.history.push('/statement');
  };

  render() {

    const columns = [
      {
        title: 'Дата',
        dataIndex: 'date',
        render: (text, record) => (
          <div>
            <span>{moment(text).format('DD.MM.YYYY')}</span><br/>
            <span>{moment(text).format('dddd')}</span>
          </div>
        ),
      },
      {
        title: 'Сумма',
        dataIndex: 'sum',
        render: (text, record) => (
          <span className={ record.operation }>
            {/*<Icon type='plus'/>*/}
            { text }&nbsp;
            {record.bill.children.currency}
            <br/>
            {record.bill.children.name}
          </span>
        ),
      },
      {
        title: 'Категория',
        dataIndex: 'category',
        render: category => (
          <span><Icon type={category.icon}/> {category.name} / {category.children.name}</span>
        ),
      },
      {
        title: '',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;">Редактировать</a>
              <Divider type="vertical" />
            <a href="javascript:;">Удалить</a>
          </span>
        ),
      },
    ];

    return (
      <Card title="Журнал операций">
        <div className="buttons">
          <Button onClick={this.showModal}>Добавить операцию</Button>
          <Button onClick={this.goToStatement}>Загрузить выписку</Button>
        </div>
        <Table
          dataSource={this.props.journal.get('list').toJS()}
          columns={columns}
          expandedRowRender={record => <p style={{ margin: 0 }}>{record.comment}</p>}
          expandRowByClick
          rowKey="id"
          loading={this.props.journal.get('loading')}
        />
        <Modal
          title="Добавить операцию"
          visible={ this.state.modal }
          onOk={this.handleSubmit}
          onCancel={this.closeModal}
          width={440}
        >
          <OperationForm
            wrappedComponentRef={form => this.form = form}
            bills={this.props.bills.get('list')}
            category={this.props.category.get('list')}
            currency={this.props.currency.get('list')}
          />
        </Modal>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  bills: state.bills,
  category: state.category,
  currency: state.currency,
  journal: state.journal,
});

const mapDispatchFromProps = dispatch => ({
  addJournal: data => dispatch(addJournal.request(data)),
  updateJournal: data => dispatch(updateJournal.request(data)),
  deleteJournal: data => dispatch(deleteJournal.request(data)),
  getJournalList: data => dispatch(getJournalList.request(data)),
});

export default connect(mapStateToProps, mapDispatchFromProps)(Journal);
