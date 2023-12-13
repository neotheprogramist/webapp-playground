const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const sepolia = {
  chainId: 11155111,
  name: "Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: `https://eth-sepolia.g.alchemy.com/v2/${
    import.meta.env.PUBLIC_SEPOLIA_API_KEY
  }`,
};

const polygon = {
  chainId: 137,
  name: "Polygon",
  currency: "MATIC",
  explorerUrl: "https://polygonscan.com",
  rpcUrl: "https://polygon-rpc.com/",
};

export const metadata = {
  name: "webapp-playground-task",
  description: "Webapp playground task",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};

export const chains = [mainnet, sepolia, polygon];
