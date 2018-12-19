import { createActions } from 'redux-actions';

import { defaultAsyncActions } from 'utils/actions';

export const {
  login,
  register,
  logout,
} = createActions({
  LOGIN: defaultAsyncActions(),
  REGISTER: defaultAsyncActions(),
  LOGOUT: defaultAsyncActions(),
});
