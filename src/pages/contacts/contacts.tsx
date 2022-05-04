import {Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {logoutAction} from '../../store/user/actions';
import {selectUserData} from '../../store/user/selectors';

function Contacts(): JSX.Element {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);

  const handleLogOut = () => {
    dispatch(logoutAction());
  };

  return (
    <div
      style={{ height: '100vh' }}
      className="d-flex justify-content-center align-items-center"
    >
      <div style={{ width: 300 }}>
        <h1 className="text-center">Hello, {userData?.email}</h1>
        <Button
          variant="primary"
          type="button"
          className="w-100 mt-3 border-radius"
          onClick={handleLogOut}
        >
          Log out
        </Button>
      </div>
    </div>
  );
}

export default Contacts;
