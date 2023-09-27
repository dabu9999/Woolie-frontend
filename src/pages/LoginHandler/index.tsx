/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginHandlerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');

  useEffect(() => {
    try {
      axios.post('http://localhost:7070/users/kakao', { code }).then((response) => {
        if (response.status === 200) {
          const data = JSON.stringify(response.data);
          localStorage.setItem('user', data);
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
