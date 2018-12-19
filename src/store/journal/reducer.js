import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import initialState from '../initialState';

import {
  getJournalList,
} from './actions';

export default handleActions({
  [getJournalList.success]: (state, action) => state.set('list', fromJS(action.payload)),
  [getJournalList.loading]: (state, action) => state.set('loading', action.payload),
}, initialState.journal);
