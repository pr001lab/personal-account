import {AuthorizationStatus, StatusLoading} from '../../const';
import {User} from '../../types/user';
import {NameSpace, State} from '../root-reducer';

export const selectAuthorizationStatus = (state: State): AuthorizationStatus => (
  state[NameSpace.User].authorizationStatus
);
export const selectUserData = (state: State): User | null | undefined => (
  state[NameSpace.User].userData
);
export const selectCheckAuthLoading = (state: State): StatusLoading => (
  state[NameSpace.User].checkAuthLoading
);
export const selectCheckAuthLoadingError = (state: State): string | null => (
  state[NameSpace.User].checkAuthLoadingError
);
export const selectLoginLoading = (state: State): StatusLoading => (
  state[NameSpace.User].loginLoading
);
export const selectLoginLoadingError = (state: State): string | null => (
  state[NameSpace.User].loginLoadingError
);
