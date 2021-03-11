import { Provider } from 'react-redux';
import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import store from './store';

import Main from './views/Main/Main';
import Login from './views/Login/Login';
import { useCheckLogin } from './hooks/auth';
import './App.css';

const Authed = () => {
  const isLogin = useCheckLogin();
  if (!isLogin) {
    return <Redirect to="/login" />;
  }
  return (
    <Switch>
      <Route path="/" component={Main} />
    </Switch>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/" render={() => <Authed />} />
        </Switch>
      </Router>
    </Provider>
  );
}
