export default function List(props) {
  return (
    <div>
      {props.listContents.map((tx, i) => (
        <div
          key={i}
          className="flex flex-row divide-x-3 justify-between block px-4 py-2 border border-gray-200 w-full hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
        >
          <div className="basis-1/3">
            <p className="text-center">{tx.price} ETH</p>
          </div>
          <div className="basis-1/3">
            <p className="text-center">{tx.receiever}</p>
          </div>
          <div className="basis-1/3">
            <p className="text-center">{tx.sender}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
