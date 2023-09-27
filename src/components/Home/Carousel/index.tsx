import { useState, useRef, useEffect } from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

interface CarouselContent {
  image: string;
  title: string;
  detail: string;
}

interface CarouselProps {
  carouselContents: CarouselContent[];
  currIndex: number;
  setCurrIndex: React.Dispatch<React.SetStateAction<number>>;
}
// let touchStartX: number;
// let touchEndX: number;

const Carousel = ({ carouselContents, currIndex, setCurrIndex }: CarouselProps) => {
  const [currList, setCurrList] = useState<CarouselContent[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const carouselRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (carouselContents.length !== 0) {
      setCurrList(carouselContents);
    }
  }, [carouselContents]);

  useEffect(() => {
    if (carouselRef.current !== null) {
      carouselRef.current.style.transform = `translateX(-${currIndex}00%)`;
    }
  }, [currIndex]);

  const handleSwipe = (direction: number) => {
    const newIndex = currIndex + direction;
    if (newIndex < 0 || newIndex >= currList.length) {
      return;
    }
    if (isAnimating) {
      return;
    }
    setIsAnimating(true);

    setCurrIndex((prev) => prev + direction);
    if (carouselRef.current !== null) {
      carouselRef.current.style.transition = 'all 0.7s ease-in-out';
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  const onHandleMouseDown = (e: React.MouseEvent) => {
    console.log(e);
  };

  return (
    <div className="w-full">
      <div className="relative w-full overflow-hidden rounded-t-lg" onMouseDown={onHandleMouseDown}>
        <FaChevronCircleLeft
          size={40}
          color="#000000"
          opacity={0.5}
          className="absolute top-[45%] rounded-full z-10 px-[8px] py-[6px] left-1 hover:cursor-pointer hover:opacity-70"
          onClick={() => handleSwipe(-1)}
        />
        <FaChevronCircleRight
          size={40}
          color="#000000"
          opacity={0.5}
          className="absolute top-[45%] rounded-full z-10 px-[8px] py-[6px] right-1 hover:cursor-pointer hover:opacity-70"
          onClick={() => handleSwipe(1)}
        />
        <ul className="flex h-full w-full relative" ref={carouselRef}>
          {currList?.map((item, idx) => {
            const key = `${item.title}-${idx}`;
            return (
              <li
                key={key}
                className="relative flex flex-none items-center justify-center overflow-hidden object-contain"
              >
                <img src={item.image} alt="이미지" className=" select-none" />
                <div className="absolute left-0 bottom-0 p-4 bg-black/30 rounded-b-md w-full">
                  <div>
                    <h3 className="text-[#FDFDFD] text-[20px] font-bold mb-1">{item.title}</h3>
                    <p className="text-[#FDFDFD] text-[13px]">{item.detail}</p>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-black/50 rounded-2xl text-[#E6E6E6] text-[12px] py-1 px-2">
                      {idx + 1 + ' / ' + carouselContents.length}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
