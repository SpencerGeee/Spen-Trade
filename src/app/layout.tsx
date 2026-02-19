import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/providers/QueryProvider";
import { Web3ModalProvider } from "@/context/Web3Modal";

export const metadata: Metadata = {
  title: {
    template: "%s || SpenTrade",
    default: "SpenTrade",
  },
  description: "Secure, luxurious, and efficient P2P cryptocurrency trading platform.",
};

import { ClientLayout } from "@/components/client-layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <Web3ModalProvider>
        <QueryProvider>
          <html lang="en" suppressHydrationWarning>
            <head>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
              <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Jost:ital,wght@0,100..900;1,100..900&family=Nixie+One&family=Montserrat:wght@400..900&family=Fauna+One&family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap" rel="stylesheet" />
              <style>{`
                :root {
                  --font-playfair: 'Playfair Display', serif;
                  --font-jost: 'Jost', sans-serif;
                  --font-nixie: 'Nixie One', cursive;
                  --font-montserrat: 'Montserrat', sans-serif;
                  --font-fauna: 'Fauna One', serif;
                  --font-garamond: 'EB Garamond', serif;
                }
              `}</style>
            </head>
            <body
              className={cn(
                "min-h-screen bg-background font-sans antialiased flex flex-col"
              )}
            >
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <Navbar />
                <main className="flex-1 flex flex-col">
                  <ClientLayout>{children}</ClientLayout>
                </main>
                <Footer />
              </ThemeProvider>
            </body>
          </html>
        </QueryProvider>
      </Web3ModalProvider>
    </ClerkProvider>
  );
}
