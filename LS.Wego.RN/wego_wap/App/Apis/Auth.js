import fetch from '../Config/fetch';
import { getUrl } from '../Config/utils';

/**
 * SignIn.
 */
export const signIn = data => {
  return fetch({
    url: getUrl('login/app', 1),
    method: 'post',
    data
  });
};

/**
 * ModifyPassWord.
 * For first time modifyPassword
 */
export const modifyPassword = data =>
  fetch({
    url: getUrl('updatePass', 2),
    method: 'post',
    data
  });

/**
 * RegisterOrder.
 */
export const registerOrder = data =>
  fetch({
    url: getUrl('work', 2),
    method: 'post',
    data
  });
