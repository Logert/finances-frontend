import { takeEvery, put, call, select } from 'redux-saga/effects';

import setToken from 'utils/setToken';

import {
  getCategoryList,
  addCategory,
  updateCategory,
  deleteCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from './actions';

import request from 'utils/request';

function* getListSaga() {
  const token = yield select(state => state.auth.get('token'));
  yield put(getCategoryList.loading(true));
  const response = yield call(request, '/api/category', { headers: setToken(token) });
  if (response.error) {
    yield put(getCategoryList.fail(response.error.message));
    yield put(getCategoryList.loading());
  } else {
    yield put(getCategoryList.success(response));
    yield put(getCategoryList.loading());
  }
}

function* addCategorySaga(action) {
  const token = yield select(state => state.auth.get('token'));
  yield put(addCategory.loading(true));
  const response = yield call(request, '/api/category', {
    method: 'POST',
    headers: setToken(token),
    body: action.payload,
  });
  if (response.error) {
    yield put(addCategory.fail(response.error.message));
    yield put(addCategory.loading());
  } else {
    yield put(addCategory.success(response));
    yield put(addCategory.loading());
    yield call(getListSaga);
  }
}

function* updateCategorySaga(action) {
  const token = yield select(state => state.auth.get('token'));
  const { category_id, ...body } = action.payload;
  yield put(updateCategory.loading(true));
  const response = yield call(request, '/api/category/' + category_id, {
    method: 'PUT',
    headers: setToken(token),
    body,
  });
  if (response.error) {
    yield put(updateCategory.fail(response.error.message));
    yield put(updateCategory.loading());
  } else {
    yield put(updateCategory.success(response));
    yield put(updateCategory.loading());
    yield call(getListSaga);
  }
}

function* deleteCategorySaga(action) {
  const token = yield select(state => state.auth.get('token'));
  yield put(deleteCategory.loading(true));
  const response = yield call(request, '/api/category/' + action.payload, {
    method: 'DELETE',
    headers: setToken(token),
  });
  if (response.error) {
    yield put(deleteCategory.fail(response.error.message));
    yield put(deleteCategory.loading());
  } else {
    yield put(deleteCategory.success(response));
    yield put(deleteCategory.loading());
    yield call(getListSaga);
  }
}

function* addSubCategorySaga(action) {
  const token = yield select(state => state.auth.get('token'));
  const { category_id, ...body } = action.payload;
  yield put(addSubCategory.loading(true));
  const response = yield call(request, '/api/category/' + category_id, {
    method: 'POST',
    headers: setToken(token),
    body,
  });
  if (response.error) {
    yield put(addSubCategory.fail(response.error.message));
    yield put(addSubCategory.loading());
  } else {
    yield put(addSubCategory.success(response));
    yield put(addSubCategory.loading());
    yield call(getListSaga);
  }
}

function* updateSubCategorySaga(action) {
  const token = yield select(state => state.auth.get('token'));
  const { category_id, subCategory_id, ...body } = action.payload;
  yield put(updateSubCategory.loading(true));
  const response = yield call(request, `/api/category/${category_id}/${subCategory_id}`, {
    method: 'PUT',
    headers: setToken(token),
    body,
  });
  if (response.error) {
    yield put(updateSubCategory.fail(response.error.message));
    yield put(updateSubCategory.loading());
  } else {
    yield put(updateSubCategory.success(response));
    yield put(updateSubCategory.loading());
    yield call(getListSaga);
  }
}

function* deleteSubCategorySaga(action) {
  const token = yield select(state => state.auth.get('token'));
  const { category_id, subCategory_id } = action.payload;
  yield put(deleteSubCategory.loading(true));
  const response = yield call(request, `/api/category/${category_id}/${subCategory_id}`, {
    method: 'DELETE',
    headers: setToken(token),
  });
  if (response.error) {
    yield put(deleteSubCategory.fail(response.error.message));
    yield put(deleteSubCategory.loading());
  } else {
    yield put(deleteSubCategory.success(response));
    yield put(deleteSubCategory.loading());
    yield call(getListSaga);
  }
}

export default function* watchCategory() {
  yield takeEvery(getCategoryList.request.toString(), getListSaga);
  yield takeEvery(addCategory.request.toString(), addCategorySaga);
  yield takeEvery(updateCategory.request.toString(), updateCategorySaga);
  yield takeEvery(deleteCategory.request.toString(), deleteCategorySaga);
  yield takeEvery(addSubCategory.request.toString(), addSubCategorySaga);
  yield takeEvery(updateSubCategory.request.toString(), updateSubCategorySaga);
  yield takeEvery(deleteSubCategory.request.toString(), deleteSubCategorySaga);
}
