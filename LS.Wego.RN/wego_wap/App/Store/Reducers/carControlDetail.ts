// import * as R from 'ramda'
import { handleActions } from 'redux-actions';
import { carControlDetail } from '../Actions';

const INITIAL_STATE = {
  center: {},
  title: '',
  status: '',
  list: []
};

const reducer = handleActions(
  {
    [carControlDetail]: (state, { payload }) => ({
      ...state,
      ...payload
    })
  },
  INITIAL_STATE
);

export default reducer;
