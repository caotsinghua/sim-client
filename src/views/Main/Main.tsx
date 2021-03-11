import React from 'react';
import { useAppSelector } from '../../store';

const Main: React.FC = () => {
  const userInfo = useAppSelector((state) => state.user.userInfo);
  return (
    <div>
      <h1>登陆成功</h1>
      <p>{userInfo}</p>
    </div>
  );
};
export default Main;
