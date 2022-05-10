import {Box, Button} from '@mui/material';
import {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import ContactForm from '../../components/contact-form/contact-form';
import ContactsList from '../../components/contacts-list/contacts-list';
import SearchForm from '../../components/search-form/search-form';
import {AppRoute, ParamNames} from '../../const';
import {fetchContactsAction} from '../../store/data/api-actions';
import {logoutAction} from '../../store/user/actions';
import {Contact} from '../../types/contact';

function Contacts(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();
  const [contactEdit, setContactEdit] = useState<Contact | undefined>();
  const [search, setSearch] = useState('');

  const location = useLocation();
  const {searchFullTextParams: searchFullTextParamsMemo} = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const searchFullTextParams = params.get(ParamNames.SearchFullText);

    return {searchFullTextParams};
  }, [location]);

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

  const handleFormEdit = (contact: Contact) => {
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

  return (
    <Box sx={{height: 400, width: 1450, m: '0 auto', p: 2}}>
      <ContactForm
        contactEditTable={contactEdit}
        onFormReset={handleFormReset}
      />
      <SearchForm
        search={search}
        onSetSearch={handleSetSearch}
      />
      <ContactsList onFormEdit={handleFormEdit}/>
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
    </Box>
  );
}

export default Contacts;
