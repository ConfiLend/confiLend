import {
  Field,
  PublicKey,
  UInt64,
  
} from 'o1js';
import {
  RuntimeModule,
  runtimeModule,
  state,
  runtimeMethod,
} from "@proto-kit/module";
import { State, } from "@proto-kit/protocol";

import { ERC20LikeToken } from './ERC20LikeToken';
  
  const tokenSymbol = 'DAI';
  @runtimeModule()
  export class zkMDebtToken extends ERC20LikeToken {
    @state() public admin = State.from<PublicKey>(PublicKey);

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

  }