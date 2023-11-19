import {
  Field,
  PublicKey,
  UInt64
} from 'o1js';
import {
  RuntimeModule,
  runtimeModule,
  state,
  runtimeMethod,
} from "@proto-kit/module";
import { State, StateMap, assert } from "@proto-kit/protocol";
import { ERC20LikeToken } from './ERC20LikeToken';
import { stat } from 'fs';
  
  const tokenSymbol = 'DAI';
  export const errors = {
    senderNotAuthorized: () => "Sender is not authorized for spending token",
  };

  export class ZKMToken extends ERC20LikeToken {
    
    @state() public supplyBalance = StateMap.from<PublicKey, UInt64>(
      PublicKey,
      UInt64
    );
    public admin = State.from<PublicKey>(PublicKey);

    public constructor(admin: PublicKey, symbol:Field){
      super(Field.from("zkM"+symbol.toString()+"Token"));
      this.admin.set(admin);

    }
    @runtimeMethod()
    public _supply(from: PublicKey, amount: UInt64): void {
      assert(this.transaction.sender.equals(this.admin.get().value), errors.senderNotAuthorized());
      const stored = this.supplyBalance.get(from).value;
      const newBalance = stored.add(amount);
      // ask for atomicity
      this.supplyBalance.set(from, newBalance);
      super.mint(from, amount);
      
    }
    @runtimeMethod()
    public _withdraw(from: PublicKey, amount: UInt64): void {
      assert(this.transaction.sender.equals(this.admin.get().value), errors.senderNotAuthorized());
      const stored = this.supplyBalance.get(from).value;
      const newBalance = stored.sub(amount);
      // ask for atomicity
      this.supplyBalance.set(from, newBalance);
      super.burn(from, amount);
    }
  }