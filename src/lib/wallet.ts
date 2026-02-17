import { prisma } from "./prisma";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { logger } from "./logger";

export class WalletService {
    /**
     * Create a new wallet for a user if they don't have one.
     * Generates a new EVM-compatible private key and address.
     * In a production environment, private keys should be encrypted at rest (e.g., using AWS KMS or Vault).
     */
    static async getOrCreateWallet(userId: string) {
        try {
            const existingWallet = await prisma.wallet.findUnique({
                where: { userId },
            });

            if (existingWallet) {
                return existingWallet;
            }

            // Generate new account
            const privateKey = generatePrivateKey();
            const account = privateKeyToAccount(privateKey);

            const wallet = await prisma.wallet.create({
                data: {
                    userId,
                    address: account.address,
                    privateKey: privateKey, // WARNING: Store encrypted in production
                    balance: 0,
                    currency: "USD",
                },
            });

            logger.info(`[WALLET] Created new wallet for user ${userId}: ${account.address}`);
            return wallet;
        } catch (error) {
            logger.error({ error }, `[WALLET_CREATE_ERROR] User ID: ${userId}`);
            throw error;
        }
    }

    /**
     * Sync internal balance with on-chain balance.
     * This is a simplified version; in production, you'd use a listener or webhook.
     */
    static async syncBalance(userId: string, onChainBalance: number) {
        try {
            const wallet = await prisma.wallet.update({
                where: { userId },
                data: { balance: onChainBalance },
            });
            logger.info(`[WALLET] Synced balance for user ${userId} to ${onChainBalance}`);
            return wallet;
        } catch (error) {
            logger.error({ error }, `[WALLET_SYNC_ERROR] User ID: ${userId}`);
            throw error;
        }
    }
}
