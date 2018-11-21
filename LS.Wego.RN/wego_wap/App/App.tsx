/**
 * Copyright (c) 2018-present, Lishan, Inc.
 *
 * @JuCaiFE
 */
import * as React from 'react';
import { Provider } from 'react-redux';
import store from './Store';
import RootStack from './Navigation';
import axios from './Config/fetch';
import { signIn } from './Apis/Auth';
/**
 * APP.
 */
console.log('ts');
export default () => (
  <Provider store={store}>
    <RootStack />
  </Provider>
);
