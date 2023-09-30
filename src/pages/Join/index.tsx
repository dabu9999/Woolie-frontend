import { FaCheck, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from '../../components/Modal';
// import axiosInstance from '../../utils/axios';
import axios from 'axios';
// import React from 'react';

const JoinPage = () => {
  const [allChecked, setAllchecked] = useState<boolean>(false);
  const [serviceTerm, setServiceTerm] = useState<boolean>(false);
  const [privateTerm, setPrivateTerm] = useState<boolean>(false);
  const [ageTerm, setAgeTerm] = useState<boolean>(false);
  const [year, setYear] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [birthEnabled, setBirthEnabled] = useState<boolean>(false);
  const [signupEnabled, setSignupEnabled] = useState<boolean>(false);
  const [onDialog, setOnDialog] = useState<boolean>(false);
  const [birthErrorMessage, setBirthErrorMessage] = useState('');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const kakao_token = searchParams.get('code');

  const years = Array.from({ length: 100 }, (_, index) => String(new Date().getFullYear() - index));
  const months = Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, '0'));
  const days = Array.from({ length: 31 }, (_, index) => String(index + 1).padStart(2, '0'));

  const modalTitle = '';
  const modalButtonContent = '서비스 시작하기';
  const modalPath = '/';

  useEffect(() => {
    console.log(kakao_token);
  }, []);

  useEffect(() => {
    if (allChecked) {
      setServiceTerm(true);
      setPrivateTerm(true);
      setAgeTerm(true);
    }
  }, [allChecked]);

  useEffect(() => {
    if (serviceTerm && privateTerm && ageTerm) {
      setAllchecked(true);
    } else {
      setAllchecked(false);
    }
  }, [serviceTerm, privateTerm, ageTerm]);

  useEffect(() => {
    onHandleCheckAge();
  }, [year, month, day]);

  useEffect(() => {
    if (birthEnabled && allChecked) {
      setSignupEnabled(true);
    } else {
      setSignupEnabled(false);
    }
  }, [birthEnabled, allChecked]);

  const onClickHandleAll = () => {
    setAllchecked((prev) => !prev);
  };
  const onClickHandleServiceTerm = () => {
    setServiceTerm((prev) => !prev);
  };
  const onClickHandlePrivateTerm = () => {
    setPrivateTerm((prev) => !prev);
  };
  const onClickHandleAgeTerm = () => {
    setAgeTerm((prev) => !prev);
  };

  const onHandleCheckAge = () => {
    if (!year || !month || !day) {
      return;
    }
    const birthDate = new Date(`${year}-${month}-${day}`);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    const isUnder14 = age < 14;
    if (isUnder14) {
      setBirthEnabled(!isUnder14);
      setBirthErrorMessage('만 14세 미만은 서비스 가입이 불가합니다.');
    } else {
      setBirthEnabled(!isUnder14);
      setBirthErrorMessage('');
    }
  };

  const renderOptions = (options: string[]) => {
    return options.map((option: string) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  };

  const onHandleSignUpBtn = () => {
    if (signupEnabled) {
      onHandleSignUp();
    } else {
      return;
    }
  };

  const onHandleSignUp = async () => {
    const body = {
      kakao_token,
    };
    const response = await axios.post('http://localhost:8080/', body);
    console.log(response);
    if (response.status === 200) {
      setOnDialog(true);
    }
  };

  return (
    <div className="relative h-full px-6 py-14 font-light">
      <div className="flex flex-col">
        <button className="ml-auto mb-4">
          <FaTimes />
        </button>
        <div className="mb-8">
          <div className="mb-6">
            <h3 className="text-[20px] font-bold">
              서비스 가입을 위해 <br />
              아래 항목에 동의해주세요
            </h3>
          </div>
          <div>
            <div className="flex border-b-2 py-2">
              <button
                className={`flex justify-center items-center w-[20px] h-[20px] rounded-full mr-2 ${
                  allChecked ? 'bg-primary' : 'bg-slate-300'
                }`}
                onClick={onClickHandleAll}
                id="check_all"
              >
                <FaCheck size={10} color="white" />
              </button>
              <label htmlFor="check_all" className="text-[14px] font-medium">
                전체 동의하기
              </label>
            </div>
            <div className="text-[13px]">
              <div className="flex justify-between py-2">
                <div className="flex">
                  <button
                    className={`flex justify-center items-center w-[20px] h-[20px] rounded-full mr-2 ${
                      serviceTerm ? 'bg-primary' : 'bg-slate-300'
                    }`}
                    onClick={onClickHandleServiceTerm}
                  >
                    <FaCheck size={10} className="text-white" />
                  </button>
                  <label htmlFor="check_1">(필수) 서비스 이용약관 동의</label>
                </div>
                <button>보기</button>
              </div>
              <div className="flex justify-between py-2">
                <div className="flex">
                  <button
                    className={`flex justify-center items-center w-[20px] h-[20px] rounded-full mr-2 ${
                      privateTerm ? 'bg-primary' : 'bg-slate-300'
                    }`}
                    onClick={onClickHandlePrivateTerm}
                  >
                    <FaCheck size={10} className="text-white" />
                  </button>
                  <label htmlFor="check_1">(필수) 개인정보 처리방침</label>
                </div>
                <button className="underline-offset-1">보기</button>
              </div>
              <div className="flex py-2">
                <button
                  className={`flex justify-center items-center w-[20px] h-[20px] rounded-full mr-2 ${
                    ageTerm ? 'bg-primary' : 'bg-slate-300'
                  }`}
                  onClick={onClickHandleAgeTerm}
                >
                  <FaCheck size={10} className="text-white" />
                </button>
                <label htmlFor="check_1">(필수) 만 14세 이상입니다.</label>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-[180px]">
          <h3 className="text-[20px] font-bold mb-2">생년월일을 입력해주세요</h3>
          <p className="text-[13px] mb-4">만 14세 이상만 서비스 가입이 가능합니다.</p>
          <div className="flex justify-between">
            <select
              className="w-24 px-2 py-2 border rounded-md text-[12px]"
              placeholder="YYYY"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {renderOptions(years)}
            </select>
            <select
              className="w-24 px-2 py-2 border rounded-md text-[12px]"
              placeholder="MM"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              {renderOptions(months)}
            </select>
            <select
              className="w-24 px-2 py-2 border rounded-md text-[12px]"
              placeholder="DD"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              {renderOptions(days)}
            </select>
          </div>
          <span className=" text-warn-red text-[12px]">{birthErrorMessage}</span>
        </div>
        <button
          className={`w-[312px] h-[48px] py-3 rounded-md bg-primary text-[16px] text-basic-black font-medium ${
            signupEnabled ? 'opacity-100' : 'opacity-50'
          }`}
          onClick={onHandleSignUpBtn}
        >
          가입하기
        </button>
      </div>
      <Modal
        visible={onDialog}
        modalTitle={modalTitle}
        modalButtonContent={modalButtonContent}
        modalPath={modalPath}
        type="login"
      />
    </div>
  );
};

export default JoinPage;
