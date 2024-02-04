import { ChainInfo } from '@keplr-wallet/types';

export const suggestChains: ChainInfo[] = [
  {
    chainId: 'bitcanna-1',
    chainName: 'BitCanna',
    rpc: 'https://rpc.bitcanna.safeblock.space',
    rest: 'https://api.bitcanna.safeblock.space',
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: 'bcna',
      bech32PrefixAccPub: 'bcna' + 'pub',
      bech32PrefixValAddr: 'bcna' + 'valoper',
      bech32PrefixValPub: 'bcna' + 'valoperpub',
      bech32PrefixConsAddr: 'bcna' + 'valcons',
      bech32PrefixConsPub: 'bcna' + 'valconspub',
    },
    currencies: [
      {
        coinDenom: 'BCNA',
        coinMinimalDenom: 'ubcna',
        coinDecimals: 6,
        coinGeckoId: 'bitcanna',
      },
    ],
    feeCurrencies: [
      {
        coinDenom: 'BCNA',
        coinMinimalDenom: 'ubcna',
        coinDecimals: 6,
        coinGeckoId: 'bitcanna',
      },
    ],
    stakeCurrency: {
      coinDenom: 'BCNA',
      coinMinimalDenom: 'ubcna',
      coinDecimals: 6,
      coinGeckoId: 'bitcanna',
    },
    coinType: 118,
    features: ['stargate', 'ibc-transfer'],
  },
  {
    chainId: 'bitsong-2b',
    chainName: 'BitSong',
    rpc: 'https://rpc.explorebitsong.com',
    rest: 'https://lcd.explorebitsong.com',
    bip44: {
      coinType: 639,
    },
    bech32Config: {
      bech32PrefixAccAddr: 'bitsong',
      bech32PrefixAccPub: 'bitsong' + 'pub',
      bech32PrefixValAddr: 'bitsong' + 'valoper',
      bech32PrefixValPub: 'bitsong' + 'valoperpub',
      bech32PrefixConsAddr: 'bitsong' + 'valcons',
      bech32PrefixConsPub: 'bitsong' + 'valconspub',
    },
    currencies: [
      {
        coinDenom: 'BTSG',
        coinMinimalDenom: 'ubtsg',
        coinDecimals: 6,
        coinGeckoId: 'bitsong',
      },
    ],
    feeCurrencies: [
      {
        coinDenom: 'BTSG',
        coinMinimalDenom: 'ubtsg',
        coinDecimals: 6,
        coinGeckoId: 'bitsong',
      },
    ],
    stakeCurrency: {
      coinDenom: 'BTSG',
      coinMinimalDenom: 'ubtsg',
      coinDecimals: 6,
      coinGeckoId: 'bitsong',
    },
    coinType: 639,
    features: ['stargate', 'ibc-transfer'],
  }
];
