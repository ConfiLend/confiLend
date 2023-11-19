import React from 'react';

interface AssetSupply {
  id: number;
  asset: string;
  balance: number;
  apy: number;
  collateral: number;
}

interface SuppliesProps {
  supplies: AssetSupply[];
}

const SuppliesComponent: React.FC<SuppliesProps> = ({ supplies }) => {
  const handleButtonClick = (supply: AssetSupply, action: string) => {
    console.log(`Action: ${action}`);
    console.log(`Asset: ${supply.asset}`);
    console.log(`Balance: ${supply.balance}`);
    console.log(`APY: ${supply.apy}`);
    console.log(`Collateral: ${supply.collateral}`);
  };
    return (
      <div className="p-4 bg-white shadow-lg rounded-lg my-4">
        <h2 className="text-2xl font-bold mb-4">Your Supplies</h2>
        <div className="space-y-3">
          {supplies.map((supply) => (
            <div key={supply.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 my-2">
              <div className="font-semibold">{supply.asset}</div>
              <div>Balance: {supply.balance}</div>
              <div>APY: {supply.apy}%</div>
              <div>Collateral: ${supply.collateral}</div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleButtonClick(supply, 'Withdraw')}
              >
                Withdraw
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default SuppliesComponent;
