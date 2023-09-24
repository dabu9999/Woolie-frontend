/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
// import AnalysisResultItem from '../../components/AnalysisResultItem';
import { face_lower_analysis } from '../../utils/woolieAI/faceBottomFeatures';
import { face_sym_analysis, face_uml_analysis, face_wh_analysis } from '../../utils/woolieAI/faceFeatures';
import {
  face_eh_analysis,
  face_ete_analysis,
  face_mig_analysis,
  face_nose_analysis,
} from '../../utils/woolieAI/faceMiddleFeatures';
import { face_type_analysis } from '../../utils/woolieAI/faceType';
import AnalysisResultList from '../../components/AnalysisResult/AnalysisResultList';

const AnalysisResult = () => {
  const [clickedMenu, setClickedMenu] = useState<string>('');
  const [analysisDatas, setAnalysisDatas] = useState<any>([]);
  const [selectedDatas, setSelectedDatas] = useState([]);

  const menuTypeData = [
    { type: '얼굴형', typeDetail: '' },
    { type: '얼굴 특징', typeDetail: ['상/중/하안부 비율', '가로/세로 비율', '대칭 비율'] },
    { type: '중안부 특징', typeDetail: ['미간 비율', '눈 세로 길이', '눈 사이 길이', '코 가로 길이'] },
    { type: '하안부 특징', typeDetail: '' },
  ];
  useEffect(() => {
    // 비동기 함수 호출
    async function analyzeFace() {
      try {
        const imageUrl = localStorage.getItem('croppedImageUrl');
        const landmarksBefore = localStorage.getItem('landmarks');

        if (!landmarksBefore) {
          return;
        }

        const landmarks = JSON.parse(landmarksBefore);
        Promise.all([
          face_type_analysis(imageUrl, landmarks),
          face_lower_analysis(imageUrl, landmarks),
          face_sym_analysis(imageUrl, landmarks),
          face_wh_analysis(imageUrl, landmarks),
          face_mig_analysis(imageUrl, landmarks),
          face_eh_analysis(imageUrl, landmarks),
          face_ete_analysis(imageUrl, landmarks),
          face_nose_analysis(imageUrl, landmarks),
          face_uml_analysis(imageUrl, landmarks),
        ]).then((values) => {
          setAnalysisDatas(values);
          setSelectedDatas(values[0]);
          setClickedMenu(values[0].type);
        });
      } catch (error) {
        console.error('분석 오류:', error);
      }
    }

    analyzeFace();
  }, []);

  useEffect(() => {
    if (analysisDatas) {
      const filteredDatas = analysisDatas.filter((data: any) => data.type === clickedMenu);
      setSelectedDatas(filteredDatas);
    }
  }, [clickedMenu]);

  const onClickList = (menu_title: string) => {
    setClickedMenu(menu_title);
  };
  return (
    <div className="px-6 select-none">
      <div className="mb-4">
        <h3 className="text-[20px] font-bold mb-2">{'user'}님 얼굴 분석 결과입니다.</h3>
        <p className="text-[13px]">얼굴 비례 분석은 정확한 분석을 위해 데이터와 통게를 활용 해 결과를 제공합니다.</p>
      </div>
      <div>
        <ul className="flex justify-between text-[14px] text-[#999999] border-b-2 select-none hover:cursor-pointer">
          {menuTypeData.map((value, idx) => (
            <li
              key={idx}
              className={`p-2 hover:border-b-2 border-[#333333] ${
                clickedMenu === value.type ? 'font-bold border-b-2 text-[#333333]' : ''
              }`}
              onClick={() => onClickList(value.type)}
            >
              {value.type}
            </li>
          ))}
        </ul>
      </div>
      {/* {analysisDatas
        .filter((data: any) => data.type === clickedMenu)
        .map((data: any, idx: number) => (
          <div key={idx}>
            <AnalysisResultItem analysisResult={data} />
          </div>
        ))} */}
      {selectedDatas.length > 0 && <AnalysisResultList analysisData={selectedDatas} />}
    </div>
  );
};

export default AnalysisResult;
