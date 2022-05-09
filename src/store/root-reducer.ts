import {combineReducers} from 'redux';
import {reducer as contactsReducer} from './data/reducer';
import {reducer as userReducer} from './user/reducer';

export enum NameSpace {
  User = 'USER',
  Contacts = 'CONTACTS',
}

export const rootReducer = combineReducers({
  [NameSpace.User]: userReducer,
  [NameSpace.Contacts]: contactsReducer,
});

export type State = ReturnType<typeof rootReducer>;
