"use client";

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { WagmiProvider, State } from 'wagmi'
import { config, projectId } from '@/config/wagmi'
import React from 'react'

// Initialize Web3Modal
if (!projectId) throw new Error('Project ID is not defined')

createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true,
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
