import { call, put, select } from 'redux-saga/effects';
import {
  carDetail as ApiCarDetail,
  carWhistle as ApiCarWhistle,
  carDetailLock as ApiCarDetailLock
} from './../../Apis/App';
import { carStatusById, alert, formatDate } from '../../Config/utils';
import { loading, carControlDetail } from '../Actions';

const DEFAULT_CARLIST_PARAMS = {
  carNo: '',
  pageNum: 1,
  pageSize: 20
};

const CAR_DETAIL_LIST = [
  {
    name: '续航里程',
    key: 'mileage',
    value: 0,
    unit: 'KM'
  },
  {
    name: '电量油量',
    key: 'electric',
    value: 0,
    unit: '%'
  },
  {
    name: '当前距离',
    key: 'distance',
    value: 0,
    unit: 'KM'
  },
  {
    name: '电瓶电压',
    key: 'voltage',
    value: 0,
    unit: 'V'
  },
  {
    name: '还车时间',
    key: 'tEndDate',
    value: 0,
    unit: ''
  }
];

function* sagaCarControlDetail({ payload: id }) {
  // yield put(loading(true));
  try {
    const data = yield call(ApiCarDetail, {
      id
    });
    if (data) {
      // to get list
      yield put(
        carControlDetail({
          center: {
            longitude: data.longitude,
            latitude: data.latitude
          },
          title: data.carName,
          status: carStatusById(data.fStatus),
          list: CAR_DETAIL_LIST.map(item => {
            item.value =
              item.name === '还车时间'
                ? formatDate(new Date(data[item.key]), 'yyyy-MM-dd')
                : data[item.key];
            return item;
          })
        })
      );
    }
  } catch (e) {
    console.warn('catch:', e.message);
  }
}

/**
 * sagaCarAction.
 * - type - 0 whistle 1 open lock 2 lock
 */
function* sagaCarAction({ payload: { type, carId: id } }) {
  try {
    let data;
    if (type === 0) {
      data = yield call(ApiCarWhistle, {
        type: 3,
        id
      });
    } else if (type === 1) {
      data = yield call(ApiCarDetailLock, {
        type: 1,
        id
      });
    } else if (type === 2) {
      data = yield call(ApiCarDetailLock, {
        type: 2,
        id
      });
    }

    if (data !== 0) {
      alert(
        '成功提示',
        `${type === 0 ? '鸣笛' : type === 1 ? '开锁' : '锁门'}成功`
      );
    }
  } catch (e) {
    console.warn('catch:', e.message);
  }
}

export { sagaCarControlDetail, sagaCarAction };
