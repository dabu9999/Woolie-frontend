const KakaoBtn = () => {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
  const onHandleLogin = () => {
    window.location.href = kakaoURL;
  };
  return (
    <div>
      <button
        className="flex justify-center items-center w-[312px] h-[48px] bg-kakao rounded-md mb-4 font-medium"
        onClick={onHandleLogin}
      >
        <img src="./kakao_mark.png" alt="카카오" />
        카카오로 시작하기
      </button>
    </div>
  );
};

export default KakaoBtn;
