import { takeEvery, put, call, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import setToken from 'utils/setToken';

import {
  getJournalList,
  addJournal,
  updateJournal,
  deleteJournal,
  uploadStatement,
} from './actions';

import {
  getBillList,
} from 'store/bills/actions';

import request from 'utils/request';

function* getListSaga() {
  const token = yield select(state => state.auth.get('token'));
  yield put(getJournalList.loading(true));
  const response = yield call(request, '/api/journal', { headers: setToken(token) });
  if (response.error) {
    yield put(getJournalList.fail(response.error.message));
    yield put(getJournalList.loading());
  } else {
    yield put(getJournalList.success(response));
    yield put(getJournalList.loading());
  }
}

function* addJournalSaga(action) {
  const token = yield select(state => state.auth.get('token'));
  yield put(addJournal.loading(true));
  const response = yield call(request, '/api/journal', {
    method: 'POST',
    headers: setToken(token),
    body: action.payload,
  });
  if (response.error) {
    yield put(addJournal.fail(response.error.message));
    yield put(addJournal.loading());
  } else {
    yield put(addJournal.success(response));
    yield put(addJournal.loading());
    yield call(getListSaga);
    yield put(getBillList.request());
  }
}

function* updateJournalSaga(action) {
  const token = yield select(state => state.auth.get('token'));
  const { Journal_id, ...body } = action.payload;
  yield put(updateJournal.loading(true));
  const response = yield call(request, '/api/journal/' + Journal_id, {
    method: 'PUT',
    headers: setToken(token),
    body,
  });
  if (response.error) {
    yield put(updateJournal.fail(response.error.message));
    yield put(updateJournal.loading());
  } else {
    yield put(updateJournal.success(response));
    yield put(updateJournal.loading());
    yield call(getListSaga);
  }
}

function* deleteJournalSaga(action) {
  const token = yield select(state => state.auth.get('token'));
  yield put(deleteJournal.loading(true));
  const response = yield call(request, '/api/journal/' + action.payload, {
    method: 'DELETE',
    headers: setToken(token),
  });
  if (response.error) {
    yield put(deleteJournal.fail(response.error.message));
    yield put(deleteJournal.loading());
  } else {
    yield put(deleteJournal.success(response));
    yield put(deleteJournal.loading());
    yield call(getListSaga);
  }
}

function* uploadStatementSaga(action) {
  const token = yield select(state => state.auth.get('token'));
  const { bank, bill, file } = action.payload;
  let body = new FormData();
  body.append('file', file.file);
  yield put(uploadStatement.loading(true));
  const response = yield call(request, `/api/journal/upload/${bank}/${bill}`, {
    method: 'POST',
    headers: setToken(token),
    body,
  });
  if (response.error) {
    yield put(uploadStatement.fail(response.error.message));
    yield put(uploadStatement.loading());
  } else {
    yield put(uploadStatement.success(response));
    yield put(uploadStatement.loading());
    yield put(push('/journal'));
  }
}

export default function* watchJournal() {
  yield takeEvery(getJournalList.request.toString(), getListSaga);
  yield takeEvery(addJournal.request.toString(), addJournalSaga);
  yield takeEvery(updateJournal.request.toString(), updateJournalSaga);
  yield takeEvery(deleteJournal.request.toString(), deleteJournalSaga);
  yield takeEvery(uploadStatement.request.toString(), uploadStatementSaga);
}
