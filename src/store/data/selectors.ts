import {StatusLoading} from '../../const';
import {Contact} from '../../types/contact';
import {NameSpace, State} from '../root-reducer';

export const selectContacts = (state: State): Contact[] => (
  state[NameSpace.Contacts].contacts
);
export const selectContactsLoading = (state: State): StatusLoading => (
  state[NameSpace.Contacts].contactsLoading
);
export const selectContactsLoadingError = (state: State): string | null => (
  state[NameSpace.Contacts].contactsLoadingError
);
export const selectAddContactSuccess = (state: State): boolean => (
  state[NameSpace.Contacts].addContactSuccess
);
