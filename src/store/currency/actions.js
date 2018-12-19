import { createActions } from 'redux-actions';

import { defaultAsyncActions } from 'utils/actions';

export const {
  getCurrencyList,
  getDynamicCurrencyList,
} = createActions({
  GET_CURRENCY_LIST: defaultAsyncActions(),
  GET_DYNAMIC_CURRENCY_LIST: defaultAsyncActions(),
});
