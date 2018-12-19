import React, { Component } from 'react';
import {
  Divider,
  Table,
  Button,
  Modal,
  Popconfirm,
} from 'antd';
import { connect } from 'react-redux';
import PT from 'prop-types';
import ImPT from 'react-immutable-proptypes';

import {
  addBill,
  updateBill,
  deleteBill,
  addSubBill,
  updateSubBill,
  deleteSubBill,
} from 'store/bills/actions';

import BillForm from 'components/BillForm';
import SubBillForm from 'components/SubBillForm';

const getColumns = function () {
  return [
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Баланс',
      key: 'balance',
      dataIndex: 'balance',
      render: (text, record) => (
        <span>{(text || '') + (' ' + (record.currency || ''))}</span>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => {
        const isBill = !record.balance;
        const deleteMethod = () => this.handleDelete(record, isBill);
        const updateMethod = isBill ? () => this.openBillForm(record, 'UPDATE') : () => this.openSubBillForm(record, 'UPDATE');

        return (
          <span>
            {isBill && <a onClick={() => this.openSubBillForm({ bill_id: record.id }, 'ADD')}>Добавить субсчет</a>}
            <Divider type="vertical"/>
            <a onClick={updateMethod}>Изменить</a>
            <Divider type="vertical"/>
            <Popconfirm title="Вы дейтсивтельно хотите удалить?" onConfirm={deleteMethod}>
              <a>Удалить</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];
};

class Bills extends Component {
  static propTypes = {
    form: PT.object,
    bills: ImPT.map,
    currency: ImPT.map,
    addBill: PT.func,
    updateBill: PT.func,
    deleteBill: PT.func,
    addSubBill: PT.func,
    updateSubBill: PT.func,
    deleteSubBill: PT.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      isBill: true,
      action: 'ADD',
      bill: null,
    };
  }

  showModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  openBillForm = (bill, action) => {
    this.setState({
      isBill: true,
      action,
      bill,
    }, this.showModal);
  };

  openSubBillForm = (bill, action) => {
    this.setState({
      isBill: false,
      action,
      bill,
    }, this.showModal);
  };

  handleDelete = (bill, isCategory) => {
    if (isCategory) {
      this.props.deleteBill(bill.id);
    } else {
      this.props.deleteSubBill({ bill_id: bill.bill_id, subBill_id: bill.id });
    }
  };

  handleSubmit = () => {
    const form = this.form.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      form.resetFields();
      this.closeModal();
      if (this.state.isBill) {
        switch (this.state.action) {
          case 'ADD': this.props.addBill(values); break;
          case 'UPDATE': this.props.updateBill({ ...values, bill_id: this.state.bill.id }); break;
        }
      } else {
        switch (this.state.action) {
          case 'ADD': this.props.addSubBill(values); break;
          case 'UPDATE': this.props.updateSubBill({
            ...values,
            subBill_id: this.state.bill.id,
          }); break;
        }
      }
    });
  };

  render() {
    return (
      <div>
        <div className="buttons">
          <Button onClick={() => this.openBillForm(null, 'ADD')}>Добавить счет</Button>
        </div>
        <Table
          dataSource={this.props.bills.get('list').toJS()}
          columns={getColumns.apply(this)}
          rowKey="id"
          loading={this.props.bills.get('loading')}
        />
        <Modal
          title="Добавить счет"
          visible={this.state.modal}
          onOk={this.handleSubmit}
          onCancel={this.closeModal}
          width={440}
          rowKey="id"
        >
          {this.state.isBill ?
            <BillForm
              wrappedComponentRef={form => this.form = form}
              action={this.state.action}
              data={this.state.bill || {}}
            /> :
            <SubBillForm
              wrappedComponentRef={form => this.form = form}
              bills={this.props.bills.get('list')}
              currency={this.props.currency.get('list')}
              action={this.state.action}
              data={this.state.bill || {}}
            />
          }
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bills: state.bills,
  currency: state.currency,
});

const mapDispatchFromProps = dispatch => ({
  addBill: data => dispatch(addBill.request(data)),
  updateBill: data => dispatch(updateBill.request(data)),
  deleteBill: data => dispatch(deleteBill.request(data)),
  addSubBill: data => dispatch(addSubBill.request(data)),
  updateSubBill: data => dispatch(updateSubBill.request(data)),
  deleteSubBill: data => dispatch(deleteSubBill.request(data)),
});

export default connect(mapStateToProps, mapDispatchFromProps)(Bills);
