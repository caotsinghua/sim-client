import { createSlice } from '@reduxjs/toolkit';
import { appConfig } from '../../utils/config';

export interface UserState {
  userInfo: any;
  token: string;
  isLogin: boolean;
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

export const { setToken } = userSlice.actions;

export default userSlice.reducer;
