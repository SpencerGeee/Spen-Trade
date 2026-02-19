import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { mainnet, sepolia, bsc, polygon, arbitrum, optimism, base } from 'wagmi/chains'

export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;

if (!projectId) {
    throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not defined');
}

const metadata = {
    name: 'SpenTrade',
    description: 'P2P Crypto Trading Platform',
    url: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export const config = defaultWagmiConfig({
    chains: [mainnet, sepolia, bsc, polygon, arbitrum, optimism, base],
    projectId,
    metadata,
    ssr: true,
})
