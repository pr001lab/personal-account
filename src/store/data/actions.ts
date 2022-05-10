import {createAction} from '@reduxjs/toolkit';
import {Contact} from '../../types/contact';

export enum ActionType {
  LoadContactsRequest = 'data/loadContactsRequest',
  LoadContactsSuccess = 'data/loadContactsSuccess',
  LoadContactsFailure = 'data/loadContactsFailure',
  AddContactSuccess = 'data/addContactSuccess',
  DeleteContactsRequest = 'data/deleteContactsRequest',
  DeleteContactsSuccess = 'data/deleteContactsSuccess',
  DeleteContactsFailure = 'data/deleteContactsFailure',
}

export const loadContactsRequest = createAction(ActionType.LoadContactsRequest);

export const loadContactsSuccess = createAction(
  ActionType.LoadContactsSuccess, (contacts: Contact[]) => ({
    payload: {
      contacts,
    },
  }),
);

export const loadContactsFailure = createAction(
  ActionType.LoadContactsFailure, (error: string | null) => ({
    payload: {
      error,
    },
  }),
);

export const addContactSuccess = createAction(ActionType.AddContactSuccess, (result: boolean) => (
  {
    payload: {
      result,
    },
  }),
);

export const deleteContactsRequest = createAction(ActionType.DeleteContactsRequest);

export const deleteContactsSuccess = createAction(
  ActionType.DeleteContactsSuccess);

export const deleteContactsFailure = createAction(
  ActionType.DeleteContactsFailure, (error: string | null) => ({
    payload: {
      error,
    },
  }),
);
