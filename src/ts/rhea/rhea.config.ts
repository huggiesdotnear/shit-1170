import { getConfig } from '@ref-finance/ref-sdk';// This will automatically use mainnet since no env vars are set
const config = getConfig();
console.log(config); // You'll see mainnet settings