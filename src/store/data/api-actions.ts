import {toast} from 'react-toastify';
import {APIRoute} from '../../const';
import {ThunkActionResult} from '../../types/action';
import {Contact, PostContact} from '../../types/contact';
import {
  deleteContactsFailure,
  deleteContactsRequest,
  deleteContactsSuccess,
  loadContactsFailure,
  loadContactsRequest,
  loadContactsSuccess
} from './actions';

const GET_FAILURE_MESSAGE = 'Не удалось получить данные. Попробуйте попозже.';
const POST_FAILURE_MESSAGE = 'Не удалось отправить данные. Попробуйте попозже.';
const DELETE_FAILURE_MESSAGE = 'Не удалось получить данные. Попробуйте попозже.';

export const fetchContactsAction = (params = {}): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    const baseUrl = APIRoute.Contacts;
    dispatch(loadContactsRequest());
    try {
      const {data} = await api.get(baseUrl, {params: params});
      dispatch(loadContactsSuccess(data));
    } catch (error: any) {
      dispatch(loadContactsFailure(error.toString()));
      toast.error(GET_FAILURE_MESSAGE, {
        toastId: 'error1',
      });
    }
  }
);

export const postContactAction = (contact: PostContact): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    const baseUrl = APIRoute.Contacts;
    dispatch(loadContactsRequest());
    try {
      await api.post(baseUrl, contact);
      dispatch(fetchContactsAction());
    } catch (error: any) {
      dispatch(loadContactsFailure(error.toString()));
      toast.error(POST_FAILURE_MESSAGE, {
        toastId: 'error1',
      });
    }
  }
);

export const patchContactAction = (contact: Contact): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    const baseUrl = APIRoute.Contacts;
    dispatch(loadContactsRequest());
    try {
      await api.patch(`${baseUrl}/${contact.id}`, contact);
      dispatch(fetchContactsAction());
    } catch (error: any) {
      dispatch(loadContactsFailure(error.toString()));
      toast.error(POST_FAILURE_MESSAGE, {
        toastId: 'error1',
      });
    }
  }
);

export const deleteContactAction = (contactId: string): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    const baseUrl = APIRoute.Contacts;
    dispatch(deleteContactsRequest());
    try {
      await api.delete(`${baseUrl}/${contactId}`);
      dispatch(deleteContactsSuccess);
      dispatch(fetchContactsAction());
    } catch (error: any) {
      dispatch(deleteContactsFailure(error.toString()));
      toast.error(DELETE_FAILURE_MESSAGE, {
        toastId: 'error1',
      });
    }
  }
);
