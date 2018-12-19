import { takeEvery, put, call, select } from 'redux-saga/effects';

import setToken from 'utils/setToken';

import {
  getCurrencyList,
  getDynamicCurrencyList,
} from './actions';

import request from 'utils/request';

function* getListSaga() {
  const token = yield select(state => state.auth.get('token'));
  yield put(getCurrencyList.loading(true));
  const response = yield call(request, '/api/currency', { headers: setToken(token) });
  if (response.error) {
    yield put(getCurrencyList.fail(response.error.message));
    yield put(getCurrencyList.loading());
  } else {
    yield put(getCurrencyList.success(response));
    yield put(getCurrencyList.loading());
  }
}

function* getDynamicCurrencyListSaga(action) {
  const token = yield select(state => state.auth.get('token'));
  const { start, end } = action.payload;
  yield put(getDynamicCurrencyList.loading(true));
  const response = yield call(request, `/api/currency/dynamics?curr=145,298,292&start=${start}&end=${end}`, { headers: setToken(token) });
  if (response.error) {
    yield put(getDynamicCurrencyList.fail(response.error.message));
    yield put(getDynamicCurrencyList.loading());
  } else {
    yield put(getDynamicCurrencyList.success(response));
    yield put(getDynamicCurrencyList.loading());
  }
}

export default function* watchCurrency() {
  yield takeEvery(getCurrencyList.request.toString(), getListSaga);
  yield takeEvery(getDynamicCurrencyList.request.toString(), getDynamicCurrencyListSaga);
}
