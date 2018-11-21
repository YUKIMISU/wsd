// import * as R from 'ramda'
import { handleActions } from 'redux-actions';
import { carControl } from '../Actions';

const INITIAL_STATE = {
  carList: [],
  pageNum: 1,
  totalNum: 0
};

const reducer = handleActions(
  {
    [carControl]: (state, { payload }) => ({
      ...state,
      ...payload
    })
  },
  INITIAL_STATE
);

export default reducer;
