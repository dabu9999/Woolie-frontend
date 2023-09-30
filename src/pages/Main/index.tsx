// import React from 'react';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../../components/Carousel';
import KakaoBtn from '../../components/KakaoBtn';

const Main = () => {
  const [carouselList, setCarouselList] = useState<string[]>([]);
  useEffect(() => {
    setCarouselList(['./start1.png', './start2.png', './start3.png']);
  }, []);

  return (
    <div className="w-full bg-white flex flex-col justify-center items-center font-light">
      <div className="w-full relative">
        <div className="flex justify-center items-center">
          <Carousel carouselList={carouselList} />
        </div>
        <div className="flex flex-col justify-center items-center absolute bottom-10 left-[50%] -translate-x-1/2 rounded-md w-full">
          <KakaoBtn />
          <Link to="/main" className="text-[13px]">
            서비스 둘러보기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
