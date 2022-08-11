import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useCookies } from 'react-cookie';

export default function Nav() {
  const [web3Modal, setWeb3Modal] = useState('');
  const [cookies, setCookie] = useCookies(['loggedIn', 'account']);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: 'INFURA_ID', // required
        },
      },
    };
    const web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
    });
    setWeb3Modal(web3Modal);
  }, []);

  useEffect(() => {
    if (loggedIn) checkWallet();
  }, [cookies.account]);

  const connectMetaMask = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      if (accounts) {
        setCookie('account', accounts[0], {
          path: '/',
        });
      }
      setCookie('loggedIn', true, {
        path: '/',
      });
    } catch (err) {
      console.log(err);
    }
  };

  const checkWallet = async () => {
    if (window.ethereum) {
      // check if i have metamask installed or not
      ethereum.on('accountsChanged', (accounts) => {
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

  useEffect(() => {
    setLoggedIn(cookies.loggedIn);
  }, [cookies.loggedIn, cookies.account]);

  return (
    <nav className="flex flex-row border-b p-6">
      <p className="text-4xl font-bold pr-4 pl-2 basis-4/12 text-left">
        Deed Crowdfunding
      </p>
      <div className="justify-center basis-3/12">
        <div className="mb-3 xl:w-96">
          <div className="input-group relative flex flex-row items-stretch w-full mb-4">
            <input
              type="search"
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-textPink focus:outline-none"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <button
              className="btn inline-block px-6 py-2.5 bg-textPink text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-pink-600 hover:shadow-lg focus:bg-pink-600  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-700 active:shadow-lg transition duration-150 ease-in-out flex items-center"
              type="button"
              id="button-addon2"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between pl-6 basis-5/12">
        <Link href="/">
          <a className="mt-2 text-textPink">Home</a>
        </Link>
        <Link href="/create-nft">
          <a className="mt-2 text-textPink">Sell NFT</a>
        </Link>
        <Link href="/my-nfts">
          <a className="mt-2 text-textPink">My NFTs</a>
        </Link>
        <Link href="/dashboard">
          <a className="mt-2 text-textPink">Dashboard</a>
        </Link>
        {loggedIn === 'true' ? (
          <div className="">
            <p className="px-3 py-1 bg-bgSubsection text-textPink text-lg text-bold border-black text-xs leading-tight rounded-3xl shadow-md">
              {cookies.account.substring(0, 10)}...
            </p>
          </div>
        ) : (
          <div className="">
            <btn
              onClick={connectMetaMask}
              className="btn px-6 py-2.5 bg-textPink text-white font-medium text-xs leading-tight rounded-3xl shadow-md hover:bg-pink-600 hover:shadow-lg focus:bg-pink-600  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-700 active:shadow-lg transition duration-150 ease-in-out flex items-center"
            >
              Connect Wallet
            </btn>
          </div>
        )}
      </div>
    </nav>
  );
}
