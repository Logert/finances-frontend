import { takeEvery, put, call, select } from 'redux-saga/effects';

import setToken from 'utils/setToken';

import {
  getBillList,
  addBill,
  updateBill,
  deleteBill,
  addSubBill,
  updateSubBill,
  deleteSubBill,
} from './actions';

import request from 'utils/request';

function* getListSaga() {
  const token = yield select(state => state.auth.get('token'));
  yield put(getBillList.loading(true));
  const response = yield call(request, '/api/bills', { headers: setToken(token) });
  if (response.error) {
    yield put(getBillList.fail(response.error.message));
    yield put(getBillList.loading());
  } else {
    yield put(getBillList.success(response));
    yield put(getBillList.loading());
  }
}

function* addBillSaga(action) {
  const token = yield select(state => state.auth.get('token'));
  yield put(addBill.loading(true));
  const response = yield call(request, '/api/bills', {
    method: 'POST',
    headers: setToken(token),
    body: action.payload,
  });
  if (response.error) {
    yield put(addBill.fail(response.error.message));
    yield put(addBill.loading());
  } else {
    yield put(addBill.success(response));
    yield put(addBill.loading());
    yield call(getListSaga);
  }
}

function* updateBillSaga(action) {
  const token = yield select(state => state.auth.get('token'));
  const { bill_id, ...body } = action.payload;
  yield put(updateBill.loading(true));
  const response = yield call(request, '/api/bills/' + bill_id, {
    method: 'PUT',
    headers: setToken(token),
    body,
  });
  if (response.error) {
    yield put(updateBill.fail(response.error.message));
    yield put(updateBill.loading());
  } else {
    yield put(updateBill.success(response));
    yield put(updateBill.loading());
    yield call(getListSaga);
  }
}

function* deleteBillSaga(action) {
  const token = yield select(state => state.auth.get('token'));
  yield put(deleteBill.loading(true));
  const response = yield call(request, '/api/bills/' + action.payload, {
    method: 'DELETE',
    headers: setToken(token),
  });
  if (response.error) {
    yield put(deleteBill.fail(response.error.message));
    yield put(deleteBill.loading());
  } else {
    yield put(deleteBill.success(response));
    yield put(deleteBill.loading());
    yield call(getListSaga);
  }
}

function* addSubBillSaga(action) {
  const token = yield select(state => state.auth.get('token'));
  const { bill_id, ...body } = action.payload;
  yield put(addSubBill.loading(true));
  const response = yield call(request, '/api/bills/' + bill_id, {
    method: 'POST',
    headers: setToken(token),
    body,
  });
  if (response.error) {
    yield put(addSubBill.fail(response.error.message));
    yield put(addSubBill.loading());
  } else {
    yield put(addSubBill.success(response));
    yield put(addSubBill.loading());
    yield call(getListSaga);
  }
}

function* updateSubBillSaga(action) {
  const token = yield select(state => state.auth.get('token'));
  const { bill_id, subBill_id, ...body } = action.payload;
  yield put(updateSubBill.loading(true));
  const response = yield call(request, `/api/bills/${bill_id}/${subBill_id}`, {
    method: 'PUT',
    headers: setToken(token),
    body,
  });
  if (response.error) {
    yield put(updateSubBill.fail(response.error.message));
    yield put(updateSubBill.loading());
  } else {
    yield put(updateSubBill.success(response));
    yield put(updateSubBill.loading());
    yield call(getListSaga);
  }
}

function* deleteSubBillSaga(action) {
  const token = yield select(state => state.auth.get('token'));
  const { bill_id, subBill_id } = action.payload;
  yield put(deleteSubBill.loading(true));
  const response = yield call(request, `/api/bills/${bill_id}/${subBill_id}`, {
    method: 'DELETE',
    headers: setToken(token),
  });
  if (response.error) {
    yield put(deleteSubBill.fail(response.error.message));
    yield put(deleteSubBill.loading());
  } else {
    yield put(deleteSubBill.success(response));
    yield put(deleteSubBill.loading());
    yield call(getListSaga);
  }
}

export default function* watchBills() {
  yield takeEvery(getBillList.request.toString(), getListSaga);
  yield takeEvery(addBill.request.toString(), addBillSaga);
  yield takeEvery(updateBill.request.toString(), updateBillSaga);
  yield takeEvery(deleteBill.request.toString(), deleteBillSaga);
  yield takeEvery(addSubBill.request.toString(), addSubBillSaga);
  yield takeEvery(updateSubBill.request.toString(), updateSubBillSaga);
  yield takeEvery(deleteSubBill.request.toString(), deleteSubBillSaga);
}
