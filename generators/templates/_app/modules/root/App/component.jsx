import React from 'react';
import Helmet from 'react-helmet';

import { Banner } from 'modules/banner';
import errorBoundary from 'modules/core/utils/errorBoundary';
import { Navbar } from 'modules/navbar';
import { DEFAULT_TAB_TITLE } from 'modules/router/constants';

import helmConfig from '../helmConfig';

import StagingWarning from '../StagingWarning';
import styles from './styles.css';

function App(props) {
  return (
    <div className={styles.app}>
      <Helmet title={DEFAULT_TAB_TITLE} meta={helmConfig.meta} link={helmConfig.link} />
      <StagingWarning />
      <Navbar />
      <Banner />
      <div className={styles.appContent}>{props.children}</div>
    </div>
  );
}

function CustomErrorComponent() {
  return (
    <div>
      <h1>An error has occurred.</h1>
      <h1>Please contact support.</h1>
    </div>
  );
}

export default errorBoundary(CustomErrorComponent)(App);
