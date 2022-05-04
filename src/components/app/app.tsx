import {useSelector} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import Contacts from '../../pages/contacts/contacts';
import Login from '../../pages/login/login';
import {selectAuthorizationStatus} from '../../store/user/selectors';

function App(): JSX.Element {
  const authorizationStatus = useSelector(selectAuthorizationStatus);

  return (
    <Switch>
      <Route
        exact
        path={AppRoute.Contacts}
        render={() => (
          authorizationStatus === AuthorizationStatus.Auth
            ? <Contacts />
            : <Login />
        )}
      >
      </Route>
    </Switch>
  );
}

export default App;
