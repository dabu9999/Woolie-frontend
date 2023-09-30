import { userState } from '@src/store/recoil/atoms/useState';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const NotAuthRoutes = () => {
  const userInfo = useRecoilValue(userState);
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo.isAuth) {
      navigate('/home');
    }
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default NotAuthRoutes;
