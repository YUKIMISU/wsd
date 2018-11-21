import { Alert } from 'react-native';
/**
 * getUrl.
 */
export const getUrl = (path, type) => {
  let prefix;
  switch (type) {
    case 1:
      prefix = 'home/';
      break;
    case 2:
      prefix = 'app/sign/';
      break;
    default:
      prefix = 'app/car/';
  }
  return prefix + path;
};

export const alert = (title, message) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'OK'
      }
    ],
    {
      cancelable: false
    }
  );
};

export function carStatusById(id) {
  switch (id) {
    case 0:
      return '已禁用';
    case 1:
      return '可用';
    case 2:
      return '已租';
    case 3:
      return '任务中';
    case 4:
      return '可用(待分配)';
    case 5:
      return '维修中';
    default:
      return '';
  }
}

export function formatDate(date, fmt) {
  var o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
}
