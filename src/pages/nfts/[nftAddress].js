import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Web3Modal from 'web3modal';
import List from '../../components/List';

export default function NFT() {
  const router = useRouter();
  const { nftAddress } = router.query;
  const [NFT, setNFT] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [projectNFTs, setProjectNFTs] = useState([]);
  const [showProjNFTs, setShowProjNFTs] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [showTxns, setShowTxns] = useState(true);

  const [loadingState, setLoadingState] = useState('not-loaded');
  useEffect(() => {
    loadData();
  }, [nftAddress, loadingState]);

  async function loadData() {
    const nftRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/nft/${nftAddress}`
    );
    const nftData = await nftRes.json();
    setNFT(nftData);
    console.log(NFT);
    const projRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/project/${nftData.projecturl}`
    );
    const projectData = await projRes.json();
    setProjectData(projectData);
    const projNFTsRes = await fetch(
      // add project/${nftData.projecturl} to have just the project's nft
      `${process.env.NEXT_PUBLIC_API_URL}/v1/nft/`
    );
    const projectNFTs = await projNFTsRes.json();
    setProjectNFTs(projectNFTs.slice(0, 8));
    setLoadingState('loaded');
  }

  if (loadingState === 'loaded' && Object.keys(NFT).length === 0)
    return <h1 className="px-20 py-10 text-3xl">NFT not found...</h1>;

  return (
    <div className="flex justify-center flex-col mx-default">
      <div name="panel-upper" className="flex flex-col">
        <div className="flex justify-center">
          <div name="left-panel-upper" className="basis-5/12 p-2 space-y-3">
            <div>
              <div className="grid gap-4 place-content-center border shadow rounded-xl overflow-hidden max-w-xl">
                <img
                  className="object-contain object-cover"
                  src={NFT.imageLink}
                />
              </div>
            </div>
            <div
              name="left-panel-upper-description"
              className="border shadow rounded-xl overflow-hidden content-center"
            >
              <button
                className="p-3 font-bold bg-bgHeader w-full text-xl"
                onClick={() => setShowDescription(!showDescription)}
              >
                Project Description
              </button>
              {showDescription && (
                <p className="p-3 bg-bgSubsection">{projectData.projectInfo}</p>
              )}
            </div>
          </div>
          <div
            name="right-panel-upper"
            className="flex-col basis-7/12 p-2 space-y-3"
          >
            <section
              name="right-panel-upper-header"
              className="overflow-hidden p-2"
            >
              <Link href={`/projects/${NFT.projecturl}`}>
                <div className="flex flex-row">
                  <a className=" text-blue-500 font-bold pr-2">
                    {projectData.name}
                  </a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="blue"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
              <div className="grid gap-4 font-bold text-4xl pt-3">
                {NFT.nftName}
              </div>
            </section>
            <section
              name="right-panel-upper-pricing"
              className="border shadow rounded-xl overflow-hidden content-center"
            >
              <div className="p-3 font-bold bg-bgHeader w-full text-center text-xl">
                <p>Auction Information</p>
              </div>
              <div className="bg-bgSubsection">
                <div name="pricing-ask-label" className="p-2 text-fontBG">
                  Current Price:
                </div>
                <div
                  name="pricing-price-container"
                  className="flex flex-row p-2 align-middle"
                >
                  <div className="flex flex-col justify-center">
                    <img
                      src="https://logos-world.net/wp-content/uploads/2020/12/Ethereum-Symbol.png"
                      alt="ethLogo"
                      className="max-w-[4rem] max-h-[2rem] grow-0"
                    />
                  </div>
                  <div>
                    <p className="text-4xl font-bold">{NFT.price} ETH</p>
                  </div>
                  <div className="flex flex-col-reverse p-1 text-fontBG">
                    <p className="text-l">
                      {' '}
                      &#40;${Math.round(NFT.price * 1445.56 * 100) / 100}&#41;
                    </p>
                  </div>
                </div>
                <div
                  name="pricing-offer-buttons"
                  className="flex row p-2 space-x-2"
                >
                  <button
                    name="pricing-buy-now"
                    className="mt-4 w-full bg-textPink text-white font-bold p-2 rounded hover:scale-[103%]"
                  >
                    Buy Now
                  </button>
                  <button
                    name="pricing-make-offer"
                    className="mt-4 w-full bg-white text-textPink font-bold py-2 px-12 rounded border shadow hover:scale-[103%]"
                  >
                    Make Offer
                  </button>
                </div>
              </div>
            </section>
            <section
              name="right-panel-upper-tx-history"
              className="border shadow rounded-xl overflow-hidden content-center"
            >
              <button
                className="p-3 font-bold bg-bgHeader w-full text-xl"
                onClick={() => setShowTxns(!showTxns)}
              >
                Previous Transactions
              </button>
              {showTxns && Object.keys(NFT).length !== 0 && (
                <div className="flex flex-col bg-bgSubsection">
                  <div className="flex flex-row divide-x-3 justify-between block px-4 py-2 border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer">
                    <div className="basis-1/3">
                      <p className="text-center font-bold">Price</p>
                    </div>
                    <div className="basis-1/3">
                      <p className="text-center font-bold">Reciever</p>
                    </div>
                    <div className="basis-1/3">
                      <p className="text-center font-bold">Sender</p>
                    </div>
                  </div>
                  <List listContents={NFT.transactions} />
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
      <div
        name="panel-lower"
        className="border shadow rounded-xl overflow-hidden content-center mx-2"
      >
        <button
          className="p-3 font-bold bg-bgHeader w-full text-xl"
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
  );
}
