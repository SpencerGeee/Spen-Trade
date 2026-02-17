import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors'

export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'dummy_id'

export const config = createConfig({
    chains: [mainnet, sepolia],
    connectors: [
        injected(),
        walletConnect({ projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '' }),
        coinbaseWallet({ appName: 'SpenTrade' }),
    ],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
})
