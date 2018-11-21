// import * as R from 'ramda'
import { handleActions } from 'redux-actions';
import { initiateTask } from '../Actions';

const INITIAL_STATE = {
  carId: -1,
  parkPlace: '',
  carStatus: '',
  assignStaff: {},
  assignStaffList: [],
  assignNetNode: {},
  assignNetNodeList: []
};

const reducer = handleActions(
  {
    [initiateTask]: (state, { payload }) => ({
      ...state,
      ...payload
    })
  },
  INITIAL_STATE
);

export default reducer;
