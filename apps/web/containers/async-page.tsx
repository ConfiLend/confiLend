// "use client";
// import { Faucet } from "@/components/faucet";
// import { useFaucet } from "@/lib/stores/balances";
// import { useWalletStore } from "@/lib/stores/wallet";

// export default function Home() {
//   const wallet = useWalletStore();
//   const drip = useFaucet();

//   return (
//     <div className="mx-auto -mt-32 h-full pt-16">
//       <div className="flex h-full w-full items-center justify-center pt-16">
//         <div className="flex basis-4/12 flex-col items-center justify-center 2xl:basis-3/12">
//           <Faucet
//             wallet={wallet.wallet}
//             onConnectWallet={wallet.connectWallet}
//             onDrip={drip}
//             loading={false}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { Faucet } from "@/components/faucet";
import { useFaucet } from "@/lib/stores/balances";
import { useWalletStore } from "@/lib/stores/wallet";
import SuppliesComponent from '../components/ui/suppliesComponent';
import BorrowsComponent from '../components/ui/borrowsComponent';
import SupplyMarketComponent from '../components/ui/supplyMarketComponent';
import BorrowMarketComponent from '../components/ui/borrowMarketComponent';

export default function Home() {
  const wallet = useWalletStore();
  const drip = useFaucet();

  const mockSupplies = [
    { id: 1, asset: 'ETH', balance: 0.5, apy: 1.7, collateral: 2000 },
    { id: 2, asset: 'DAI', balance: 1500, apy: 2.2, collateral: 1500 },
  ];
  
  const mockBorrows = [
    { id: 1, asset: 'USDC', debt: 500, apy: 3.5 },
    { id: 2, asset: 'BTC', debt: 0.1, apy: 4.5 },
  ];
  
  const mockAssetsToSupply = [
    { id: 1, asset: 'MATIC', walletBalance: 1000, apy: 1.2 },
    { id: 2, asset: 'LINK', walletBalance: 500, apy: 2.5 },
  ];
  
  const mockAssetsToBorrow = [
    { id: 1, asset: 'AAVE', available: 300, apy: 3.3 },
    { id: 2, asset: 'MKR', available: 50, apy: 5.0 },
  ];
  

 return (

    <div className="flex flex-col h-screen justify-center py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
          <SuppliesComponent supplies={mockSupplies} />
          <BorrowsComponent borrows={mockBorrows} />
          <SupplyMarketComponent assetsToSupply={mockAssetsToSupply} />
          <BorrowMarketComponent assetsToBorrow={mockAssetsToBorrow} />
        </div>
      </div>
    </div>
  );
}



