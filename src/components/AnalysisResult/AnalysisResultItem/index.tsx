/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnalysisResultItem = ({ analysisResult }: any) => {
  return (
    <div className="border rounded-md p-4 mb-4 shadow-md">
      <div className="mb-4">
        <h3 className="font-bold">{analysisResult?.item_title}</h3>
        {analysisResult?.item_title_detail && (
          <p className="text-[13px] text-[#333333]">{analysisResult.item_title_detail}</p>
        )}
      </div>
      <div className="flex mb-4">
        <div className="flex justify-center items-center w-[148px] h-[198px] rounded-md bg-black mr-4">
          <img className="" src={analysisResult?.canvasImageUrl} />
        </div>
        <div className="flex flex-col text-[13px] w-[116px]">
          {analysisResult?.rate_type1_data?.map((item: any, idx: number) => {
            return (
              <div className="mb-3" key={idx}>
                <div className="flex justify-between">
                  <span>{item.item} 비율:</span>
                  <span>{item.ratio}</span>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center mr-[1px]">
                    <div
                      className={`w-[38px] h-[16px]  rounded-l-md ${
                        item.type === 'l' ? 'bg-[#CCCCCC]' : 'bg-[#E6E6E6]'
                      }`}
                    ></div>
                    <div>짧음</div>
                  </div>
                  <div className="flex flex-col items-center mr-[1px]">
                    <div className={`w-[38px] h-[16px] ${item.type === 'm' ? 'bg-[#CCCCCC]' : 'bg-[#E6E6E6]'}`}></div>
                    <div>균형</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-[38px] h-[16px] rounded-r-md ${
                        item.type === 'h' ? 'bg-[#CCCCCC]' : 'bg-[#E6E6E6]'
                      }`}
                    ></div>
                    <div>긺</div>
                  </div>
                </div>
              </div>
            );
          })}
          {analysisResult?.rate_type2_data?.map((item: any, idx: number) => {
            return (
              <div className="flex flex-col mb-3" key={idx}>
                <div className="flex justify-between mb-1">
                  <span>{item.item}:</span>
                  <span>{item.ratio}</span>
                </div>
                {item.length && (
                  <div className="text-[12px] text-[#999999]">
                    <p>
                      <span>오른쪽 {item.length.item} 길이: </span>
                      <span>{item.length.right}</span>
                    </p>
                    <p>
                      <span>왼쪽 {item.length.item} 길이: </span>
                      <span>{item.length.left}</span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-[13px]">
        {analysisResult?.explain_data?.map((item: any, idx: number) => {
          return (
            <div key={idx}>
              {item.item === 'ratios' ? (
                item.item === 'example' ? (
                  <p>{item.content}</p>
                ) : (
                  <p className="font-bold">{item.content}</p>
                )
              ) : (
                <p>{item.content}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalysisResultItem;
