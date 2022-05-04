import {configureStore} from '@reduxjs/toolkit';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/app/app';
import {AuthorizationStatus} from './const';
import {createAPI} from './services/api';
import {rootReducer} from './store/root-reducer';
import {getCheckAuthSuccess} from './store/user/actions';
import {checkAuthAction} from './store/user/api-actions';

const api = createAPI(
  () => store.dispatch(getCheckAuthSuccess(AuthorizationStatus.NoAuth)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

(store.dispatch)(checkAuthAction());

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
