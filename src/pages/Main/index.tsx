// import React from 'react';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../../components/Carousel';

const Main = () => {
  const [carouselList, setCarouselList] = useState<string[]>([]);
  useEffect(() => {
    setCarouselList(['./start1.png', './start2.png', './start3.png']);
  }, []);
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
  const onHandleLogin = () => {
    window.location.href = kakaoURL;
  };
  return (
    <div className="w-full bg-white flex flex-col justify-center items-center font-light">
      <div className="w-full relative">
        <div className="flex justify-center items-center">
          <Carousel carouselList={carouselList} />
        </div>
        <div className="flex flex-col justify-center items-center absolute bottom-10 left-[50%] -translate-x-1/2 rounded-md w-full">
          <button
            className="flex justify-center items-center w-[312px] h-[48px] bg-kakao rounded-md mb-4 font-medium"
            onClick={onHandleLogin}
          >
            <img src="./kakao_mark.png" alt="카카오" />
            카카오로 시작하기
          </button>
          <Link to="/main" className="text-[13px]">
            서비스 둘러보기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
