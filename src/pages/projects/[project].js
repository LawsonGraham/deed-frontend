import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Web3Modal from 'web3modal';

function Project({ data }) {
  const [projectNFTs, setProjectNFTs] = useState(data);
  const [loadingState, setLoadingState] = useState('not-loaded');
  // useEffect(() => {
  //   loadNfts();
  // }, []);

  // async function loadNfts() {
  //   const res = await fetch(`http://localhost:4000/v1/nft/boredapesyachtclub`);
  //   const arr = await res.json();

  //   console.log(arr)
  //   setProjectNFTs(arr);
  //   setLoadingState('loaded');
  // }

  if (loadingState === 'loaded' && !projectNFTs)
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;

  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {projectNFTs.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img src={nft.imageLink} />
              <div className="p-4">
                <p
                  style={{ height: '32px' }}
                  className="text-2xl font-semibold"
                >
                  {nft.nftName}
                </p>
                {nft.transactions.map((tx, i) => (
                  <div key={i}>
                    <p>{tx.sender}</p>
                    <p>{tx.receiever}</p>
                    <p>{tx.price}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-black">
                <Link href={`/nfts/${nft.address}`}>
                  <a className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded">
                    See NFT
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

export async function getServerSideProps(ctx) {
  // Fetch data from external API
  const projectURL = ctx.query.project;
  const res = await fetch(`http://localhost:4000/v1/nft/project/${projectURL}`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Project;
