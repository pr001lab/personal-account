import {DoDisturbOn} from '@mui/icons-material';
import {Box, Button, Grid, Paper, TextField, Typography} from '@mui/material';
import {FormEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/loader/loader';
import {StatusLoading} from '../../const';
import {registerAction} from '../../store/user/api-actions';
import {selectCheckAuthLoading} from '../../store/user/selectors';

function Login(): JSX.Element {
  const dispatch = useDispatch();
  const checkAuthLoading = useSelector(selectCheckAuthLoading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(registerAction({
      login: email,
      password: password,
    }));
  };

  if ([StatusLoading.Idle, StatusLoading.Loading]
    .includes(checkAuthLoading)
    || [StatusLoading.Idle, StatusLoading.Loading]
      .includes(checkAuthLoading)) {
    return (
      <Loader />
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper
        className='paperStyle'
        sx={{p: 4, width: 300}}
        elevation={10}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <DoDisturbOn sx={{ fontSize: 50, color: 'red' }}/>
          <Typography variant="h5" component="h2" sx={{fontWeight: 600, mb: 4}}>
            Sign In
          </Typography>
        </Grid>
        <form
          onSubmit={handleFormSubmit}
        >
          <TextField
            type="email"
            label='Email address'
            placeholder='Enter email'
            fullWidth
            required
            autoFocus
            onChange={(evt) => {
              setEmail(evt.target.value);
            }}
          />
          <TextField
            sx={{mt: 2}}
            type='password'
            label='Password'
            placeholder='Enter password'
            fullWidth
            required
            onChange={(evt) => {
              setPassword(evt.target.value);
            }}
          />
          <Button
            sx={{mt: 2}}
            type='submit'
            color='primary'
            variant="contained"
            fullWidth
          >
            Sign Up/Sign In
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;
