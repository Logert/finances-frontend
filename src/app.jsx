import React from 'react';
import { Provider } from 'react-redux';
import { store, history, persistor } from './store';
import MyRouter from 'router/index.jsx';
import { hot } from 'react-hot-loader';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react';

import 'assets/less/custom.global.less';

const App = () => (
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <PersistGate persistor={ persistor }>
        <MyRouter/>
      </PersistGate>
    </ConnectedRouter>
  </Provider>
);

export default hot(module)(App);
