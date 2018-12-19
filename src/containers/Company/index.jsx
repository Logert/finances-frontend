import React, { Component } from 'react';
import {
  Table,
  Button,
  Popconfirm,
  Icon,
  Modal,
  Divider,
} from 'antd';
import { connect } from 'react-redux';
import PT from 'prop-types';
import ImPT from 'react-immutable-proptypes';

import {
  addCompany,
  updateCompany,
  deleteCompany,
  getCompanyList,
} from 'store/company/actions';

import CompanyForm from 'components/CompanyForm';

const getColumns = function () {
  return [
    {
      title: 'Наименование',
      dataIndex: 'name',
    },
    {
      title: 'Перевод',
      dataIndex: 'translate',
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      render: category => (
        <span>{ category && <span><Icon type={category.icon}/> {category.name} / {category.children.name}</span> }</span>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => {
        const deleteMethod = () => this.handleDelete(record);
        return (
          <span>
            <a onClick={ () => this.openCompanyForm(record, 'UPDATE')}>Изменить</a>
              <Divider type="vertical" />
            <Popconfirm title="Вы дейтсивтельно хотите удалить?" onConfirm={deleteMethod}>
              <Icon type="close"/>
            </Popconfirm>
          </span>
        );
      },
    },
  ];
};

class Company extends Component {
  static propTypes = {
    form: PT.object,
    company: ImPT.map,
    category: ImPT.map,
    addCompany: PT.func,
    updateCompany: PT.func,
    deleteCompany: PT.func,
    getCompanyList: PT.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      action: 'ADD',
      company: null,
    };
  }

  componentDidMount() {
    this.props.getCompanyList();
  }

  showModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  openCompanyForm = (company, action) => {
    this.setState({
      action,
      company,
    }, this.showModal);
  };

  handleDelete = (company) => {
    this.props.deleteCompany(company.id);
  };

  handleSubmit = () => {
    const form = this.form.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      form.resetFields();
      this.closeModal();
      switch (this.state.action) {
        case 'ADD': this.props.addCompany(values); break;
        case 'UPDATE': this.props.updateCompany({
          name: values.name,
          translate: values.translate,
          category_id: values.category_id[1],
          company_id: this.state.company.id,
        }); break;
      }
    });
  };

  render() {

    return (
      <div>
        <div className="buttons">
          <Button onClick={ () => this.openCompanyForm(null, 'ADD')}>Добавить</Button>
        </div>
        <Table
          dataSource={this.props.company.get('list').toJS()}
          columns={getColumns.apply(this)}
          rowKey="id"
          loading={this.props.company.get('loading')}
        />
        <Modal
          title="Добавить контрагента"
          visible={ this.state.modal }
          onOk={this.handleSubmit}
          onCancel={this.closeModal}
          width={440}
        >
          <CompanyForm
            wrappedComponentRef={form => this.form = form}
            category={this.props.category.get('list')}
            data={this.state.company || {}}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  company: state.company,
  category: state.category,
});

const mapDispatchFromProps = dispatch => ({
  addCompany: data => dispatch(addCompany.request(data)),
  updateCompany: data => dispatch(updateCompany.request(data)),
  deleteCompany: data => dispatch(deleteCompany.request(data)),
  getCompanyList: data => dispatch(getCompanyList.request(data)),
});

export default connect(mapStateToProps, mapDispatchFromProps)(Company);
