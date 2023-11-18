import {
  Field,
} from 'o1js';
import { erc20Token } from './ERC20LikeToken';
  
  const tokenSymbol = 'DAI';
  
  export class ZKMDebtToken extends erc20Token {
    public constructor(symbol:Field){
      super(Field.from("zkM"+symbol.toString()+"DebtToken"));
    }
  }