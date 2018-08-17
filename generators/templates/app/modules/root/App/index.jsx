// @flow
import React from 'react';
import Helmet from 'react-helmet';

import Router from '../../router';

import errorBoundary from '../../core/utils/errorBoundary';
import helmetConfig from '../helmetConfig';

// import styles from './styles.css';



function App() {
  return (
    <div>
      <Helmet title="App Title" meta={helmetConfig.meta}/>
      <Router />
    </div>
  );
}

type Props = {
  _error: String,
  _info: String,
};

function AppErrorComponent(props: Props) {
  return (
    <div>
      <h1>An error has occurred.</h1>
      <i>¯\_(ツ)_/¯</i>
      <i>{ props._info }</i>
      <strong>{ props._error }</strong>
    </div>
  );
}

export default errorBoundary(AppErrorComponent)(App);
