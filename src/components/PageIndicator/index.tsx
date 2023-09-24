// import React from 'react'

interface PageIndicatorProps {
  total: number;
  currIndex: number;
  setCurrIndex: (index: number) => void;
}

const PageIndicator = ({ total, currIndex, setCurrIndex }: PageIndicatorProps) => {
  return (
    <div className="flex justify-center my-2">
      {Array(total)
        .fill(0)
        .map((_, idx) => {
          return (
            <div
              key={idx}
              className={`w-3 h-3 mx-2 rounded-full cursor-pointer ${idx === currIndex ? 'bg-primary' : 'bg-gray-300'}`}
              onClick={() => setCurrIndex(idx)}
            ></div>
          );
        })}
    </div>
  );
};

export default PageIndicator;
