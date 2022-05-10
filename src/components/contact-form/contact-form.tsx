import {AccountCircle, AlternateEmail, InsertEmoticon, LocalPhone, LocationCity} from '@mui/icons-material';
import {Box, Button, TextField, Typography} from '@mui/material';
import {useEffect} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {addContactSuccess} from '../../store/data/actions';
import {addContactAction, patchContactAction} from '../../store/data/api-actions';
import {selectAddContactSuccess} from '../../store/data/selectors';
import {Contact, PostContact} from '../../types/contact';

const FORM_EMPTY_USER_MESSAGE = 'Данные не предоставлены';

type ComponentProps = {
  contactEditTable?: Contact;
  onFormReset: () => void;
}

function ContactForm({contactEditTable, onFormReset}: ComponentProps): JSX.Element {
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<PostContact>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      username: '',
      email: '',
      city: '',
      phone: '',
    },
  });
  const dispatch = useDispatch();
  const addContactSuccessResult = useSelector(selectAddContactSuccess);

  useEffect(() => {
    if (contactEditTable !== undefined) {
      reset(contactEditTable);
    } else {
      reset({
        name: '',
        username: '',
        email: '',
        city: '',
        phone: '',
      });
    }
  }, [contactEditTable, reset]);

  useEffect(() => {
    if (addContactSuccessResult) {
      reset({
        name: '',
        username: '',
        email: '',
        city: '',
        phone: '',
      });
    }
    dispatch(addContactSuccess(false));
  }, [addContactSuccessResult, dispatch, reset]);

  const handleFormSubmit: SubmitHandler<PostContact | Contact> = (data: {[key: string]: string | number}) => {
    Object.keys(data).forEach((key) => {
      if (data[key] === '') {
        data[key] = FORM_EMPTY_USER_MESSAGE;
      }
      return data[key];
    });

    if ('id' in data) {
      dispatch(patchContactAction(data as Contact));
    } else {
      const {id, ...postData} = data;
      dispatch(addContactAction(postData as PostContact));
    }
  };

  const handleReset = () => {
    reset();
    onFormReset();
  };

  return (
    <>
      <Typography variant="h5" component="h2" sx={{fontWeight: 600}}>
        Contact Form
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box sx={{display: 'flex', alignItems: 'flex-end', mt: 0}}>
          <AccountCircle
            sx={{ color: 'action.active', mr: 1, my: 0.5 }}
          />
          <Controller
            render={({field}) => (
              <TextField
                {...field}
                label="Name"
                variant="standard"
              />
            )}
            control={control}
            name="name"
          />
        </Box>
        <Box sx={{display: 'flex', alignItems: 'flex-end', mt: 2}}>
          <InsertEmoticon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <Controller
            render={({field}) => (
              <TextField
                {...field}
                label="Username"
                variant="standard"
                required
              />
            )}
            control={control}
            name="username"
          />
        </Box>
        <Box sx={{display: 'flex', alignItems: 'flex-end', mt: 2}}>
          <AlternateEmail sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <Controller
            render={({field}) => (
              <TextField
                {...field}
                label="Email"
                variant="standard"
                type="email"
                required
              />
            )}
            control={control}
            name="email"
          />
        </Box>
        <Box sx={{display: 'flex', alignItems: 'flex-end', mt: 2}}>
          <LocationCity sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <Controller
            render={({field}) => (
              <TextField
                {...field}
                label="City"
                variant="standard"
              />
            )}
            control={control}
            name="city"
          />
        </Box>
        <Box sx={{display: 'flex', alignItems: 'flex-end', mt: 2}}>
          <LocalPhone sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <Controller
            render={({field}) => (
              <TextField
                {...field}
                label="Phone"
                variant="standard"
              />
            )}
            control={control}
            name="phone"
          />
        </Box>
        <Button
          sx={{mt: 2}}
          type='submit'
          color='primary'
          variant="contained"
        >
          Save
        </Button>
        <Button
          sx={{mt: 2, ml: 2}}
          type='reset'
          color='primary'
          variant="contained"
          onClick={handleReset}
        >
          Reset
        </Button>
      </form>
    </>
  );
}

export default ContactForm;
