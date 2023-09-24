/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import AnalysisResultItem from '../AnalysisResultItem';

const AnalysisResultList = ({ analysisData }: any) => {
  const [isClicked, setIsClicked] = useState(null);
  const [clickedData, setClickedData] = useState(null);
  useEffect(() => {
    setIsClicked(analysisData[0].item_title);
    setClickedData(analysisData[0]);
  }, [analysisData]);
  useEffect(() => {
    const resultData = analysisData.find((item: any) => item.item_title === isClicked);
    setClickedData(resultData);
  }, [isClicked]);
  return (
    <div>
      <div className="overflow-x-auto whitespace-nowrap ">
        {analysisData.map((item: any, idx: number) => (
          <button
            key={idx}
            className={`p-2 text-[14px] my-2 mr-2 rounded-2xl ${
              isClicked === item.item_title ? 'bg-[#333333] text-[#FDFDFD]' : 'bg-[#F5F5F5] text-[#999999] '
            }`}
            onClick={() => setIsClicked(item.item_title)}
          >
            {item.item_title}
          </button>
        ))}
      </div>
      <div>
        {/* {analysisData.map((item: any) => (
          <AnalysisResultItem analysisResult={item} />
        ))} */}
        {<AnalysisResultItem analysisResult={clickedData} />}
      </div>
    </div>
  );
};

export default AnalysisResultList;
