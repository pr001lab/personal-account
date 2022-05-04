import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus, StatusLoading} from '../../const';
import {dropToken} from '../../services/token';
import {User} from '../../types/user';
import {getCheckAuthFailure, getCheckAuthRequest, getCheckAuthSuccess, logoutAction, postLoginFailure, postLoginRequest, postLoginSuccess} from './actions';

export type DataType = {
  authorizationStatus: AuthorizationStatus,
  userData?: User | null,
  checkAuthLoading: StatusLoading,
  checkAuthLoadingError: string | null,
  loginLoading: StatusLoading,
  loginLoadingError: string | null,
};

const initialState: DataType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  checkAuthLoading: StatusLoading.Idle,
  checkAuthLoadingError: null,
  loginLoading: StatusLoading.Idle,
  loginLoadingError: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getCheckAuthRequest, (state: DataType) => {
      state.checkAuthLoading = StatusLoading.Loading;
    })
    .addCase(getCheckAuthSuccess, (state: DataType, action) => {
      const {authStatus} = action.payload;
      state.authorizationStatus = authStatus;
      state.checkAuthLoading = StatusLoading.Succeeded;
    })
    .addCase(getCheckAuthFailure, (state: DataType, action) => {
      const {error} = action.payload;
      state.checkAuthLoading = StatusLoading.Failed;
      state.checkAuthLoadingError = error;
    })
    .addCase(postLoginRequest, (state: DataType) => {
      state.loginLoading = StatusLoading.Loading;
    })
    .addCase(postLoginSuccess, (state: DataType, action) => {
      const {authStatus, userData} = action.payload;
      state.authorizationStatus = authStatus;
      state.userData = userData;
      state.loginLoading = StatusLoading.Succeeded;
    })
    .addCase(postLoginFailure, (state: DataType, action) => {
      const {error} = action.payload;
      state.loginLoading = StatusLoading.Failed;
      state.loginLoadingError = error;
    })
    .addCase(logoutAction, (state: DataType) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      dropToken();
    });

});

export {reducer};
