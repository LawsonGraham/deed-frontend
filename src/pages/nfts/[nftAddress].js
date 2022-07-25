import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Web3Modal from 'web3modal';

export default function NFT() {
  const router = useRouter();
  const { nftAddress } = router.query;
  const [NFT, setNFT] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [projectNFTs, setProjectNFTs] = useState([]);
  const [showProjNFTs, setShowProjNFTs] = useState(true);

  const [loadingState, setLoadingState] = useState('not-loaded');
  useEffect(() => {
    loadData();
  }, [nftAddress, loadingState]);

  async function loadData() {
    const nftRes = await fetch(`http://localhost:4000/v1/nft/${nftAddress}`);
    const nftData = await nftRes.json();
    setNFT(nftData);
    console.log(NFT);
    const projRes = await fetch(
      `http://localhost:4000/v1/project/${NFT.projecturl}`
    );
    const projectData = await projRes.json();
    setProjectData(projectData);
    const projNFTsRes = await fetch(
      // add project/${nftData.projecturl} to have just the project's nft
      `http://localhost:4000/v1/nft/`
    );
    const projectNFTs = await projNFTsRes.json();
    setProjectNFTs(projectNFTs.slice(0, 8));
    setLoadingState('loaded');
  }

  if (loadingState === 'loaded' && Object.keys(NFT).length === 0)
    return <h1 className="px-20 py-10 text-3xl">NFT not found...</h1>;

  return (
    <div className="flex justify-center flex-col mx-default">
      <div className="flex justify-center">
        <div className="basis-5/12">
          <div>
            <div className="grid gap-4 place-content-center border shadow rounded-xl overflow-hidden max-w-xl">
              <img
                className="object-contain object-cover"
                src={NFT.imageLink}
              />
            </div>
          </div>
        </div>
        <div className="mx-8 flex-col basis-7/12">
          <div>
            <Link href={`/projects/${NFT.projecturl}`}>
              <a className="mt-4 w-full text-blue-500 font-bold">
                {NFT.projecturl}
              </a>
            </Link>
            <div className="grid gap-4 place-content-center border shadow rounded-xl overflow-hidden max-w-xl">
              {NFT.nftName}
            </div>
            <h1>{NFT.address}</h1>
            <div className="px-4 grow">
              <button className="place-content-center bg-pink-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Purchase
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="border shadow rounded-xl overflow-hidden content-center">
        <button
          className="p-3 font-bold bg-bgHeader w-full"
          onClick={() => setShowProjNFTs(!showProjNFTs)}
        >
          More From This Collection
        </button>
        {showProjNFTs && (
          <div className="grid grid-cols-4 gap-4 p-4 bg-bgSubsection">
            {projectNFTs.map((nft, i) => (
              <Link href={{ pathname: `/nfts/${nft.address}` }} key={i}>
                <div
                  key={i}
                  className=" shadow rounded-xl overflow-hidden object-contain bg-bgPageDefault"
                >
                  <img
                    src={nft.imageLink}
                    className="object-cover h-screen/4 w-screen/4 mx-auto hover:scale-110"
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
  );
}
