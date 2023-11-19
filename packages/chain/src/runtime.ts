import { UInt64 } from "o1js";
import {  LendingMarket} from "./LendingMarkets/LendingMarket";
import {  zkMToken} from "./tokens/zkMToken";
import {  zkMDebtToken} from "./tokens/zkMDebtToken";
import {  ERC20LikeToken} from "./tokens/ERC20LikeToken";

export default {
  modules: {
    LendingMarket,
    zkMDebtToken,
    zkMToken,
    ERC20LikeToken,
  },
  config: {
    LendingMarket: {
    minaTokenAddresses : new Map<string, string>([
    ["USDT", "B62qpZ8L4QZVb9vPX7X4ZJdQoM8iW4e9FqD4xjR8PakjDcTNmJm3Ws6"],
    ["ETH", "B62qjLkpE4ctW5A6rPU4N5P3C5xW6CwKjK8QmxEFHtrUx2QKvT2VbGP"],
    ["DAI", "B62qmXWTU7GsM3M8ZexGe7QYmbGz1CvVUvvmojX5rEJmCypqkqZARsT"],
    ["AAVE", "B62qrF4Q62vM8F3MdjbCq4C9Vz1kV3M4fH2RsvMh8Xy2mB4S8Yq4SbG"],
    ]),
    minaMTokenAddresses : new Map<string, string>([
      ["ETH", "B62qkK9MiVzFgY8RRSSWxj6YBqW6DpMfU95CQUA29jnEndkwF5RjV6N"],
      ["DAI", "B62qiZJYPcTjWtqG9k2qF4DxPbHjR4QkC8kK1gwBmpQsHxsVYD3a8Ea"],
      ["AAVE", "B62qs9G6G2Gc8Pf2J2GxH6FkJSbND8YbQ2s5UW8uP3vWAb4s8YVajEz"],
      ["USDT", "B62qrJ8yD3uz5CqVW8nXsM4B3M4G8M7GkGxEk3jG2xjZPc8xH3Zs2Hn"],
  ]),
    minaMDebtTokenAddresses : new Map<string, string>([
      ["ETH", "B62qnR5JU6xVvJZ6eVfRxU4GTBwX4yT6x4uFZBxV8wvEMz6V3kYVbTi"],
      ["DAI", "B62qj7CGRyV4nH5JTFLc3mD8BfF6MmMkDfGqB3H6Pv4oQbB5mVsjR3V"],
      ["USDT", "B62qmE9JMGV9xUvcTfR9Q8tq5SyB5PcjH9jPw7CQU7zB5pHfK7DmCZx"],
      ["AAVE", "B62qnFhPCVV5oPqfyrzT5zmJ7EY4PqAa4UXnHh8DhAVkHrR6s3K5ZB3"],
      
  ]),
    LendingMarketAddr :  "B62qrJ8yD3uz5CqVW8nXsM4B3M4G8M7GjGxEk3jG2xjZPc8xH3Zs2Hn",
    },
    zkMDebtToken: {},
    zkMToken: {},
    ERC20LikeToken: {},
  },
};
