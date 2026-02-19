import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const { address } = await req.json();

        if (!address) {
            return NextResponse.json({ error: "Address is required" }, { status: 400 });
        }

        const apiKeyId = process.env.COINBASE_API_KEY_ID;
        const apiSecret = process.env.COINBASE_API_SECRET;

        if (!apiKeyId || !apiSecret) {
            return NextResponse.json({ error: "Coinbase credentials not configured" }, { status: 500 });
        }

        // Create the JWT for Coinbase API authentication
        const now = Math.floor(Date.now() / 1000);
        const payload = {
            sub: apiKeyId,
            iss: "cdp",
            nbf: now,
            exp: now + 120,
            aud: ["retail_rest_api_proxy"],
        };

        const header = {
            alg: "ES256",
            kid: apiKeyId,
            nonce: crypto.randomBytes(16).toString("hex"),
            typ: "JWT",
        };

        // For Coinbase Onramp, we use initOnRamp directly with the project ID
        // Session tokens are optional until July 2025 deadline
        // For now, return the project configuration for client-side initOnRamp
        return NextResponse.json({
            appId: process.env.NEXT_PUBLIC_COINBASE_PROJECT_ID,
            address,
        });
    } catch (error) {
        console.error("Coinbase session error:", error);
        return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
    }
}
