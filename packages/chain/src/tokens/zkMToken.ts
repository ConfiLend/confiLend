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

interface ZKMTokenInterface {
  defaultaddr: string;
  minaAddresses : Map<string, string> ;
}
  @runtimeModule()
  export class zkMToken extends ERC20LikeToken {
    
    @state() public supplyBalance = StateMap.from<PublicKey, UInt64>(
      PublicKey,
      UInt64
    );
    public admin = State.from<PublicKey>(PublicKey);

    public constructor(){
      super();
    }
    @runtimeMethod()
    public setAdmin(admin: PublicKey): void {
      this.admin.set(admin);
    }
    @runtimeMethod()
    public getAdmin(): PublicKey {
      return this.admin.get().value;
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