import { takeEvery, put, call, select } from 'redux-saga/effects';

import setToken from 'utils/setToken';

import {
  getCompanyList,
  addCompany,
  updateCompany,
  deleteCompany,
} from './actions';

import request from 'utils/request';

function* getListSaga() {
  const token = yield select(state => state.auth.get('token'));
  yield put(getCompanyList.loading(true));
  const response = yield call(request, '/api/company', { headers: setToken(token) });
  if (response.error) {
    yield put(getCompanyList.fail(response.error.message));
    yield put(getCompanyList.loading());
  } else {
    yield put(getCompanyList.success(response));
    yield put(getCompanyList.loading());
  }
}

function* addCompanySaga(action) {
  const token = yield select(state => state.auth.get('token'));
  yield put(addCompany.loading(true));
  const response = yield call(request, '/api/company', {
    method: 'POST',
    headers: setToken(token),
    body: action.payload,
  });
  if (response.error) {
    yield put(addCompany.fail(response.error.message));
    yield put(addCompany.loading());
  } else {
    yield put(addCompany.success(response));
    yield put(addCompany.loading());
    yield call(getListSaga);
  }
}

function* updateCompanySaga(action) {
  const token = yield select(state => state.auth.get('token'));
  const { company_id, ...body } = action.payload;
  yield put(updateCompany.loading(true));
  const response = yield call(request, '/api/company/' + company_id, {
    method: 'PUT',
    headers: setToken(token),
    body,
  });
  if (response.error) {
    yield put(updateCompany.fail(response.error.message));
    yield put(updateCompany.loading());
  } else {
    yield put(updateCompany.success(response));
    yield put(updateCompany.loading());
    yield call(getListSaga);
  }
}

function* deleteCompanySaga(action) {
  const token = yield select(state => state.auth.get('token'));
  yield put(deleteCompany.loading(true));
  const response = yield call(request, '/api/company/' + action.payload, {
    method: 'DELETE',
    headers: setToken(token),
  });
  if (response.error) {
    yield put(deleteCompany.fail(response.error.message));
    yield put(deleteCompany.loading());
  } else {
    yield put(deleteCompany.success(response));
    yield put(deleteCompany.loading());
    yield call(getListSaga);
  }
}

export default function* watchCompany() {
  yield takeEvery(getCompanyList.request.toString(), getListSaga);
  yield takeEvery(addCompany.request.toString(), addCompanySaga);
  yield takeEvery(updateCompany.request.toString(), updateCompanySaga);
  yield takeEvery(deleteCompany.request.toString(), deleteCompanySaga);
}
