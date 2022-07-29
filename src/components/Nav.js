import Link from 'next/link';

export default function Nav() {
    return (
        <nav className="flex flex-row border-b p-6">
        <p className="text-4xl font-bold pr-4 pl-2 basis-1/3 text-left">
          Deed Crowdfunding
        </p>
        <div class="justify-center basis-1/3">
          <div class="mb-3 xl:w-96">
            <div class="input-group relative flex flex-row items-stretch w-full mb-4">
              <input
                type="search"
                class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-textPink focus:outline-none"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
              />
              <button
                class="btn inline-block px-6 py-2.5 bg-textPink text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-pink-600 hover:shadow-lg focus:bg-pink-600  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-700 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                type="button"
                id="button-addon2"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="search"
                  class="w-4"
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
        <div className="flex mt-3 pl-5 basis-1/3 align-middle">
          <Link href="/">
            <a className="mr-4 text-textPink">Home</a>
          </Link>
          <Link href="/create-nft">
            <a className="mr-6 text-textPink">Sell NFT</a>
          </Link>
          <Link href="/my-nfts">
            <a className="mr-6 text-textPink">My NFTs</a>
          </Link>
          <Link href="/dashboard">
            <a className="mr-6 text-textPink">Dashboard</a>
          </Link>
        </div>
      </nav>
    );
  }
  