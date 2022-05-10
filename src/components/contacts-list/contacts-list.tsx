import {Close} from '@mui/icons-material';
import {Button, Typography} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useDispatch, useSelector} from 'react-redux';
import {StatusLoading} from '../../const';
import {deleteContactAction} from '../../store/data/api-actions';
import {selectContacts, selectContactsLoading} from '../../store/data/selectors';
import {Contact} from '../../types/contact';
import Loader from '../loader/loader';

type ComponentProps = {
  onFormEdit: (contact: Contact) => void;
}

function ContactsList({onFormEdit}: ComponentProps): JSX.Element {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const contactsLoading = useSelector(selectContactsLoading);

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
        <Button
          sx={{border: 'none', backgroundColor: '#3bb077', color: 'white'}}
          onClick={()=>handleEditListItem(params.row)}
        >
          Edit
        </Button>
      ),
    },
  ];

  const handleDeleteListItem = (id: string) => {
    dispatch(deleteContactAction(id));
  };

  const handleEditListItem = (contact: Contact) => {
    onFormEdit(contact);
  };

  if ([StatusLoading.Idle, StatusLoading.Loading]
    .includes(contactsLoading) || contacts === null) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <Typography
        variant="h5"
        component="h2"
        sx={{fontWeight: 600, mt: 1, mb: 2}}
      >
        Contacts List
      </Typography>
      <DataGrid
        rows={contacts}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </>
  );
}

export default ContactsList;
