import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { ratelimit } from "@/lib/rate-limit";
import { createServerClient } from "@supabase/ssr";

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
    // 1. Supabase Session Management (Inlined to resolve build issues)
    let supabaseResponse = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        },
    );

    // Refresh token if expired
    await supabase.auth.getUser();

    // 2. Rate Limiting for API routes
    if (isApiRoute(request) && ratelimit) {
        try {
            const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
            const { success } = await ratelimit.limit(ip);
            if (!success) {
                return new NextResponse("Too Many Requests", { status: 429 });
            }
        } catch (e: any) {
            // Silently fail-open if Redis is unreachable (common in restricted environments)
            if (e?.message?.includes('fetch failed')) {
                // Ignore fetch errors to avoid log spam
            } else {
                console.error("Rate limit error:", e);
            }
        }
    }

    // 3. Auth Protection & Redirects
    const { userId } = await auth();

    // Redirect authenticated users away from login/register
    if (userId && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register'))) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (!isPublicRoute(request)) {
        await auth.protect();
    }

    return supabaseResponse;
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
