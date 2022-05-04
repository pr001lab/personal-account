import {toast} from 'react-toastify';
import {APIRoute, AuthorizationStatus} from '../../const';
import {saveToken} from '../../services/token';
import {ThunkActionResult} from '../../types/action';
import {AuthData} from '../../types/auth-data';
import {getCheckAuthFailure, getCheckAuthRequest, getCheckAuthSuccess, postLoginFailure, postLoginRequest, postLoginSuccess} from './actions';

const JSA_PERMISSIONS = '/660';
const JSA_AUTHORIZATION = 'Bearer';
const REGISTER_PASSWORD_SHORT = 'Пароль должен быть не менее 4 символов';
const LOGIN_FAIL_MESSAGE = 'Не верный пароль';

export const checkAuthAction = (): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(getCheckAuthRequest());
    try {
      await api.get(`${JSA_PERMISSIONS}${APIRoute.Users}`);
      dispatch(getCheckAuthSuccess(AuthorizationStatus.Auth));
    } catch (error: any) {
      dispatch(getCheckAuthFailure(error.toString()));
    }
  }
);

export const registerAction = (
  {login: email, password}: AuthData,
): ThunkActionResult => (
  async (dispatch, _getState, api) => {
    dispatch(postLoginRequest());
    try {
      const {data} = await api.post(APIRoute.Users, {email, password});
      const {accessToken: token} = data;
      saveToken(`${JSA_AUTHORIZATION} ${token}`);
      dispatch(postLoginSuccess(AuthorizationStatus.Auth, data));
    } catch (error: any) {
      if (error.response.data === 'Email already exists') {
        dispatch(loginAction({
          login: email,
          password: password,
        }));
      } else if(error.response.data ==='Password is too short') {
        dispatch(postLoginFailure(error.toString()));
        toast.error(REGISTER_PASSWORD_SHORT, {
          toastId: 'error1',
        });
      } else {
        dispatch(postLoginFailure(error.toString()));
        toast.error(error.toString(), {
          toastId: 'error1',
        });
      }
    }
  }
);

export const loginAction = (
  {login: email, password}: AuthData,
): ThunkActionResult => (
  async (dispatch, _getState, api) => {
    dispatch(postLoginRequest());
    try {
      const {data} = await api.post(APIRoute.Login, {email, password});
      const {accessToken: token} = data;
      saveToken(`${JSA_AUTHORIZATION} ${token}`);
      dispatch(postLoginSuccess(AuthorizationStatus.Auth, data));
    } catch (error: any) {
      dispatch(postLoginFailure(error.toString()));
      if (error.response.data === 'Incorrect password') {
        toast.error(LOGIN_FAIL_MESSAGE, {
          toastId: 'error1',
        });
      } else {
        toast.error(error.toString(), {
          toastId: 'error1',
        });
      }
    }
  }
);
