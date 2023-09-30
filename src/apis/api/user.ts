import { defaultInstance } from '../axios';

const userKakaoLogin = async (code: string) => {
  try {
    const response = await defaultInstance.post('/users/kakao', { code });
    const data = response.data;
    console.log(data);
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
};

export { userKakaoLogin };
