import React from 'react';

interface AssetToSupply {
  id: number;
  asset: string;
  walletBalance: number;
  apy: number;
}

interface SupplyMarketProps {
  assetsToSupply: AssetToSupply[];
}


const SupplyMarketComponent: React.FC<SupplyMarketProps> = ({ assetsToSupply }) => {

    // Correctly type the 'asset' parameter with 'AssetToSupply' interface
  const handleButtonClick = (asset: AssetToSupply, action: string) => {
    console.log(`Action: ${action}`);
    console.log(`Asset: ${asset.asset}`);
    console.log(`Wallet Balance: ${asset.walletBalance}`);
    console.log(`APY: ${asset.apy}`);
  };

    return (
      <div className="p-4 bg-white shadow-lg rounded-lg my-4">
        <h2 className="text-2xl font-bold mb-4">Assets to Supply</h2>
        <div className="space-y-3">
          {assetsToSupply.map((asset) => (
            <div key={asset.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 my-2">
              <div className="font-semibold">{asset.asset}</div>
              <div>Wallet Balance: {asset.walletBalance}</div>
              <div>APY: {asset.apy}%</div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleButtonClick(asset, 'Supply')}
                >
              Supply
              </button>
            </div>
            
          ))}
        </div>

      </div>
    );
  };
  

export default SupplyMarketComponent;
