import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import initialState from '../initialState';

import {
  getBillList,
} from './actions';

export default handleActions({
  [getBillList.success]: (state, action) => state.set('list', fromJS(action.payload)),
  [getBillList.loading]: (state, action) => state.set('loading', action.payload),
}, initialState.bills);
