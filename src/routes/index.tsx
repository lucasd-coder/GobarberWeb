import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Dashboard from '../page/Dashboard';
import SignIn from '../page/SignIn';
import SignUp from '../page/SignUp';
import ForgotPassword from '../page/ForgotPassword';
import ResetPassword from '../page/ResetPassword';
import Profile from '../page/Profile';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="/forgot-password" exact component={ForgotPassword} />
    <Route path="/reset-password" exact component={ResetPassword} />

    <Route path="/profile" exact component={Profile} isPrivate />
    <Route path="/dashboard" exact component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
