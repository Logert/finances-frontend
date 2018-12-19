import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import initialState from '../initialState';

import {
  getCategoryList,
} from './actions';

export default handleActions({
  [getCategoryList.success]: (state, action) => state.set('list', fromJS(action.payload)),
  [getCategoryList.loading]: (state, action) => state.set('loading', action.payload),
}, initialState.category);
