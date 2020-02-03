import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Feed from '../Routes/Feed';
import Auth from '../Routes/Auth';
import Expolore from '../Routes/Explore';
import Profile from '../Routes/Profile';
import Search from '../Routes/Search';

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route path="/explore" component={Expolore} />
    <Route path="/search" component={Search} />
    {/* Profile이 Explore 보다 위에 있으면 Explore는 영원히 나올수가 없다.(:username가 먼저 나와버림) */}
    <Route path="/:userName" component={Profile} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;
