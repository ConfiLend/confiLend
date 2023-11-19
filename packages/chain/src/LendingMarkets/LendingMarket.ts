import {
  RuntimeModule,
  runtimeModule,
  state,
  runtimeMethod,
} from "@proto-kit/module";
import { State, StateMap, assert } from "@proto-kit/protocol";
import { Bool, PublicKey, UInt64, Field } from "o1js";
import { ERC20LikeToken } from "../tokens/ERC20LikeToken";
import { inject } from "tsyringe";
import { zkMToken } from "../tokens/zkMToken";
import { zkMDebtToken } from "../tokens/zkMDebtToken";
export const errors = {
  tokenDoesNotExist: () => "Token does not exists",
  tokensMatch: () => "Cannot create pool with matching tokens",
  tokenOutAmountTooLow: () => "Token amount too low",
  tokenInAmountTooHigh: () => "Token amount too high",
};
interface LendingMarketConfig {
  minaMTokenAddresses: Map<string, string>;
  minaTokenAddresses: Map<string, string>;
  minaMDebtTokenAddresses: Map<string, string>;
  LendingMarketAddr: string;
}
@runtimeModule()
export class LendingMarket extends RuntimeModule<LendingMarketConfig> {
  @state() public mSupplyToken = StateMap.from<PublicKey, UInt64>(
    PublicKey,
    UInt64
  );
  public constructor(
    @inject("zkMToken") public zkmTokenMap: Map<PublicKey, zkMToken>,
    @inject("zkMDebtToken")
    public zkmDebtTokenMap: Map<PublicKey, zkMDebtToken>,
    @inject("ERC20LikeToken") public tokenMap: Map<PublicKey, ERC20LikeToken>
  ) {
    super();
  }
  public async init(): Promise<void> {
    await this.config.minaTokenAddresses.forEach((value, key) => {
      const mtoken = new zkMToken();
      const mtokenAddr = this.config.minaMTokenAddresses.get(key);
      if (mtokenAddr == undefined) {
        mtoken.setTokenAddress(
          PublicKey.from({ x: Field.from(""), isOdd: Bool(true) })
        );
      } else {
        mtoken.setTokenAddress(
          PublicKey.from({ x: Field.from(mtokenAddr), isOdd: Bool(true) })
        );
      }
      mtoken.setAdmin(
        PublicKey.from({
          x: Field.from(this.config.LendingMarketAddr),
          isOdd: Bool(true),
        })
      );
      mtoken.setSymbol(Field.from("zk" + key + "MToken"));

      this.zkmTokenMap.set(
        PublicKey.from({ x: Field.from(key), isOdd: Bool(true) }),
        mtoken
      );

      const mDebttoken = new zkMDebtToken();
      const mDebttokenAddr = this.config.minaMDebtTokenAddresses.get(key);
      if (mDebttokenAddr == undefined) {
        mtoken.setTokenAddress(
          PublicKey.from({ x: Field.from(""), isOdd: Bool(true) })
        );
      } else {
        mtoken.setTokenAddress(
          PublicKey.from({ x: Field.from(mDebttokenAddr), isOdd: Bool(true) })
        );
      }
      mDebttoken.setAdmin(
        PublicKey.from({
          x: Field.from(this.config.LendingMarketAddr),
          isOdd: Bool(true),
        })
      );
      mDebttoken.setSymbol(Field.from("zk" + key + "DebtToken"));

      this.zkmDebtTokenMap.set(
        PublicKey.from({ x: Field.from(key), isOdd: Bool(true) }),
        mtoken
      );

      const erc20token = new ERC20LikeToken();
      const erc20TokenAddr = value;
      if (erc20TokenAddr == undefined) {
        mtoken.setTokenAddress(
          PublicKey.from({ x: Field.from(""), isOdd: Bool(true) })
        );
      } else {
        mtoken.setTokenAddress(
          PublicKey.from({ x: Field.from(erc20TokenAddr), isOdd: Bool(true) })
        );
      }
      erc20token.setSymbol(Field.from(key));

      this.tokenMap.set(
        PublicKey.from({ x: Field.from(key), isOdd: Bool(true) }),
        new ERC20LikeToken()
      );
    });
    }
  public assertTokenExist(asset: PublicKey) {
    assert(this.tokenExist(asset), errors.tokenDoesNotExist());
  }
  public assertZKMTokenExist(asset: PublicKey) {
    assert(this.ZKMTokenExist(asset), errors.tokenDoesNotExist());
  }
  public assertBalanceSufficient(userBalance: UInt64, amount: UInt64) {
    const isTokenOutAmountSufficient = userBalance.greaterThanOrEqual(amount);
    assert(isTokenOutAmountSufficient, errors.tokenOutAmountTooLow());
  }
  public tokenExist(asset: PublicKey) {
    const pool = this.tokenMap.get(asset);

    if (pool === undefined) return Bool(false);
    else return Bool(true);
  }
  public ZKMTokenExist(asset: PublicKey) {
    const pool = this.zkmTokenMap.get(asset);

    if (pool === undefined) return Bool(false);
    else return Bool(true);
  }
  @runtimeMethod()
  public supply(asset: PublicKey, user: PublicKey, amount: UInt64): void {
    this.assertTokenExist(asset);
    const token = this.tokenMap.get(asset);
    if (token === undefined) return;
    const balance = token.balanceOf(user);
    this.assertBalanceSufficient(balance, amount);
    this.assertZKMTokenExist(asset);

    const zkmToken = this.zkmTokenMap.get(asset);
    if (zkmToken === undefined) return;
    const mTokenAddress = zkmToken.getAddress();
    token.transfer(user, mTokenAddress, amount);
    zkmToken._supply(user, amount);
  }

  @runtimeMethod()
  public withdraw(asset: PublicKey, user: PublicKey, amount: UInt64): void {
    this.assertZKMTokenExist(asset);
    const zkmToken = this.zkmTokenMap.get(asset);
    if (zkmToken === undefined) return;
    zkmToken._withdraw(user, amount);
    const mTokenAddress = zkmToken.getAddress();
    const token = this.tokenMap.get(asset);
    if (token === undefined) return;
    token.transfer(mTokenAddress, user, amount);
  }

  @runtimeMethod()
  public borrow(asset: PublicKey, user: PublicKey, amount: UInt64): void {
    // this.assertZKMTokenExist(asset);
    // const zkmToken = this.zkmTokenMap.get(asset)
    // if(zkmToken === undefined)
    //   return;
    // const zkmDebtToken = this.zkmDebtTokenMap.get(asset)
    // if(zkmDebtToken === undefined)
    //   return;
    // zkmDebtToken._borrow(user, amount);
  }

  @runtimeMethod()
  public repay(asset: PublicKey, user: PublicKey, amount: UInt64): void {}
}
