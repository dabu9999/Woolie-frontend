import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface ModalProps {
  visible: boolean;
  modalTitle: string;
  modalButtonContent: string;
  modalPath: string;
  type: string;
}

const Modal = ({ visible = false, modalTitle, modalButtonContent, modalPath, type }: ModalProps) => {
  const [mainContent, setMainContent] = useState(<div></div>);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    makeMainContent();
  }, []);
  useEffect(() => {
    if (visible) {
      showModal();
    }
  }, [visible]);

  const showModal = () => {
    dialogRef.current?.showModal(); // 모달창 노출. show() 호출하면 다이얼로그 노출
  };

  const makeMainContent = () => {
    if (type === 'login') {
      setMainContent(
        <div className="text-[14px] tracking-tighter">
          <p>회원가입이 완료되었습니다.</p>
          <p>
            얼굴 분석으로 <span className="text-primary">사용자</span>님께 맞는 정보를 제공할께요!
          </p>
        </div>,
      );
    } else if (type === 'imageUpload') {
      setMainContent(
        <div className="text-[14px] tracking-tighter my-2">
          <p className="">얼굴 분석 기능은 로그인 이후에 사용 가능합니다.</p>
        </div>,
      );
    }
  };

  // Modal 닫기 함수
  // const closeModal = () => {
  //   dialogRef.current?.close(); // 모달창 닫기
  // };
  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-black backdrop:opacity-60 fixed inset-0 flex justify-center items-center"
    >
      <div className={`flex flex-col fixed bg-white rounded-md font-light pt-4 px-4 ${visible ? 'block' : 'hidden'}`}>
        <div>
          {modalTitle && (
            <div className="border-b-[1px]">
              <h3 className="font-bold mb-2">{modalTitle}</h3>
            </div>
          )}
          {mainContent}
        </div>
        <div className="flex justify-center items-center my-4">
          <button className="bg-primary text-[#E6E6E6] rounded-md text-[16px] w-full px-3 py-4">
            <Link to={modalPath}>{modalButtonContent}</Link>
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
