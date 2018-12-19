import { takeEvery, put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { notification } from 'antd';

import {
  login,
  register,
} from './actions';

import {
  getBillList,
} from '../bills/actions';

import {
  getCategoryList,
} from '../category/actions';

import {
  getCurrencyList,
} from '../currency/actions';

import request from 'utils/request';

function* AuthSaga(action) {
  yield put(login.loading(true));
  const response = yield call(request, '/public/login', { method: 'POST', body: action.payload });
  if (response.error) {
    yield put(login.fail(response.error.message));
    yield put(login.loading());
  } else {
    yield put(login.success(response));
    yield put(getBillList.request());
    yield put(getCategoryList.request());
    yield put(getCurrencyList.request());
    yield put(push('/journal'));
    yield put(login.loading());
  }
}

function* RegisterSaga(action) {
  const { values, registerSuccess } = action.payload;
  yield put(register.loading(true));
  const response = yield call(request, '/public/register', { method: 'POST', body: values });
  if (response.error) {
    yield put(register.fail(response.error.message));
    yield put(register.loading());
  } else {
    yield notification.success({
      message: 'Пользователь успешно создан',
      description: '',
    });
    yield registerSuccess();
    yield put(register.success(response));
    yield put(register.loading());
  }
}

export default function* watchAuth() {
  yield takeEvery(login.request.toString(), AuthSaga);
  yield takeEvery(register.request.toString(), RegisterSaga);
}
