import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Web3Modal from 'web3modal';
import List from '../../components/List';

function Project({ nftsData, projectData }) {
  const [projectNFTs, setProjectNFTs] = useState(nftsData);
  const [project, setProject] = useState(projectData);
  const [loadingState, setLoadingState] = useState('not-loaded');
  const [showProjNFTs, setShowProjNFTs] = useState(true);

  // useEffect(() => {
  //   loadNfts();
  // }, []);

  // async function loadNfts() {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/nft/boredapesyachtclub`);
  //   const arr = await res.json();

  //   console.log(arr)
  //   setProjectNFTs(arr);
  //   setLoadingState('loaded');
  // }

  if (
    loadingState === 'loaded' &&
    !projectNFTs &&
    Object.keys(projectNFTs).length === 0
  )
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;

  return (
    <div className="flex flex-col justify-center mx-default">
      <div name="upper-project" className="flex flex-row">
        <div name="upper-left-project-image" className="my-4 mr-4 basis-5/12">
          <div className="grid gap-4 place-content-center border shadow rounded-xl overflow-hidden max-w-xl">
            <img
              className="object-fill aspect-[13/9] "
              src={project.coverImage}
            />
          </div>
        </div>
        <div
          name="upper-right-project-info"
          className="flex flex-col basis-7/12"
        >
          <section
            name="right-panel-upper-header"
            className="overflow-hidden p-2 pl-5"
          >
            <div className="grid gap-4 font-bold text-4xl pt-3">
              {project.name}
            </div>
            <div className="grid gap-4 text-l pt-3">{project.projectInfo}</div>
            <div className="pt-20">
              <div className="flex flex-row">
                <div className="basis-4/12 font-bold">{project.nftsNum}</div>
                <div className="basis-4/12 font-bold">
                  {project.totalTransactions}
                </div>
                <div className="basis-4/12 font-bold">
                  {project.totalValue} ETH
                </div>
              </div>
              <div className="flex flex-row">
                <div className="basis-4/12 text-fontBG">Items</div>
                <div className="basis-4/12 text-fontBG">Transactions</div>
                <div className="basis-4/12 text-fontBG">Project Volume</div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div name="lower-nfts" className="flex flex-row py-4">
        <div
          name="lower-right-nfts-grid"
          className="border shadow rounded-xl overflow-hidden content-center"
        >
          <div className="flex flex-row p-3 font-bold bg-textPink w-full text-white">
            <p className="basis-1/3"></p>
            <div className="flex flex-row justify-center basis-1/3">
              <p className="justify-self-center text-xl">
                Auction Information
              </p>
            </div>
            <div className="flex flex-row justify-end basis-1/3">
              <p className="text-m self-center">
                showing {nftsData.length} of {nftsData.length}
              </p>
            </div>
          </div>
          {showProjNFTs && (
            <div className="grid grid-cols-4 gap-4 p-4 bg-bgPageDefault">
              {nftsData.map((nft, i) => (
                <Link href={{ pathname: `/nfts/${nft.address}` }} key={i}>
                  <div
                    key={i}
                    className=" shadow rounded-xl overflow-hidden object-contain bg-bgSubsection"
                  >
                    <img
                      src={nft.imageLink}
                      className="object-cover mx-auto hover:scale-110 rounded-xl"
                    />
                    <div className="p-4">
                      <p
                        style={{ height: '32px' }}
                        className="text-2xl font-semibold"
                      >
                        {nft.nftName}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // Fetch data from external API
  const projectURL = ctx.query.project;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/nft/project/${projectURL}`);
  const nftsData = await res.json();

  const projectRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/project/${projectURL}`
  );
  const projectData = await projectRes.json();

  // Pass data to the page via props
  return { props: { nftsData, projectData } };
}

export default Project;
