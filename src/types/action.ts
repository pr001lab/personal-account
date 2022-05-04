import {AxiosInstance} from 'axios';
import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {State} from '../store/root-reducer';

export type ThunkActionResult<R = Promise<void>>
  = ThunkAction<R, State, AxiosInstance, Action>;
