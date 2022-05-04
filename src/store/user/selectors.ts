import {AuthorizationStatus} from '../../const';
import {User} from '../../types/user';
import {NameSpace, State} from '../root-reducer';

export const selectAuthorizationStatus = (state: State): AuthorizationStatus => (
  state[NameSpace.User].authorizationStatus
);
export const selectUserData = (state: State): User | null | undefined => (
  state[NameSpace.User].userData
);
