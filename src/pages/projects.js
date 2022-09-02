/* pages/projects.js */
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Web3Modal from 'web3modal';
import { useRouter } from 'next/router';
import { useCookies, withCookies } from 'react-cookie';
import SearchDropdown from '../components/SearchDropdown';

function Projects() {
  const [filters, setFilters] = useState([]);

  const [nfts, setProjects] = useState([]);
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
    const projectsRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/project/`
    );
    const projectData = await projectsRes.json();
    setProjects(Object.keys(projectData).length !== 0 ? projectData : []);
    setLoadingState('loaded');
  }

  const readAccount = async () => {
    if (window.ethereum) {
      // check if i have metamask installed or not
      let accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0]);
    }
  };

  if (loadingState === 'loaded' && Object.keys(nfts).length === 0)
    return <h1 className="py-10 px-20 text-3xl">No Projects listed</h1>;

  return (
    <div className="flex justify-center flex-col mx-default">
      <div className="p-4">
        <div name="upper" className="py-6">
          <div name="header" className="text-4xl font-bold text-center">
            Explore Active Projects
          </div>
          <div name="search" className="grid grid-cols-4 grid-rows-2 pt-8">
            <div className="text-xl text-center">Location</div>
            <div className="text-xl text-center">Raise Goal</div>
            <div className="text-xl text-center">End Date</div>
            <div className="text-xl text-center"></div>
            <div className="grid grid-cols-1 px-4">
              <SearchDropdown
                listName="Store Location"
                listValues={[
                  'AK - Alaska',
                  'AZ - Arizona',
                  'CA - California',
                  'CO - Colorado',
                  'CT - Connecticut',
                  'IL - Illinois',
                  'MA - Massachusetts',
                  'ME - Maine',
                  'MI - Michigan',
                  'MT - Montana',
                  'NJ - New Jersey',
                  'NM - New Mexico',
                  'NV - Nevada',
                  'NY - New York',
                  'OH - Ohio',
                  'OK - Oklahoma',
                  'OR - Oregon',
                  'PA - Pennsylvania',
                  'RI - Rhode Island',
                  'SD - South Dakota',
                  'UT - Utah',
                  'VA - Virginia',
                  'VT - Vermont',
                  'WA - Washington',
                  'WV - West Virginia',
                ]}
              />
            </div>
            <div className="grid grid-cols-1 px-4">
              <SearchDropdown
                listName="Fundraise Range"
                listValues={['0 - 10,000', '10,000 - 100,000', '100,000+']}
              />
            </div>
            <div className="grid grid-cols-1 px-4">
              <SearchDropdown
                listName="Fundraise End Date"
                listValues={[
                  '< 1 week',
                  '1 week - 1 month',
                  '1 month - 6 months',
                  '6 months - 1 year',
                  '1 year+',
                ]}
              />
            </div>
            <div className="grid grid-cols-1 px-4">
              <button className="mx-5">Search</button>
            </div>
          </div>
        </div>
        <div
          name="lower-projects-list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4"
        >
          {nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img src={nft.imageLink} className="rounded" />
              <div className="p-4 bg-black">
                <p className="text-2xl font-bold text-white">
                  Price - {nft.price} Eth
                </p>
                <p className="text-2xl font-bold text-white">
                  {nft.totalShares}
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

export default withCookies(Projects);
