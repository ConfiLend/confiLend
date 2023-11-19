import React from 'react';

interface AssetBorrow {
  id: number;
  asset: string;
  debt: number;
  apy: number;
}

interface BorrowsProps {
  borrows: AssetBorrow[];
}

const BorrowsComponent: React.FC<BorrowsProps> = ({ borrows }) => {
  const handleButtonClick = (borrow: AssetBorrow, action: string) => {
    console.log(`Action: ${action}`);
    console.log(`Asset: ${borrow.asset}`);
    console.log(`Debt: ${borrow.debt}`);
    console.log(`APY: ${borrow.apy}`);
  };
    return (
      <div className="p-4 bg-white shadow-lg rounded-lg my-4">
        <h2 className="text-2xl font-bold mb-4">Your Borrows</h2>
        <div className="space-y-3">
          {borrows.map((borrow) => (
            <div key={borrow.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 my-2">
              <div className="font-semibold">{borrow.asset}</div>
              <div>Debt: {borrow.debt}</div>
              <div>APY: {borrow.apy}%</div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleButtonClick(borrow, 'Repay')}
              >
                Repay
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

export default BorrowsComponent;
