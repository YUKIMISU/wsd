import axios from 'axios';
import Qs from 'qs';
import { AsyncStorage, Alert } from 'react-native';
import { alert } from './utils';
import { RootStack } from '../App';

const BASE_URL = __DEV__
  ? 'http://36.7.138.114:5026/wegoapi/api'
  : 'http://manageapi2.wego-auto.com/wego/api';

// const BASE_URL = 'http://manageapi2.wego-auto.com/wego/api'

// 添加请求拦截器
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 20,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json'
  }
});
// http request 拦截器
instance.interceptors.request.use(
  async config => {
    // ADD 添加从Url获取token
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.common['Authorization'] = token;
    }
    config.data = Qs.stringify(config.data) || config.data;
    return config;
  },
  err => {
    alert('请求失败', err.message);
    // return Promise.reject(err)
  }
);

// http response 拦截器
instance.interceptors.response.use(
  response => {
    console.log('response:', response);
    const { data } = response;
    if (response.headers.Authorization) {
      AsyncStorage.setItem('token', response.headers.Authorization);
    }
    if (data.code !== 0) {
      alert('提示', data.message);
      return 0;
    }
    return data.data || data.page;
  },
  err => {
    if (err.response) {
      switch (err.response.status) {
        case 403:
          break;
        default:
          alert('响应失败', err.response.data.message);
          break;
      }
    }
    // return Promise.reject(err) // 返回接口返回的错误信息
  }
);

// 请求处理
export default instance;
