/* pages/my-nfts.js */
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Web3Modal from 'web3modal';
import { useRouter } from 'next/router';
import { useCookies, withCookies } from 'react-cookie';

function MyAssets() {
  const [nfts, setNfts] = useState([]);
  const [account, setAccount] = useState('');
  const [loadingState, setLoadingState] = useState('not-loaded');
  const router = useRouter();
  const [cookies, setCookie] = useCookies();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(cookies.loggedIn);
  }, [cookies.loggedIn]);

  useEffect(() => {
    if (loggedIn) readAccount();
  }, [account, loadingState]);

  useEffect(() => {
    if (loggedIn) loadNFTs();
  }, [account, loadingState, loggedIn]);

  async function loadNFTs() {
    await checkWallet();
    console.log(account);
    const nftRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/nft/owner/${account}`
    );
    const nftData = await nftRes.json();
    setNfts(Object.keys(nftData).length !== 0 ? nftData : []);
    setLoadingState('loaded');
  }

  const checkWallet = async () => {
    if (window.ethereum) {
      // check if i have metamask installed or not
      ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
        setCookie('account', accounts[0], {
          path: '/',
        });
        if (!accounts.length) {
          setCookie('loggedIn', false, {
            path: '/',
          });
        }
        // Handle the new accounts, or lack thereof.
        // "accounts" will always be an array, but it can be empty.
      });
    }
  };

  const readAccount = async () => {
    if (window.ethereum) {
      // check if i have metamask installed or not
      let accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0]);
    }
  };

  if (loggedIn === 'false') {
    return (
      <h1 className="py-10 px-20 text-3xl">Please Connect Your Account</h1>
    );
  }

  if (loadingState === 'loaded' && Object.keys(nfts).length === 0)
    return (
      <h1 className="py-10 px-20 text-3xl">
        No NFTs owned {cookies.loggedIn} sfsfs
      </h1>
    );

  return (
    <div className="flex justify-center">
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img src={nft.imageLink} className="rounded" />
              <div className="p-4 bg-black">
                <p className="text-2xl font-bold text-white">
                  Price - {nft.price} Eth
                </p>
                <Link href={{ pathname: `/nfts/${nft.address}` }} key={i}>
                  <button className="mt-4 w-full bg-textPink text-white font-bold py-2 px-12 rounded">
                    See NFT
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default withCookies(MyAssets);
