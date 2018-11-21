import { createAction, createActions } from 'redux-actions';

/**
 * Global Loading.
 */
const loading = createAction('LOADING', (isLoading = false) => ({ isLoading }));

/**
 * Task.
 */
const { signIn, initiateTask, carControl, carControlDetail } = createActions({
  // signIn
  SIGN_IN: user => user,
  // initiateTask
  INITIATE_TASK: taskMsg => taskMsg,
  // carControl
  CAR_CONTROL: carMsg => carMsg,
  // carControlDetail
  CAR_CONTROL_DETAIL: carControlDetail => carControlDetail
});

export {
  // global
  loading,
  //signIn
  signIn,
  // initiateTask
  initiateTask,
  // carControl
  carControl,
  // carControlDetail
  carControlDetail
};
