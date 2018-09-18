// @flow
import React from 'react';
import { connect } from 'react-redux';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
} from 'react-router-dom';

import { createStructuredSelector } from 'reselect';

// import { Login } from '../auth/components';

import { selectAuthenticated } from '../auth/selectors';

function NotFound() {
  return <div>Could not find page.</div>;
}

function Login() {
  return <div>Login</div>;
}

function Page() {
  return <div>Page</div>;
}

type routeProps = {
  authenticated: Boolean,
  component: Function,
};

const PrivateRoute = ({ authenticated, component: Component, ...rest }: routeProps) => (
  <Route
    {...rest}
    render={(props) => (
    authenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )}
  />
);

const mapStateToProps = createStructuredSelector({
  authenticated: selectAuthenticated(),
});

const mapDispatchToProps = {};

type Props = {
  authenticated: typeof selectAuthenticated,
};

const AppRouter = (props: Props) => {
  const { authenticated } = props;

  return (
    <Router>
      <div>
        <PrivateRoute
          path="/"
          component={Page}
          authenticated={authenticated}
        />
        <Route exact path="/login" component={Login} />
        <Route path="/404" component={NotFound} />
      </div>
    </Router>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
