import { combineReducers } from 'redux';
import { handleAction } from 'redux-actions';
import { navReducer } from '../../Navigation/config';
import { loading } from '../Actions';
import signIn from './signIn';
import initiateTask from './initiateTask';
import carControl from './carControl';
import carControlDetail from './carControlDetail';

// Global loadingReducer.
const loadingReducer = handleAction(
  loading,
  (state, { payload: { isLoading } }) => isLoading,
  false
);

/**
 * RootReducer.
 */
export default combineReducers({
  nav: navReducer,
  signIn,
  loading: loadingReducer,
  initiateTask,
  carControl,
  carControlDetail
});
