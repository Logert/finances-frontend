import { createActions } from 'redux-actions';

import { defaultAsyncActions } from 'utils/actions';

export const {
  getCompanyList,
  addCompany,
  updateCompany,
  deleteCompany,
} = createActions({
  GET_COMPANY_LIST: defaultAsyncActions(),
  ADD_COMPANY: defaultAsyncActions(),
  UPDATE_COMPANY: defaultAsyncActions(),
  DELETE_COMPANY: defaultAsyncActions(),
});
