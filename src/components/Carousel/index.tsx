import { useState, useRef, useEffect } from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import PageIndicator from '../PageIndicator';

interface CarouselProps {
  carouselList: string[];
}

const Carousel = ({ carouselList }: CarouselProps) => {
  const [currIndex, setCurrIndex] = useState<number>(0);
  const [currList, setCurrList] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const carouselRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (carouselList.length !== 0) {
      setCurrList(carouselList);
    }
  }, [carouselList]);

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
  return (
    <div>
      <div className="relative w-full overflow-hidden rounded-t-lg">
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
        <ul className="flex h-full relative" ref={carouselRef}>
          {currList?.map((image, idx) => {
            const key = `${image}-${idx}`;
            return (
              <li
                key={key}
                className="flex flex-none items-center justify-center w-full overflow-hidden object-contain select-none"
              >
                <img src={image} alt="carousel-img" className="h-full w-full flex-shrink-0 object-contain" />
              </li>
            );
          })}
        </ul>
      </div>
      {currList && <PageIndicator total={currList.length} currIndex={currIndex} setCurrIndex={setCurrIndex} />}
    </div>
  );
};

export default Carousel;
