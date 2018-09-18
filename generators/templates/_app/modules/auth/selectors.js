import { createSelector } from 'reselect';

const getAuthRoot = () => state => state.auth;

export const selectAuthenticated = () =>
  createSelector(getAuthRoot(), state => state.authenticated);
