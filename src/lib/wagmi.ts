import { createConfig, http } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
    metaMaskWallet,
    walletConnectWallet,
    rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets';

const projectId = 'YOUR_PROJECT_ID';
const appName = 'TEST'

const connectors = connectorsForWallets([
    {
        groupName: 'Recommended',
        wallets: [
            metaMaskWallet,
            walletConnectWallet,
            rainbowWallet,
        ],
    },
], { appName: appName, projectId: projectId });

export const config = createConfig({
    chains: [mainnet, polygon, optimism, arbitrum],
    connectors,
    transports: {
        [mainnet.id]: http(),
        [polygon.id]: http(),
        [optimism.id]: http(),
        [arbitrum.id]: http(),
    },
    ssr: true,
});

declare module 'wagmi' {
    interface Register {
        config: typeof config;
    }
}