import { createActions } from 'redux-actions';

import { defaultAsyncActions } from 'utils/actions';

export const {
  getBillList,
  addBill,
  updateBill,
  deleteBill,
  addSubBill,
  updateSubBill,
  deleteSubBill,
} = createActions({
  GET_BILL_LIST: defaultAsyncActions(),
  ADD_BILL: defaultAsyncActions(),
  UPDATE_BILL: defaultAsyncActions(),
  DELETE_BILL: defaultAsyncActions(),
  ADD_SUB_BILL: defaultAsyncActions(),
  UPDATE_SUB_BILL: defaultAsyncActions(),
  DELETE_SUB_BILL: defaultAsyncActions(),
});
