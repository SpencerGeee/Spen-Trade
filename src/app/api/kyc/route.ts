import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { kycSchema } from "@/lib/validations/kyc";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const validatedData = kycSchema.parse(body);

        // Check if user exists in our DB, if not sync them (idempotent)
        // In a real app, we'd use webhooks to sync Clerk users, but for MVP we can do lazily
        const dbUser = await prisma.user.upsert({
            where: { clerkId: userId },
            update: {},
            create: {
                clerkId: userId,
                email: user.emailAddresses[0].emailAddress,
                username: user.username,
            }
        });

        // Create or Update KYC record
        const kyc = await prisma.kyc.upsert({
            where: { userId: dbUser.id },
            update: {
                firstName: validatedData.firstName,
                lastName: validatedData.lastName,
                dob: new Date(validatedData.dateOfBirth),
                country: validatedData.country,
                documentType: validatedData.documentType,
                documentUrl: validatedData.documentUrl || "mock_url",
                status: "PENDING"
            },
            create: {
                userId: dbUser.id,
                firstName: validatedData.firstName,
                lastName: validatedData.lastName,
                dob: new Date(validatedData.dateOfBirth),
                country: validatedData.country,
                documentType: validatedData.documentType,
                documentUrl: validatedData.documentUrl || "mock_url",
                status: "PENDING"
            }
        });

        // Update user status
        await prisma.user.update({
            where: { id: dbUser.id },
            data: { kycStatus: "PENDING" }
        });

        return NextResponse.json(kyc);
    } catch (error) {
        console.error("[KYC_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
