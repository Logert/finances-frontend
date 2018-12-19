import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import initialState from '../initialState';

import {
  getCompanyList,
} from './actions';

export default handleActions({
  [getCompanyList.success]: (state, action) => state.set('list', fromJS(action.payload)),
  [getCompanyList.loading]: (state, action) => state.set('loading', action.payload),
}, initialState.company);
