import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import initialState from '../initialState';

import {
  getCurrencyList,
  getDynamicCurrencyList,
} from './actions';

export default handleActions({
  [getCurrencyList.success]: (state, action) => state.set('list', fromJS(action.payload)),
  [getDynamicCurrencyList.success]: (state, action) => state.set('dynamics', fromJS(action.payload)),
  [getCurrencyList.loading]: (state, action) => state.set('loading', action.payload),
}, initialState.bills);
