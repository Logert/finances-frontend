import { createActions } from 'redux-actions';

import { defaultAsyncActions } from 'utils/actions';

export const {
  getCategoryList,
  addCategory,
  updateCategory,
  deleteCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = createActions({
  GET_CATEGORY_LIST: defaultAsyncActions(),
  ADD_CATEGORY: defaultAsyncActions(),
  UPDATE_CATEGORY: defaultAsyncActions(),
  DELETE_CATEGORY: defaultAsyncActions(),
  ADD_SUB_CATEGORY: defaultAsyncActions(),
  UPDATE_SUB_CATEGORY: defaultAsyncActions(),
  DELETE_SUB_CATEGORY: defaultAsyncActions(),
});
