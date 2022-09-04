import { useState, useRef, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import Link from 'next/link';
const Carousel = (props) => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const projects = props.projects;

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className="carousel my-12 mx-auto">
      <div className="relative overflow-hidden">
        <div className="flex justify-between absolute top left w-full h-full">
          <button
            onClick={movePrev}
            className="text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled('prev')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Prev</span>
          </button>
          <button
            onClick={moveNext}
            className="text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled('next')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className="carousel-container relative flex gap-4 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0 object-fill"
        >
          {projects.map((project, index) => {
            return (
              <div
                key={index}
                className="carousel-item text-center relative w-64 h-64 snap-start"
              >
                <a
                  href={project}
                  className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
                  style={{
                    backgroundImage: `url(${project.coverImage || ''})`,
                  }}
                >
                  <img
                    src={project.coverImage || ''}
                    alt={project}
                    className="w-full aspect-square hidden"
                  />
                </a>
                <a
                  href={project}
                  className="h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 z-10"
                >
                  <h3 className="text-white py-6 px-3 mx-auto text-xl">
                    {project.name}
                  </h3>
                </a>
              </div>
            );
          })}
          {projects.map((project, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img
                src={project.coverImage}
                className="rounded object-fill aspect-[14/9]"
              />
              <div className="px-4 py-3 bg-gray-100">
                <p className="text-2xl font-bold text-black text-center">
                  {project.name}
                </p>
                <ProgressBar
                  raiseGoal={project.raiseGoal}
                  raiseCurrent={project.raiseCurrent}
                  color="red"
                />
                <div className="flex flex-row">
                  <p className="text-sm font-bold text-black pt-2 basis-5/12">
                    End Date:
                  </p>
                  <p className="text-sm font-bold text-black pt-2 basis-7/12">
                    {project.endDate}
                  </p>
                </div>
                <Link href={{ pathname: `/project/${project.url}` }} key={i}>
                  <pinkButton className="mt-4 w-full rounded">
                    View This Project
                  </pinkButton>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
