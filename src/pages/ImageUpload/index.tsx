import { BiSolidHelpCircle } from 'react-icons/bi';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import { CiImageOn } from 'react-icons/ci';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { useState, useRef } from 'react';
import { detectFace, detectFaces, extractFace, readFileAsync } from '../../utils/woolieAI/image';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';

const ImageUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const modalTitle = '얼굴 분석 이미지 업로드';
  const modalButtonContent = '카카오로 로그인하기';
  const modalPath = '/login';

  const onHandleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = await readFileAsync(file);
      const isSuccessfulDetectFaces = await detectFaces(imageUrl);
      if (isSuccessfulDetectFaces) {
        const landmarksBefore = await detectFace(imageUrl);

        const croppedImageUrl = await extractFace(imageUrl, landmarksBefore);

        const landmarks = await detectFace(croppedImageUrl);
        localStorage.setItem('landmarks', JSON.stringify(landmarks));

        localStorage.setItem('croppedImageUrl', croppedImageUrl);
        navigate('/analysisresult');
      }
    }
  };
  const onClickShowExampleBtn = () => {
    navigate('/analysisexample');
  };
  const onClickImageUploadBtn = () => {
    if (!isAuth) {
      setIsClicked(true);
    }
  };
  return (
    <div className="w-[360px]">
      <div className="flex flex-col mx-6 font-light">
        <button className="mb-10" onClick={() => setIsAuth((prev) => !prev)}>
          <AiOutlineLeft size={24} />
        </button>
        <div className="mb-4">
          <h3 className="text-[20px] font-bold mb-2">얼굴 분석할 이미지를 업로드해주세요</h3>
          <p className="text-[13px] text-semi-black">얼굴 윤곽이 드러난 정면 사진을 제공해주세요.</p>
        </div>
        <div className="mb-10">
          <div className="flex justify-around">
            <div className="flex flex-col items-center">
              <div className="w-[120px] h-[180px] bg-slate-300 mb-1"></div>
              <div className="text-[#026600] text-[13px] flex items-center">
                가능
                <BsCheckLg size={12} />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-[120px] h-[180px] bg-slate-300 mb-1"></div>
              <div className="text-[#A71B1B] text-[13px] flex items-center">
                불가능
                <BsXLg size={12} />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex flex-col items-center h-[176px] border-dashed border-[#CCCCCC] border-2 rounded-md mb-1">
            <CiImageOn size={48} className="mt-8 mb-4 text-primary" />
            <form>
              <label
                htmlFor="file"
                className="bg-primary text-[#E6E6E6] py-3 px-4 rounded-md cursor-pointer"
                onClick={onClickImageUploadBtn}
              >
                이미지 업로드
              </label>
              {isAuth && (
                <input
                  id="file"
                  type="file"
                  accept="image/jpg, image/jpeg, image/png"
                  ref={fileInputRef}
                  onChange={onHandleUploadFile}
                  className="w-0 h-0"
                />
              )}
            </form>
          </div>
          <p className="text-[13px] text-center text-[#666666]">
            2mb 이하의 이미지만 업로드 가능합니다.
            <br />
            (리사이징하는 경우 4mb 이하 가능)
          </p>
        </div>
        <div className="flex items-center text-semi-black pb-6 border-b-2">
          <BiSolidHelpCircle size={16} />
          <span className="text-[13px] mx-2">얼굴 분석 기능은 로그인 후 사용 가능합니다.</span>
        </div>
        <div className="flex flex-col mt-5">
          <p className="text-[13px] text-semi-black mb-1">분석 결과가 어떻게 나오는지 궁금하시다면?</p>
          <button
            className="flex items-center justify-between border py-[9.5px] text-basic-black rounded-md text-left px-2 font-bold"
            onClick={onClickShowExampleBtn}
          >
            얼굴 분석 결과 예시 보기
            <AiOutlineRight />
          </button>
        </div>
      </div>
      {
        <Modal
          visible={isClicked}
          modalTitle={modalTitle}
          modalButtonContent={modalButtonContent}
          modalPath={modalPath}
          type="imageUpload"
        />
      }
    </div>
  );
};

export default ImageUpload;
