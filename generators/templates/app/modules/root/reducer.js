import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

import auth from '../auth/reducer';

const reducers = {
  auth,
  form: formReducer,
};

export default combineReducers(reducers);
