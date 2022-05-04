import {FormEvent, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {registerAction} from '../../store/user/api-actions';

function Login(): JSX.Element {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(registerAction({
      login: email,
      password: password,
    }));

  };

  return (
    <div
      style={{ height: '100vh' }}
      className="d-flex justify-content-center align-items-center"
    >
      <div style={{ width: 300 }}>
        <h1 className="text-center">Sign in</h1>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(evt) => {
                setEmail(evt.target.value);
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(evt) => {
                setPassword(evt.target.value);
              }}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="w-100 mt-3"
          >
          Sign in
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
