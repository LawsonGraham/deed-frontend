import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Web3Modal from 'web3modal';
import { marketplaceAddress } from '../config';

function Home({ data }) {
  const [projects, setProjects] = useState(data);
  const [loadingState, setLoadingState] = useState('not-loaded');
  // useEffect(() => {
  //   loadProjects();
  // }, []);

  // async function loadProjects() {
  //   const res = await fetch('http://localhost:4000/v1/project/');

  //   const projects = await res.json();

  //   setProjects(projects);
  //   setLoadingState('loaded');
  // }

  if (loadingState === 'loaded' && !projects.length)
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;

  return (
    <div className="flex flex-col justify-center">
      <div name="upper-landing" className="bg-landingBackground mx-full py-24">
        <div className="flex flex-row pt-28 pb-28 pr-4 pl-4">
          <div className="grid place-items-center basis-8/12">
            <div
              name="upper-landing-left"
              className="flex flex-col justify-center"
            >
              <h1 className="text-7xl font-bold text-textPink">
                Welcome to Deed.
              </h1>
              <p className="text-xl font-bold pt-4 pl-4">
                Democratizing cannabis industry engagement.
              </p>
              <p className="text-xl font-bold pl-4">
                Powered by the Blockchain.
              </p>
            </div>
          </div>

          <div name="upper-landing-right" className="basis-6/12 object-contain">
            <img src="https://uxwing.com/wp-content/themes/uxwing/download/12-peoples-avatars/community-man.png" />
          </div>
        </div>
      </div>

      <div
        name="lower-projects-section"
        className="px-4  mx-default"
        style={{ maxWidth: '1600px' }}
      >
        <div className="text-3xl font-bold text-center m-4 pt-6">
          Explore Projects
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {projects.map((project, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img src={project.coverImage} className="object-fill max-h-[187px] min-w-[280px]"/>
              <div className="p-4">
                <p
                  style={{ height: '32px' }}
                  className="text-2xl font-semibold"
                >
                  {project.name}
                </p>
                <p style={{ height: '32px' }} className="text-xl">
                  {project.id}
                </p>
              </div>
              <div className="px-4 pb-2 pt-1 bg-black">
                <Link href={`/projects/${project.url}`}>
                  <a className="grid place-items-center mt-4 w-full bg-textPink text-white font-bold py-2 px-12 rounded">
                    See Project
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:4000/v1/project/`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Home;
