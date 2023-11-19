import { UInt64 } from "o1js";
import {  LendingMarket} from "./LendingMarkets/LendingMarket";

export default {
  modules: {
    LendingMarket,
  },
  config: {
    Balances: {
      totalSupply: UInt64.from(10000),
    },
  },
};
