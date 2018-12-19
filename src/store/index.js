import 'regenerator-runtime/runtime';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createHashHistory from 'history/createHashHistory';
import { routerMiddleware } from 'react-router-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import immutableTransform from 'redux-persist-transform-immutable';

import rootReducer from './reducer';
import rootSaga from './sagas';
import initialState from './initialState';

export const history = createHashHistory();

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware,
  routerMiddleware(history),
];

function getEnhancer() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return composeEnhancers(applyMiddleware(...middlewares));
}

const persistConfig = {
  transforms: [immutableTransform()],
  key: 'root',
  whitelist: ['auth', 'bills', 'category', 'currency'],
  storage,
};

export const store = createStore(
  persistReducer(persistConfig, rootReducer),
  initialState,
  getEnhancer());

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
