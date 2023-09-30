import { useEffect } from 'react';
import { userState } from '@src/store/recoil/atoms/useState';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const AuthRoutes = () => {
  const userInfo = useRecoilValue(userState);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.isAuth) {
      navigate('/login');
    }
  }, [userInfo, navigate]);
  return <div>AuthRoutes</div>;
};

export default AuthRoutes;
