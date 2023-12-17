import { defaultWagmiConfig, createWeb3Modal } from "@web3modal/wagmi";
import { arbitrum, polygon, goerli, mainnet, sepolia } from "viem/chains";

const projectId = import.meta.env.PUBLIC_WC_PROJECT_ID;

export const metadata = {
  name: "webapp-playground-task",
  description: "Webapp playground task",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};
export const chains = [mainnet, arbitrum, polygon, sepolia, goerli];

export const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
export const modal = createWeb3Modal({ wagmiConfig, projectId, chains });
