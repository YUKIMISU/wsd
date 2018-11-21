import { call, put, fork } from 'redux-saga/effects';
import {
  checkCarNo,
  assignStaffList,
  assignNetNodeList,
  distributeTask
} from './../../Apis/App';
import { alert, carStatusById } from '../../Config/utils';
import { initiateTask, loading } from '../Actions';

function* sagaCheckCarNo({ payload: { carNo } }) {
  // yield put(loading(true));
  try {
    const data = yield call(checkCarNo, {
      carNo
    });
    if (data) {
      yield put(
        initiateTask({
          carId: data.id,
          parkPlace: data.position,
          carStatus: carStatusById(data.fStatus)
        })
      );
    }
  } catch (e) {
    console.log('catch:', e);
  }
}

function* sagaAssignStaffList() {
  yield put(loading(true));
  try {
    const data = yield call(assignStaffList);
    console.log('staffList:', data);
    if (data) {
      yield put(
        initiateTask({
          assignStaffList: data
        })
      );
    }
    yield put(loading());
  } catch (e) {
    console.log('catch:', e);
  }
}

function* sagaAssignNetNodeList() {
  yield put(loading(true));
  try {
    const data = yield call(assignNetNodeList);
    console.log('netNodeList:', data);
    if (data) {
      yield put(
        initiateTask({
          assignNetNodeList: data
        })
      );
    }
    yield put(loading());
  } catch (e) {
    console.log('catch:', e);
  }
}

function* sagaDistributeTask({ payload }) {
  console.log('sagaDistributeTask:', payload);
  yield put(loading(true));
  try {
    const data = yield call(distributeTask, payload);
    if (data !== 0) {
      alert('成功', '任务发布');
    }
    yield put(loading());
  } catch (e) {
    console.log('catch:', e);
  }
}

function* sagaSetAssign({ payload: { type, data } }) {
  // yield put(loading(true));
  try {
    yield put(
      initiateTask({
        [type === 0 ? 'assignStaff' : 'assignNetNode']: data
      })
    );
  } catch (e) {
    console.log('catch:', e);
  }
}

export {
  sagaCheckCarNo,
  sagaAssignStaffList,
  sagaAssignNetNodeList,
  sagaDistributeTask,
  sagaSetAssign
};
