// BorrowMarketComponent.tsx
import React from 'react';

// Define the structure of a single asset for borrowing
interface AssetBorrow {
  id: number;
  asset: string;
  available: number; // Added the 'available' property
  apy: number;
}

// Define the props for the BorrowMarketComponent
interface BorrowMarketProps {
  assetsToBorrow: AssetBorrow[]; // Use an array of AssetBorrow
}

const BorrowMarketComponent: React.FC<BorrowMarketProps> = ({ assetsToBorrow }) => {
    const handleButtonClick = (asset: AssetBorrow, action: string) => {
        console.log(`Action: ${action}`);
        console.log(`Asset: ${asset.asset}`);
        console.log(`Available: ${asset.available}`);
        console.log(`APY: ${asset.apy}`);
      };
    return (
      <div className="p-4 bg-white shadow-lg rounded-lg my-4">
        <h2 className="text-2xl font-bold mb-4">Assets to Borrow</h2>
        <div className="space-y-3">
          {assetsToBorrow.map((asset) => (
            <div key={asset.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 my-2">
              <div className="font-semibold">{asset.asset}</div>
              <div>Available: {asset.available}</div>
              <div>APY: {asset.apy}%</div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleButtonClick(asset, 'Borrow')}
                >
                Borrow
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

export default BorrowMarketComponent;
