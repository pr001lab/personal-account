import {Close} from '@mui/icons-material';
import {Button, Typography} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import ContactForm from '../../components/contact-form/contact-form';
import Loader from '../../components/loader/loader';
import SearchForm from '../../components/search-form/search-form';
import {AppRoute, ParamNames, StatusLoading} from '../../const';
import {deleteContactAction, fetchContactsAction} from '../../store/data/api-actions';
import {selectContacts, selectContactsLoading} from '../../store/data/selectors';
import {logoutAction} from '../../store/user/actions';
import {Contact} from '../../types/contact';
import './contacts.css';

function Contacts(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const contactsLoading = useSelector(selectContactsLoading);
  const [contactEdit, setContactEdit] = useState<Contact | undefined>();
  const [search, setSearch] = useState('');

  const location = useLocation();
  const {searchFullTextParams: searchFullTextParamsMemo} = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const searchFullTextParams = params.get(ParamNames.SearchFullText);

    return {searchFullTextParams};
  }, [location]);

  const columns: GridColDef[] = [
    {
      field: 'action1',
      headerName: 'Del',
      width: 50,
      renderCell: (params) => (
        <Close
          sx={{color: 'red', cursor: 'pointer'}}
          onClick={()=>handleDeleteListItem(params.row.id)}
        />
      ),
    },
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'name', headerName: 'Name', width: 230},
    {field: 'username', headerName: 'Username', width: 230},
    {field: 'email', headerName: 'Email', width: 330},
    {field: 'city', headerName: 'City', width: 220},
    {field: 'phone', headerName: 'Phone', width: 230},
    {
      field: 'action2',
      headerName: 'Edit',
      width: 80,
      renderCell: (params) => (
        <button
          className='userListEdit'
          onClick={()=>handleEditListItem(params.row)}
        >
          Edit
        </button>
      ),
    },
  ];

  useEffect(() => {
    if (searchFullTextParamsMemo !== null) {
      setSearch(searchFullTextParamsMemo);
    }
  }, [searchFullTextParamsMemo]);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (search) {
      queryParams.append(ParamNames.SearchFullText, search);
    } else {
      queryParams.delete(ParamNames.SearchFullText);
    }
    history.push({
      pathname: AppRoute.Contacts,
      search: queryParams.toString(),
    });
    dispatch(fetchContactsAction(queryParams));
  }, [dispatch, history, search]);

  const handleDeleteListItem = (id: string) => {
    dispatch(deleteContactAction(id));
  };

  const handleEditListItem = (contact: Contact) => {
    setContactEdit(contact);
  };

  const handleFormReset = () => {
    setContactEdit(undefined);
  };

  const handleSetSearch = (searchValue: string) => {
    setSearch(searchValue);
  };

  const handleLogOut = () => {
    dispatch(logoutAction());
  };

  if ([StatusLoading.Idle, StatusLoading.Loading]
    .includes(contactsLoading) || contacts === null) {
    return (
      <Loader />
    );
  }

  return (
    <div className="userList" style={{height: 400, width: 1450, margin: '0 auto', padding: 20}}>
      <ContactForm contactEditTable={contactEdit} onFormReset={handleFormReset} />
      <SearchForm search={search} onSetSearch={handleSetSearch}/>
      <Typography variant="h5" component="h2" style={{fontWeight: 600, marginTop: 10, marginBottom: 20}}>
        Contacts List
      </Typography>
      <DataGrid
        rows={contacts}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
      <Button
        sx={{mt: 2}}
        type='submit'
        color='primary'
        variant="contained"
        fullWidth
        onClick={handleLogOut}
      >
        Log out
      </Button>
    </div>
  );
}

export default Contacts;
