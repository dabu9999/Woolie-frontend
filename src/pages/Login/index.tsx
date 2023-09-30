import { FaTimes } from 'react-icons/fa';
import KakaoBtn from '../../components/KakaoBtn';

const LoginPage = () => {
  return (
    <div className="flex flex-col px-6 font-light">
      <div className="ml-auto mt-14">
        <FaTimes />
      </div>
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="select-none mb-6">
          <img src="/logo.png" className="w-[185px] h-[185px]" />
        </div>
        <div className="mb-6">
          <h3 className="text-[20px] font-bold">(캐치프레이즈), 울리</h3>
        </div>
        <div>
          <p className="text-[14px] text-[#666666]">서비스 대략적인 설명</p>
        </div>
      </div>
      <KakaoBtn />
    </div>
  );
};

export default LoginPage;
