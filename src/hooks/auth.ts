import { useAppSelector } from '../store';

// eslint-disable-next-line import/prefer-default-export
export function useCheckLogin() {
  const isLogin = useAppSelector((state) => state.user.isLogin);
  return isLogin;
}
