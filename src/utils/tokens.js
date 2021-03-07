export const GHST = { symbol: 'GHST', decimals: 18, coingeckoId: 'aavegotchi' };

// export const TOKENS = {
//   '0xE0b22E0037B130A9F56bBb537684E6fA18192341': { symbol: 'aDAI', decimals: 18, coingeckoId: 'matic-aave-dai' },
//   '0x9719d867A500Ef117cC201206B8ab51e794d3F82': { symbol: 'aUSDC', decimals: 6, coingeckoId: 'matic-aave-usdc' },
//   '0xF4b8888427b00d7caf21654408B7CBA2eCf4EbD9': { symbol: 'aTUSD', decimals: 18, coingeckoId: 'matic-aave-tusd' },
//   '0xDAE5F1590db13E3B40423B5b5c5fbf175515910b': { symbol: 'aUSDT', decimals: 6, coingeckoId: 'matic-aave-usdt' },
//   '0x823CD4264C1b951C9209aD0DeAea9988fE8429bF': { symbol: 'aAAVE', decimals: 18, coingeckoId: 'matic-aave-aave' },
//   '0x8c8bdBe9CeE455732525086264a4Bf9Cf821C498': { symbol: 'aUNI', decimals: 18, coingeckoId: 'matic-aave-uni' },
//   '0xe20f7d1f0eC39C4d5DB01f53554F2EF54c71f613': { symbol: 'aYFI', decimals: 18, coingeckoId: 'matic-aave-yfi' },
//   '0x98ea609569bD25119707451eF982b90E3eb719cD': { symbol: 'aLINK', decimals: 18, coingeckoId: 'matic-aave-link' },
//   '0x20D3922b4a1A8560E1aC99FBA4faDe0c849e2142': { symbol: 'aWETH', decimals: 18, coingeckoId: 'matic-aave-weth' },
//   '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174': { symbol: 'USDC', decimals: 6, coingeckoId: 'usd-coin' },
//   '0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7': GHST,
// }

export const TOKENS = {
  aDAI: { address: '0xE0b22E0037B130A9F56bBb537684E6fA18192341', symbol: 'aDAI', decimals: 18, coingeckoId: 'matic-aave-dai', route: ['aDAI', 'aUSDC', 'USDC'] },
  aUSDC: { address: '0x9719d867A500Ef117cC201206B8ab51e794d3F82', symbol: 'aUSDC', decimals: 6, coingeckoId: 'matic-aave-usdc', route: ['aUSDC', 'USDC'] },
  aTUSD: { address: '0xF4b8888427b00d7caf21654408B7CBA2eCf4EbD9', symbol: 'aTUSD', decimals: 18, coingeckoId: 'matic-aave-tusd', route: ['aTUSD', 'aUSDC', 'USDC'] },
  aUSDT: { address: '0xDAE5F1590db13E3B40423B5b5c5fbf175515910b', symbol: 'aUSDT', decimals: 6, coingeckoId: 'matic-aave-usdt', route: ['aUSDT', 'aUSDC', 'USDC'] },
  aAAVE: { address: '0x823CD4264C1b951C9209aD0DeAea9988fE8429bF', symbol: 'aAAVE', decimals: 18, coingeckoId: 'matic-aave-aave', route: ['aAAVE', 'aUSDC', 'USDC'] },
  aUNI: { address: '0x8c8bdBe9CeE455732525086264a4Bf9Cf821C498', symbol: 'aUNI', decimals: 18, coingeckoId: 'matic-aave-uni', route: ['aUNI', 'aUSDC', 'USDC'] },
  aYFI: { address: '0xe20f7d1f0eC39C4d5DB01f53554F2EF54c71f613', symbol: 'aYFI', decimals: 18, coingeckoId: 'matic-aave-yfi', route: ['aYFI', 'aUSDC', 'USDC'] },
  aLINK: { address: '0x98ea609569bD25119707451eF982b90E3eb719cD', symbol: 'aLINK', decimals: 18, coingeckoId: 'matic-aave-link', route: ['aLINK', 'aUSDC', 'USDC'] },
  aWETH: { address: '0x20D3922b4a1A8560E1aC99FBA4faDe0c849e2142', symbol: 'aWETH', decimals: 18, coingeckoId: 'matic-aave-weth', route: ['aWETH', 'aUSDC', 'USDC'] },
  GHST: { address: '0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7', symbol: 'GHST', decimals: 18, coingeckoId: 'aavegotchi', route: ['GHST', 'USDC'] },
  USDC: { address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', symbol: 'USDC', decimals: 6, coingeckoId: 'usd-coin', route: ['USDC', 'USDC'] },
}

export const tokenByAddress = address => Object.values(TOKENS).find(t => t.address === address);