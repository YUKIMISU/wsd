import { take, fork, takeLatest } from 'redux-saga/effects';
import { sagaSignIn } from './signIn';
import {
  sagaCheckCarNo,
  sagaAssignStaffList,
  sagaAssignNetNodeList,
  sagaDistributeTask,
  sagaSetAssign
} from './initiateTask';
import { sagaCarList } from './carControl';
import { sagaCarControlDetail, sagaCarAction } from './carControlDetail';

// signIn
const SIGNIN = 'SAGA_SIGNIN';
// initiateTask
const CHECK_CAR_NO = 'SAGA_CHECK_CAR_NO';
const ASSIGN_STAFF_LIST = 'SAGA_ASSIGN_STAFF_LIST';
const ASSIGN_NETNODE_LIST = 'SAGA_ASSIGN_NETNODE_LIST';
const DISTRIBUTE_TASK = 'SAGA_DISTRIBUTE_TASK';
const SET_ASSIGN = 'SAGA_SET_ASSIGN';
// carControl
const CAR_LIST = 'SAGA_CAR_LIST';
// carControlDetail
const CAR_DETAIL = 'SAGA_CAR_DETAIL';
const CAR_ACTION = 'SAGA_CAR_ACTION';

function* watchEveryTask() {
  // SIGNIN
  yield takeLatest(SIGNIN, sagaSignIn);
  // INITIATE_TASK
  yield takeLatest(CHECK_CAR_NO, sagaCheckCarNo);
  yield takeLatest(ASSIGN_STAFF_LIST, sagaAssignStaffList);
  yield takeLatest(ASSIGN_NETNODE_LIST, sagaAssignNetNodeList);
  yield takeLatest(DISTRIBUTE_TASK, sagaDistributeTask);
  yield takeLatest(SET_ASSIGN, sagaSetAssign);
  // CAR_CONTROL
  yield takeLatest(CAR_LIST, sagaCarList);
  // CAR_CONTROL_DETAIL
  yield takeLatest(CAR_DETAIL, sagaCarControlDetail);
  yield takeLatest(CAR_ACTION, sagaCarAction);
}

export {
  // constant
  SIGNIN,
  CHECK_CAR_NO,
  ASSIGN_STAFF_LIST,
  ASSIGN_NETNODE_LIST,
  DISTRIBUTE_TASK,
  SET_ASSIGN,
  CAR_LIST,
  CAR_DETAIL,
  CAR_ACTION,
  // function
  watchEveryTask
};
