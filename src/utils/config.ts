/* eslint-disable class-methods-use-this */
import appStorage from './storage';

export class AppConfig {
  get uToken() {
    return appStorage.get('uToken', '') as string;
  }

  set uToken(token: string) {
    appStorage.set('uToken', token);
  }

  get isLogin() {
    return appStorage.get('isLogin', false) as boolean;
  }

  set isLogin(value: boolean) {
    appStorage.set('isLogin', value);
  }
}

export const appConfig = new AppConfig();
