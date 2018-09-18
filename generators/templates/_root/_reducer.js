import { combineReducers } from 'redux';

import auth from '../auth/reducer';

<%- moduleReducerImportBlock %>

export default combineReducers({
  auth,
  <%- moduleReducerCombinationBlock %>
});
