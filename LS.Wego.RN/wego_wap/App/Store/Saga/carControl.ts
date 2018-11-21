import { call, put, select } from 'redux-saga/effects';
// import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation';
import { carList as ApiCarList } from './../../Apis/App';
import { loading, carControl } from '../Actions';

const DEFAULT_CARLIST_PARAMS = {
  carNo: '',
  pageNum: 1,
  pageSize: 20
};

function* sagaCarList({ payload }) {
  yield put(loading(true));
  try {
    const data = yield call(ApiCarList, {
      ...DEFAULT_CARLIST_PARAMS,
      ...payload
    });
    if (data) {
      const { pageNum, carList } = yield select(state => state.carControl);
      yield put(
        carControl({
          carList:
            data.pageNum > pageNum
              ? [carList, ...data.pageList]
              : data.pageList,
          pageNum: data.pageNum,
          totalNum: data.totalPageNum
        })
      );
      yield put(loading());
    }
  } catch (e) {
    console.log('catch:', e);
  }
}

export { sagaCarList };
