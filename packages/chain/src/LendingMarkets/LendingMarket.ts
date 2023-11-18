import {
    RuntimeModule,
    runtimeModule,
    state,
    runtimeMethod,
  } from "@proto-kit/module";
  import { State, StateMap, assert } from "@proto-kit/protocol";
  import { PublicKey, UInt64 } from "o1js";

@runtimeModule()
export class LendingMarket extends RuntimeModule<unknown> {
  

  @runtimeMethod()
  public supply(asset: PublicKey, user: PublicKey, amount: UInt64): void {
    // if amount <= user.balanceOf(asset)
    //  false: return error
    // else
    //  poolSupplies[asset] += amount
    //  erc20.transfer to user aToken
  }

  @runtimeMethod()
  public withdraw(asset: PublicKey, user: PublicKey, amount: UInt64): void {}
  
  @runtimeMethod()
  public borrow(asset: PublicKey, user: PublicKey, amount: UInt64): void {}
  
  @runtimeMethod()
  public repay(asset: PublicKey, user: PublicKey, amount: UInt64): void {}
}