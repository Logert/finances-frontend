import React, { Component } from 'react';
import {
  Divider,
  Table,
  Button,
  Modal,
  Icon,
  Popconfirm,
} from 'antd';
import { connect } from 'react-redux';
import PT from 'prop-types';
import ImPT from 'react-immutable-proptypes';

import {
  addCategory,
  updateCategory,
  deleteCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from 'store/category/actions';

import CategoryForm from 'components/CategoryForm';
import SubCategoryForm from 'components/SubCategoryForm';

const getColumns = function () {
  return [
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <span><Icon type={record.icon}/> {text}</span>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => {
        const isCategory = !record.category_id;
        const deleteMethod = () => this.handleDelete(record, isCategory);
        const updateMethod = isCategory ? () => this.openCategoryForm(record, 'UPDATE') : () => this.openSubCategoryForm(record, 'UPDATE');

        return (
          <span>
            {isCategory && <a onClick={() => this.openSubCategoryForm({ category_id: record.id }, 'ADD')}>Добавить подкатегорию</a>}
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

class Category extends Component {
  static propTypes = {
    form: PT.object,
    category: ImPT.map,
    currency: ImPT.map,
    addCategory: PT.func,
    addSubCategory: PT.func,
    updateCategory: PT.func,
    deleteCategory: PT.func,
    updateSubCategory: PT.func,
    deleteSubCategory: PT.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      isCategory: true,
      action: 'ADD',
      category: null,
    };
  }

  showModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  openCategoryForm = (category, action) => {
    this.setState({
      isCategory: true,
      action,
      category,
    }, this.showModal);
  };

  openSubCategoryForm = (category, action) => {
    this.setState({
      isCategory: false,
      action,
      category,
    }, this.showModal);
  };

  handleDelete = (category, isCategory) => {
    if (isCategory) {
      this.props.deleteCategory(category.id);
    } else {
      this.props.deleteSubCategory({ category_id: category.category_id, subCategory_id: category.id });
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
      if (this.state.isCategory) {
        switch (this.state.action) {
          case 'ADD': this.props.addCategory(values); break;
          case 'UPDATE': this.props.updateCategory({ ...values, category_id: this.state.category.id }); break;
        }
      } else {
        switch (this.state.action) {
          case 'ADD': this.props.addSubCategory(values); break;
          case 'UPDATE': this.props.updateSubCategory({
            ...values,
            subCategory_id: this.state.category.id,
          }); break;
        }
      }
    });
  };

  render() {
    return (
      <div>
        <div className="buttons">
          <Button onClick={() => this.openCategoryForm(null, 'ADD')}>Добавить категорию</Button>
        </div>
        <Table
          dataSource={this.props.category.get('list').toJS()}
          columns={getColumns.apply(this)}
          rowKey="id"
          pagination={false}
        />
        <Modal
          title="Добавить категорию"
          visible={this.state.modal}
          onOk={this.handleSubmit}
          onCancel={this.closeModal}
          width={440}
          rowKey="id"
        >
          {this.state.isCategory ?
            <CategoryForm
              wrappedComponentRef={form => this.form = form}
              action={this.state.action}
              data={this.state.category || {}}
            /> :
            <SubCategoryForm
              wrappedComponentRef={form => this.form = form}
              category={this.props.category.get('list')}
              data={this.state.category || {}}
              action={this.state.action}
            />
          }
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  category: state.category,
});

const mapDispatchFromProps = dispatch => ({
  addCategory: data => dispatch(addCategory.request(data)),
  updateCategory: data => dispatch(updateCategory.request(data)),
  deleteCategory: data => dispatch(deleteCategory.request(data)),
  addSubCategory: data => dispatch(addSubCategory.request(data)),
  updateSubCategory: data => dispatch(updateSubCategory.request(data)),
  deleteSubCategory: data => dispatch(deleteSubCategory.request(data)),
});

export default connect(mapStateToProps, mapDispatchFromProps)(Category);
