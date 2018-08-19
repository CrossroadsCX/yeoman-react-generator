import { all } from 'redux-saga/effects';

<%- moduleSagaImportBlock %>
export default function* rootSaga() {
  yield all([
<%- moduleSagaCombinationBlock %>
  ]);
}
