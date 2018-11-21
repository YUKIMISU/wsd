import API from './config/API.d'
import path from './config/path.d'
import link from './config/link.d'
import messages from './config/messages.d'

export interface config {
  isAndroid: boolean;
  isApp: boolean;
  isIOS: boolean;
  isLtIE9: boolean;
  isPC: boolean;
  isTest: boolean;
  isWap: boolean;
  platform: string;
  API: API;
  path: path;
  link: link;
  message: messages;
}

export const isAndroid: boolean;
export const isApp: boolean;
export const isIOS: boolean;
export const isLtIE9: boolean;
export const isPC: boolean;
export const isTest: boolean;
export const isWap: boolean;
export const platform: string;
export const API: API;
export const path: path;
export const link: link;
export const message: messages;