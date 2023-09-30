/* eslint-disable @typescript-eslint/no-explicit-any */
import { userState } from '@src/store/recoil/atoms/useState';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { userKakaoLogin } from '@src/apis/api/user';

const LoginHandlerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setUserState = useSetRecoilState(userState);

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');

  // const apiPost = async (code: string) => userKakaoLogin(code);

  useEffect(() => {
    if (!code) {
      return;
    }
    // apiPost(code);
    try {
      axios.post('http://localhost:7070/users/kakao', { code }).then((response) => {
        if (response.status === 200) {
          const data = JSON.stringify(response.data);
          localStorage.setItem('user', data);
          setUserState((prevState) => ({
            ...prevState,
            userData: {
              ...prevState.userData,
            },
            isAuth: true,
          }));
          navigate('/home');
        }
      });
    } catch (error) {
      console.error(error);
      navigate('/login');
    }
  }, []);

  return <div>로그인 중...</div>;
};

export default LoginHandlerPage;
