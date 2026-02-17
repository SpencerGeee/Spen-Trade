import { prisma } from "./prisma";
import { logger } from "./logger";

export type EscrowStatus =
    | "CREATED"
    | "FUNDED"
    | "RELEASED"
    | "REFUNDED"
    | "DISPUTED"
    | "EXPIRED";

export class EscrowService {
    /**
     * Lock funds into escrow for a trade.
     * Updates the trade status in DB.
     * In testnet mode, this would deploy/call a smart contract.
     */
    static async lockFunds(tradeId: string) {
        try {
            const trade = await prisma.trade.update({
                where: { id: tradeId },
                data: {
                    status: "ESCROW_LOCKED",
                    updatedAt: new Date(),
                },
            });

            logger.info(`[ESCROW] Locked funds for trade ${tradeId}`);
            return trade;
        } catch (error) {
            logger.error({ error }, `[ESCROW_LOCK_ERROR] Trade ID: ${tradeId}`);
            throw error;
        }
    }

    /**
     * Release escrowed funds to the seller.
     * Called when buyer confirms payment received.
     */
    static async releaseFunds(tradeId: string) {
        try {
            const trade = await prisma.trade.update({
                where: { id: tradeId },
                data: {
                    status: "COMPLETED",
                    updatedAt: new Date(),
                },
            });

            logger.info(`[ESCROW] Released funds for trade ${tradeId}`);
            return trade;
        } catch (error) {
            logger.error({ error }, `[ESCROW_RELEASE_ERROR] Trade ID: ${tradeId}`);
            throw error;
        }
    }

    /**
     * Refund escrowed funds back to the buyer.
     * Called on cancellation or dispute resolution in buyer's favor.
     */
    static async refundFunds(tradeId: string) {
        try {
            const trade = await prisma.trade.update({
                where: { id: tradeId },
                data: {
                    status: "CANCELLED",
                    updatedAt: new Date(),
                },
            });

            logger.info(`[ESCROW] Refunded funds for trade ${tradeId}`);
            return trade;
        } catch (error) {
            logger.error({ error }, `[ESCROW_REFUND_ERROR] Trade ID: ${tradeId}`);
            throw error;
        }
    }

    /**
     * Mark trade as disputed.
     */
    static async disputeTrade(tradeId: string) {
        try {
            const trade = await prisma.trade.update({
                where: { id: tradeId },
                data: {
                    status: "DISPUTE",
                    updatedAt: new Date(),
                },
            });

            logger.info(`[ESCROW] Dispute opened for trade ${tradeId}`);
            return trade;
        } catch (error) {
            logger.error({ error }, `[ESCROW_DISPUTE_ERROR] Trade ID: ${tradeId}`);
            throw error;
        }
    }
}
