import { Link } from 'react-router-dom';
import Button from '../../components/Home/Button';
import Carousel from '../../components/Home/Carousel';
import { useEffect, useState } from 'react';
import image1 from '@public/home/home1.png';
import image2 from '@public/home/home2.png';
import image3 from '@public/home/home3.png';

const HomePage = () => {
  const [currIndex, setCurrIndex] = useState<number>(0);
  const [startColor, setStartColor] = useState<string>('#3B3B40');
  const [endColor, setEndColor] = useState<string>('#667173');
  const buttonContent1 = '얼굴 분석하기';
  const buttonContent2 = '채팅 리스트 보기';
  const colors = [
    { start: '#3B3B40', end: '#667173' },
    { start: '#735C48', end: '#D9CEC1' },
    { start: '#0B1C26', end: '#590222' },
  ];

  const carouselContents = [
    { image: image1, title: '입술 크기가 작은 유형', detail: '입술 작은 유형에게 추천하는 립 메이크업' },
    { image: image2, title: '입술 크기가 중간이 유형', detail: '입술 중간 유형에게 추천하는 립 메이크업' },
    { image: image3, title: '입술 크기가 큰 유형', detail: '입술 큰 유형에게 추천하는 립 메이크업' },
  ];
  useEffect(() => {
    const startColor = colors[currIndex]?.start;
    const endColor = colors[currIndex]?.end;

    if (startColor && endColor) {
      setStartColor(startColor);
      setEndColor(endColor);
    }
  }, [currIndex]);
  return (
    <div className="font-light">
      <div
        className={`relative w-[360px] h-[360px] pt-14 px-6`}
        style={{
          background: `linear-gradient(to bottom, ${startColor}, ${endColor})`,
          transition: `all 2s ease-in-out`,
        }}
      >
        <div className="flex justify-between ">
          <div className="w-[96px] h-[16px]">
            <img src="./logo2.png" alt="로고" />
          </div>
          <div>
            <button className="font-medium text-[#FDFDFD] text-[13px]">
              <Link to="/login">로그인</Link>
            </button>
          </div>
        </div>
        <div className="mt-6">
          <Carousel carouselContents={carouselContents} currIndex={currIndex} setCurrIndex={setCurrIndex} />
        </div>
      </div>
      <div className="px-6 mt-20 mb-[111px]">
        <p className="text-[#666666] text-[14px] mb-1">나는 어떤 입술 유형일까요?</p>
        <Button buttonContent={buttonContent1} color="primary" path="/imageupload" />
      </div>
      <div className="px-6">
        <div className="mb-4">
          <h3 className="text-[20px] font-bold mb-1">채팅</h3>
          <p className="text-[13px] text-[#999999]">
            얼굴 분석을 이용하신 후, 채팅방에서 뷰티 정보를 공유하고 소통할 수 있어요.
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-[14px] pb-1">어떻게 사람들과 채팅하는지 궁금해요</p>
          <Button buttonContent={buttonContent2} color="primary" path="/home" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
