import fetch from '../Config/fetch';
import { getUrl } from '../Config/utils';

/**
 * InitiateTask.
 */
export const checkCarNo = data => {
  return fetch({
    url: getUrl('check'),
    method: 'post',
    data
  });
};

export const assignStaffList = data => {
  return fetch({
    url: getUrl('assignList'),
    method: 'post',
    data
  });
};

export const assignNetNodeList = data => {
  return fetch({
    url: getUrl('storeList'),
    method: 'post',
    data
  });
};

export const distributeTask = data => {
  return fetch({
    url: getUrl('task'),
    method: 'post',
    data
  });
};

/**
 * CarControl.
 */
export const carList = data => {
  return fetch({
    url: getUrl('findCar'),
    method: 'post',
    data
  });
};

/**
 * CarControlDetail.
 */
export const carDetail = data => {
  return fetch({
    url: getUrl('findCarDetail'),
    method: 'post',
    data
  });
};
export const carWhistle = data => {
  return fetch({
    url: getUrl('FindCar'),
    method: 'get',
    params: data
  });
};

export const carDetailLock = data => {
  return fetch({
    url: getUrl('DoorControl'),
    method: 'get',
    params: data
  });
};
