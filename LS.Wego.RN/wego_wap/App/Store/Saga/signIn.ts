import { call, put, fork } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { signIn as ApiSignIn } from './../../Apis/Auth';
import { loading, signIn } from '../Actions';

function* sagaSignIn({ payload: { username: userName, password } }) {
  yield put(loading(true));
  try {
    const data = yield call(ApiSignIn, {
      userName,
      password
    });
    if (data) {
      yield put(signIn({ username: userName, isSignIn: true }));
      AsyncStorage.setItem('userName', userName);
      AsyncStorage.setItem('token', data.token);
      yield put(
        NavigationActions.navigate({
          routeName: 'App'
        })
      );
    } else {
      yield put(loading());
    }
  } catch (e) {
    console.log('catch:', e);
  }
}

export { sagaSignIn };
