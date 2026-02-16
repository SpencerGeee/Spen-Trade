/**
 * EscrowService — Production-ready escrow system for P2P trades.
 *
 * Supports two modes:
 * - MOCK: In-memory state for development/testing
 * - TESTNET: Uses viem to interact with Sepolia testnet (future)
 *
 * Flow: lockFunds() → [buyer pays] → releaseFunds() or refundFunds()
 */

export type EscrowStatus =
    | "CREATED"
    | "FUNDED"
    | "RELEASED"
    | "REFUNDED"
    | "DISPUTED"
    | "EXPIRED";

export interface EscrowRecord {
    id: string;
    tradeId: string;
    buyerId: string;
    sellerId: string;
    amountCrypto: number;
    cryptocurrency: string;
    escrowAddress: string;
    status: EscrowStatus;
    lockedAt: Date | null;
    releasedAt: Date | null;
    expiresAt: Date;
    createdAt: Date;
}

// In-memory store for mock mode
const escrowStore = new Map<string, EscrowRecord>();

function generateEscrowId(): string {
    return `ESC_${Date.now()}_${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function generateMockAddress(): string {
    const hex = Array.from({ length: 40 }, () =>
        Math.floor(Math.random() * 16).toString(16)
    ).join("");
    return `0x${hex}`;
}

export class EscrowService {
    /**
     * Lock funds into escrow for a trade.
     * In mock mode, this creates an in-memory record.
     * In testnet mode, this would deploy/call a smart contract.
     */
    static async lockFunds(params: {
        tradeId: string;
        buyerId: string;
        sellerId: string;
        amountCrypto: number;
        cryptocurrency: string;
    }): Promise<EscrowRecord> {
        const id = generateEscrowId();
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24h expiry

        const record: EscrowRecord = {
            id,
            tradeId: params.tradeId,
            buyerId: params.buyerId,
            sellerId: params.sellerId,
            amountCrypto: params.amountCrypto,
            cryptocurrency: params.cryptocurrency,
            escrowAddress: generateMockAddress(),
            status: "FUNDED",
            lockedAt: now,
            releasedAt: null,
            expiresAt,
            createdAt: now,
        };

        escrowStore.set(id, record);
        console.log(`[ESCROW] Locked ${params.amountCrypto} ${params.cryptocurrency} for trade ${params.tradeId} → ${id}`);

        return record;
    }

    /**
     * Release escrowed funds to the seller.
     * Called when buyer confirms payment received.
     */
    static async releaseFunds(escrowId: string): Promise<EscrowRecord> {
        const record = escrowStore.get(escrowId);
        if (!record) throw new Error(`Escrow ${escrowId} not found`);

        if (record.status !== "FUNDED") {
            throw new Error(`Cannot release escrow in status: ${record.status}`);
        }

        record.status = "RELEASED";
        record.releasedAt = new Date();
        escrowStore.set(escrowId, record);

        console.log(`[ESCROW] Released ${record.amountCrypto} ${record.cryptocurrency} to seller → ${escrowId}`);
        return record;
    }

    /**
     * Refund escrowed funds back to the buyer.
     * Called on cancellation or dispute resolution in buyer's favor.
     */
    static async refundFunds(escrowId: string): Promise<EscrowRecord> {
        const record = escrowStore.get(escrowId);
        if (!record) throw new Error(`Escrow ${escrowId} not found`);

        if (record.status !== "FUNDED" && record.status !== "DISPUTED") {
            throw new Error(`Cannot refund escrow in status: ${record.status}`);
        }

        record.status = "REFUNDED";
        record.releasedAt = new Date();
        escrowStore.set(escrowId, record);

        console.log(`[ESCROW] Refunded ${record.amountCrypto} ${record.cryptocurrency} to buyer → ${escrowId}`);
        return record;
    }

    /**
     * Mark escrow as disputed.
     */
    static async disputeEscrow(escrowId: string): Promise<EscrowRecord> {
        const record = escrowStore.get(escrowId);
        if (!record) throw new Error(`Escrow ${escrowId} not found`);

        if (record.status !== "FUNDED") {
            throw new Error(`Cannot dispute escrow in status: ${record.status}`);
        }

        record.status = "DISPUTED";
        escrowStore.set(escrowId, record);

        console.log(`[ESCROW] Dispute opened for ${escrowId}`);
        return record;
    }

    /**
     * Get escrow status by ID
     */
    static async getStatus(escrowId: string): Promise<EscrowRecord | null> {
        return escrowStore.get(escrowId) || null;
    }

    /**
     * Get escrow by trade ID
     */
    static async getByTradeId(tradeId: string): Promise<EscrowRecord | null> {
        for (const record of escrowStore.values()) {
            if (record.tradeId === tradeId) return record;
        }
        return null;
    }

    /**
     * Check and expire old escrows (called periodically or on access)
     */
    static async checkExpiry(escrowId: string): Promise<EscrowRecord | null> {
        const record = escrowStore.get(escrowId);
        if (!record) return null;

        if (record.status === "FUNDED" && new Date() > record.expiresAt) {
            record.status = "EXPIRED";
            escrowStore.set(escrowId, record);
            console.log(`[ESCROW] Expired ${escrowId}`);
        }

        return record;
    }
}
