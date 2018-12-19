import { fromJS } from 'immutable';

export default {
  auth: fromJS({
    isLogin: false,
    loading: false,
    data: {},
  }),
  bills: fromJS({
    list: [],
    loading: false,
  }),
  category: fromJS({
    list: [],
    loading: false,
  }),
  currency: fromJS({
    list: [],
    dynamics: [],
    loading: false,
  }),
  journal: fromJS({
    list: [],
    loading: false,
  }),
  company: fromJS({
    list: [],
    loading: false,
  }),
};
