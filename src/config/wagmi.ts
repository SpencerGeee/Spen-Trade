import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

// 1. Get projectId from https://cloud.walletconnect.com
export const projectId = 'YOUR_PROJECT_ID' // Replace in production

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
    name: 'SpenTrade',
    description: 'Enterprise P2P Crypto Trading',
    url: 'https://spentrade.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// 2. Create wagmiConfig
const chains = [mainnet, sepolia] as const
export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    storage: createStorage({
        storage: cookieStorage
    }),
})
