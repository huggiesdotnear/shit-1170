// Prices
// https://prices.intear.tech/price?token_id=
// just returns a raw string example: 6.351883758720653e-7


// RHEA POOL INFO
// await near.view({contractId: "v2.ref-finance.near", methodName: "get_pool", args: { pool_id: 1 }})
// {
//     "pool_kind": "SIMPLE_POOL",
//     "token_account_ids": [
//       "c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.factory.bridge.near",
//       "wrap.near"
//     ],
//     "amounts": [
//       "674311691460979292",
//       "1290454443062766643466862442"
//     ],
//     "total_fee": 30,
//     "shares_total_supply": "33603980047354512496830650",
//     "amp": 0
//   }
// we only care about the token account id's, and the amount of each