"use client";

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { WagmiProvider, State } from 'wagmi'
import { config, projectId } from '@/config/wagmi'
import React from 'react'

// Initialize Web3Modal with real WalletConnect project ID
createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: false,
    // @ts-ignore - AppKit v5 property
    features: {
        email: true,
        socials: ['google', 'x', 'github', 'discord', 'apple'],
        emailLinks: true,
        onramp: true,
    },
    themeMode: 'dark',
    themeVariables: {
        '--w3m-accent': '#856D47',
    }
})

export function Web3ModalProvider({
    children,
    initialState
}: {
    children: React.ReactNode
    initialState?: State
}) {
    return (
        <WagmiProvider config={config} initialState={initialState}>
            {children}
        </WagmiProvider>
    )
}
