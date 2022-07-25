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
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {projects.map((project, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img src={project.coverImage} />
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
              <div className="p-4 bg-black">
                <Link href={`/projects/${project.url}`}>
                  <a className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded">
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
