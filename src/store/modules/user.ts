/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '..';
import { appConfig } from '../../utils/config';
import { LoginFormValues } from '../../views/Login/Login';

export interface UserState {
  userInfo: UserInfo | null;
  token: string;
  isLogin: boolean;
}
export interface UserInfo {
  activated: boolean;
  created: number;
  modified: number;
  type: string;
  username: string;
  uuid: string;
}
const initialState: UserState = {
  userInfo: null,
  token: appConfig.uToken, // 有token不代表已登陆
  isLogin: appConfig.isLogin, // 是否是登陆态，持久化
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, { payload }) {
      appConfig.uToken = payload;
      state.token = payload;
    },
    setIsLogin(state, { payload }) {
      appConfig.isLogin = !!payload;
      state.isLogin = !!payload;
    },
    setUserInfo(state, { payload }) {
      state.userInfo = payload;
    },
  },
});

export const { setToken, setUserInfo, setIsLogin } = userSlice.actions;

// actions
export const login = (loginData: LoginFormValues) => (
  dispatch: AppDispatch
) => {
  return new Promise((resolve) => {
    const options = {
      user: loginData.userName,
      pwd: loginData.password,
      appKey: WebIM.config.appkey,
      success(res: any) {
        const token = res.access_token;
        dispatch(setToken(token));
        dispatch(setUserInfo(res.user));
        dispatch(setIsLogin(true));
        resolve(true);
      },
      error() {
        dispatch(setToken(''));
        dispatch(setUserInfo(null));
        dispatch(setIsLogin(false));
        resolve(false);
      },
    };
    WebIM.conn.open(options);
  });
};
export default userSlice.reducer;
