import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { ratelimit } from "@/lib/rate-limit";

const isPublicRoute = createRouteMatcher([
    "/",
    "/login(.*)",
    "/register(.*)",
    "/about",
    "/contact",
    "/news",
    "/offers",
    "/trade(.*)",
]);

const isApiRoute = createRouteMatcher(["/api/(.*)"]);

export default clerkMiddleware(async (auth: any, request: NextRequest) => {
    // 1. Rate Limiting for API routes
    if (isApiRoute(request)) {
        try {
            const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
            const { success } = await ratelimit.limit(ip);
            if (!success) {
                return new NextResponse("Too Many Requests", { status: 429 });
            }
        } catch (e) {
            // Fallback if Redis is down/misconfigured to avoid blocking production
            console.error("Rate limit error:", e);
        }
    }

    // 2. Auth Protection
    if (!isPublicRoute(request)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
