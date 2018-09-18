// @flow
import React from 'react';
import Helmet from 'react-helmet';

import Router from '../../router';

import errorBoundary from '../../core/utils/errorBoundary';
import helmetConfig from '../helmetConfig';

function App() {
  return (
    <div>
      <Helmet title="App Title" meta={helmetConfig.meta} />
      <Router />
    </div>
  );
}

type Props = {
  _error: String,
  _info: String,
};

function AppErrorComponent(props: Props) {
  const {
    _error,
    _info,
  } = props;

  return (
    <div>
      <h1>An error has occurred.</h1>
      <i>¯\_(ツ)_/¯</i>
      <i>{ _info }</i>
      <strong>{ _error }</strong>
    </div>
  );
}

export default errorBoundary(AppErrorComponent)(App);
