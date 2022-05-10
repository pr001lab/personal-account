import {createReducer} from '@reduxjs/toolkit';
import {StatusLoading} from '../../const';
import {Contact} from '../../types/contact';
import {
  addContactSuccess,
  deleteContactsFailure,
  deleteContactsRequest,
  deleteContactsSuccess,
  loadContactsFailure,
  loadContactsRequest,
  loadContactsSuccess
} from './actions';

export type DataType = {
  contacts: Contact[],
  contactsLoading: StatusLoading,
  contactsLoadingError: string | null,
  addContactSuccess: boolean,
};

const initialState: DataType = {
  contacts: [],
  contactsLoading: StatusLoading.Idle,
  contactsLoadingError: null,
  addContactSuccess: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadContactsRequest, (state: DataType) => {
      state.contactsLoading = StatusLoading.Loading;
    })
    .addCase(loadContactsSuccess, (state: DataType, action) => {
      const {contacts} = action.payload;
      state.contacts = contacts;
      state.contactsLoading = StatusLoading.Succeeded;
    })
    .addCase(loadContactsFailure, (state: DataType, action) => {
      const {error} = action.payload;
      state.addContactSuccess = false;
      state.contactsLoading = StatusLoading.Failed;
      state.contactsLoadingError = error;
    })
    .addCase(addContactSuccess, (state: DataType, action) => {
      const {result} = action.payload;
      state.addContactSuccess = result;
    })
    .addCase(deleteContactsRequest, (state: DataType) => {
      state.contactsLoading = StatusLoading.Loading;
    })
    .addCase(deleteContactsSuccess, (state: DataType) => {
      state.contactsLoading = StatusLoading.Succeeded;
    })
    .addCase(deleteContactsFailure, (state: DataType, action) => {
      const {error} = action.payload;
      state.contactsLoading = StatusLoading.Failed;
      state.contactsLoadingError = error;
    });

});

export {reducer};
