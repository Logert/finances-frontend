import { all } from 'redux-saga/effects';
import watchAuth from './auth/saga';
import watchBills from './bills/saga';
import watchCategory from './category/saga';
import watchJournal from './journal/saga';
import watchCurrency from './currency/saga';
import watchCompany from './company/saga';

export default function* rootSaga() {
  yield all([
    watchAuth(),
    watchBills(),
    watchCategory(),
    watchJournal(),
    watchCurrency(),
    watchCompany(),
  ]);
}
