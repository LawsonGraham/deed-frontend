import { useState } from 'react';
import ProgressBar from './ProgressBar';
import Link from 'next/link';
const Carousel = (props) => {
  const [currentIndex, setCurrentIndex] = useState(3);
  const [activeProjects, setActiveProjects] = useState(
    props.projects.slice(0, 3)
  );
  const [start, setStart] = useState(0);

  const projects = props.projects;

  const movePrev = () => {
    console.log(start + ' ' + currentIndex);
    let p;
    if (start - 1 < 0) {
      p = activeProjects.slice(0, 2);
      p.unshift(projects[projects.length - 1]);
      setStart(projects.length - 2);
      setCurrentIndex(currentIndex - 1);
    } else {
      p = activeProjects.slice(0, 2);
      p.unshift(projects[start]);
      console.log(p);
      if (currentIndex - 1 < 0) {
        setCurrentIndex(projects.length - 2);
      } else {
        setStart(start - 1);
      }
      setCurrentIndex((prevState) => prevState - 1);
    }
    setActiveProjects(p);
    console.log(currentIndex);
  };

  const moveNext = () => {
    let p;
    if (currentIndex + 1 > projects.length) {
      p = activeProjects.slice(1, 3);
      p.push(projects[0]);
      setStart(start + 1);
      setCurrentIndex(1);
    } else {
      p = activeProjects.slice(1, 3);
      p.push(projects[currentIndex]);
      console.log(p);
      if (start + 1 > projects.length + 1) {
        setStart(0);
      } else {
        setStart(start + 1);
      }
      setCurrentIndex((prevState) => prevState + 1);
    }
    setActiveProjects(p);
    console.log(currentIndex);
  };

  return (
    <div className="flex flex-row pt-6 mt-10">
      <div className="flex flex-col justify-center">
        <svg
          onClick={movePrev}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#E93F8E"
          className="w-12 h-12 hover:scale-[105%]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 basis-[99%] px-4">
        {activeProjects.map((project, i) => (
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
      <div className="flex flex-col justify-center">
        <svg
          onClick={moveNext}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#E93F8E"
          className="w-12 h-12 hover:scale-[105%]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Carousel;
