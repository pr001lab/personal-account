import {createAction} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../../const';
import {User} from '../../types/user';

export enum ActionType {
  GetCheckAuthRequest = 'user/GetCheckAuthRequest',
  GetCheckAuthSuccess = 'user/GetCheckAuthSuccess',
  GetCheckAuthFailure = 'user/GetCheckAuthFailure',
  PostLoginRequest = 'user/PostLoginRequest',
  PostLoginSuccess = 'user/PostLoginSuccess',
  PostLoginFailure = 'user/PostLoginFailure',
  LogoutAction = 'user/LogoutAction',
}

export const getCheckAuthRequest = createAction(ActionType.GetCheckAuthRequest);

export const getCheckAuthSuccess = createAction(
  ActionType.GetCheckAuthSuccess, (
    authStatus: AuthorizationStatus,
  ) => ({
    payload: {
      authStatus,
    },
  }),
);

export const getCheckAuthFailure = createAction(
  ActionType.GetCheckAuthFailure, (error: string | null) => ({
    payload: {
      error,
    },
  }),
);

export const postLoginRequest = createAction(ActionType.PostLoginRequest);

export const postLoginSuccess = createAction(
  ActionType.PostLoginSuccess, (
    authStatus: AuthorizationStatus, userData?: User | null,
  ) => ({
    payload: {
      authStatus,
      userData,
    },
  }),
);

export const postLoginFailure = createAction(
  ActionType.PostLoginFailure, (error: string | null) => ({
    payload: {
      error,
    },
  }),
);

export const logoutAction = createAction(ActionType.LogoutAction);
