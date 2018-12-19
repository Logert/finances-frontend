import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth/reducer';
import bills from './bills/reducer';
import category from './category/reducer';
import journal from './journal/reducer';
import currency from './currency/reducer';
import company from './company/reducer';

export default combineReducers({
  router: routerReducer(),
  auth,
  bills,
  category,
  journal,
  currency,
  company,
});
