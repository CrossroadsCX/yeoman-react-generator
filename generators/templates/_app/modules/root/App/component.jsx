import React from 'react';
import Helmet from 'react-helmet';

import errorBoundary from '../../core/utils/errorBoundary';
import { DEFAULT_TAB_TITLE } from '../../core/constants';

import helmetConfig from '../helmetConfig';

import styles from './styles.css';

type Props = {
  children: Array<any>,
};

function App(props: Props) {
  const { children } = props;

  return (
    <div className={styles.app}>
      <Helmet title={DEFAULT_TAB_TITLE} meta={helmetConfig.meta} link={helmetConfig.link} />
      <div className={styles.appContent}>{children}</div>
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
