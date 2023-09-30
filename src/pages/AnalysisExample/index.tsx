import { FaTimes } from 'react-icons/fa';
import Carousel from '../../components/Carousel';
import { Link } from 'react-router-dom';
import image1 from '@public/analysisExample/눈 사이 길이.png';
import image2 from '@public/analysisExample/눈 세로 길이.png';
import image3 from '@public/analysisExample/대칭 비율.png';
import image4 from '@public/analysisExample/미간 비율.png';
import image5 from '@public/analysisExample/세로 비율.png';
import image6 from '@public/analysisExample/얼굴형.png';
import image7 from '@public/analysisExample/코 가로 길이.png';
import image8 from '@public/analysisExample/턱 비율.png';
import image9 from '@public/analysisExample/하안부 비율.png';

const AnalysisExample = () => {
  const exampleDataTitle = [image1, image2, image3, image4, image5, image6, image7, image8, image9];
  return (
    <div className="flex flex-col font-light text-[13px] px-6 mt-14">
      <button className="ml-auto mb-10">
        <Link to="/imageupload">
          <FaTimes size={24} />
        </Link>
      </button>
      <div className="mb-4">
        <h1 className="text-[20px] font-bold mb-2">얼굴 분석 결과 안내</h1>
        <p>얼굴 이미지 업로드 시 나오는 분석 결과입니다.</p>
      </div>
      <div className="bg-[#F5F5F5] rounded-md p-4 mb-4">
        <h3 className="font-medium">분석 항목</h3>
        <p>
          <span className="font-medium"> · 얼굴형</span>:계란형,마름모형,역삼각형,하트형,육각형,사각형
        </p>
        <p>
          <span className="font-medium"> · 얼굴 특징</span>:상/중/하안부 비율, 가로/세로 비율, 대칭 비율
        </p>
        <p>
          <span className="font-medium"> · 중안부 특징</span>:미간 비율,눈 세로 길이, 눈 사이 길이, 코 가로 길이
        </p>
        <p>
          <span className="font-medium"> · 하안부 특징</span>:인중/입/턱 비율
        </p>
      </div>
      <div>
        <h3 className="text-[16px] font-bold mb-2">예시</h3>
        <div>
          <Carousel carouselList={exampleDataTitle} />
        </div>
      </div>
    </div>
  );
};

export default AnalysisExample;
