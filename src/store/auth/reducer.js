import { fromJS } from 'immutable';
import { handleActions, combineActions } from 'redux-actions';

import initialState from '../initialState';

import {
  login,
  register,
  logout,
} from './actions';

export default handleActions({
  [login.success]: (state, action) => state
    .set('data', fromJS(action.payload.data))
    .set('isLogin', true)
    .set('token', action.payload.token),
  [register.success]: (state, action) => state.set('data', fromJS(action.payload)),
  [combineActions(login.loading, register.loading)]: (state, action) => state.set('loading', action.payload),
  [logout.success]: () => initialState.auth,
}, initialState.auth);
