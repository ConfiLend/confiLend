import {
    RuntimeModule,
    runtimeModule,
    state,
    runtimeMethod,
  } from "@proto-kit/module";

import { State, StateMap, assert } from "@proto-kit/protocol";
import {
    Field,
    PublicKey,
    UInt64,
    Provable,
} from 'o1js';
export const errors = {
    senderNotFrom: () => "Sender does not match 'from'",
    userDoesNotHave: (tokenSymbol: Field) => "User does not have " + tokenSymbol + " balance",
    fromBalanceInsufficient: () => "From balance is insufficient",
    burnBalanceInsufficient: () => "Burn balance is insufficient",
  };

export class erc20Token extends  RuntimeModule<unknown> {
    @state() public balances = StateMap.from<PublicKey, UInt64>(
        PublicKey,
        UInt64
      );
     public tokenSymbol = State.from<Field>(Field);

      public constructor(symbol: Field) {
        super();
        this.tokenSymbol.set(symbol);
      }
    
  @runtimeMethod()
  public balanceOf(address: PublicKey): UInt64 {
    const balance = this.balances.get(address);

    return Provable.if(
      balance.isSome,
      UInt64,
      balance.value,
      UInt64.from(0)
    );
}
public setBalance( address: PublicKey, amount: UInt64) {
    this.balances.set(address, amount);
  }

@runtimeMethod()
  public mint( address: PublicKey, amount: UInt64) {
    const balance = this.balanceOf( address);
    const newBalance = balance.add(amount);
    this.setBalance( address, newBalance);
  }
  @runtimeMethod()
  public burn( address: PublicKey, amount: UInt64) {
    const balance = this.balanceOf(address);
    assert(balance.greaterThanOrEqual(amount), errors.burnBalanceInsufficient());
    const newBalance = balance.sub(amount);
    this.setBalance( address, newBalance);
  }
  public transfer(
    from: PublicKey,
    to: PublicKey,
    amount: UInt64
  ) {
    const fromBalance = this.balanceOf( from);
    const toBalance = this.balanceOf( to);

    const fromBalanceIsSufficient = fromBalance.greaterThanOrEqual(amount);

    assert(fromBalanceIsSufficient, errors.fromBalanceInsufficient());

    // used to prevent field underflow during subtraction
    const paddedFrombalance = fromBalance.add(amount);
    const safeFromBalance = Provable.if(
      fromBalanceIsSufficient,
      UInt64,
      fromBalance,
      paddedFrombalance
    );

    const newFromBalance = safeFromBalance.sub(amount);
    const newToBalance = toBalance.add(amount);

    this.setBalance(from, newFromBalance);
    this.setBalance(to, newToBalance);
  }
  @runtimeMethod()
  public transferSigned(
    from: PublicKey,
    to: PublicKey,
    amount: UInt64
  ) {
    assert(this.transaction.sender.equals(from), errors.senderNotFrom());
    this.transfer( from, to, amount);
  }
}