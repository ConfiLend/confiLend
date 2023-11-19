import {
  Field,
} from 'o1js';
import { ERC20LikeToken } from './ERC20LikeToken';
  
  const tokenSymbol = 'DAI';
  
  export class ZKMDebtToken extends ERC20LikeToken {
    public constructor(symbol:Field){
      super(Field.from("zkM"+symbol.toString()+"DebtToken"));
    }
  }