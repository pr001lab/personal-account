import {combineReducers} from 'redux';
import {reducer as userReducer} from './user/reducer';

export enum NameSpace {
  User = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.User]: userReducer,
});

export type State = ReturnType<typeof rootReducer>;
