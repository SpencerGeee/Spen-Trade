import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { offerSchema } from "@/lib/validations/offer";

import { logger } from "@/lib/logger";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const validatedData = offerSchema.parse(body);

        const dbUser = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (!dbUser) {
            return new NextResponse("User not found. Complete your profile first.", { status: 404 });
        }

        const offer = await prisma.offer.create({
            data: {
                userId: dbUser.id,
                type: validatedData.type,
                cryptocurrency: validatedData.cryptocurrency,
                fiatCurrency: validatedData.fiatCurrency,
                priceType: validatedData.priceType,
                priceMargin: validatedData.priceMargin,
                fixedPrice: validatedData.fixedPrice,
                minAmount: validatedData.minAmount,
                maxAmount: validatedData.maxAmount,
                paymentMethod: validatedData.paymentMethod,
                terms: validatedData.terms,
            },
        });

        return NextResponse.json(offer);
    } catch (error) {
        logger.error({ error }, "[OFFERS_POST]");
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type");
        const crypto = searchParams.get("crypto");
        const fiat = searchParams.get("fiat");

        const offers = await prisma.offer.findMany({
            where: {
                isActive: true,
                ...(type ? { type: type as any } : {}),
                ...(crypto ? { cryptocurrency: crypto } : {}),
                ...(fiat ? { fiatCurrency: fiat } : {}),
            },
            include: {
                user: {
                    select: {
                        username: true,
                        kycStatus: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
            take: 50,
        });

        return NextResponse.json(offers);
    } catch (error) {
        logger.error({ error }, "[OFFERS_GET]");
        return new NextResponse("Internal Error", { status: 500 });
    }
}
