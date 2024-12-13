import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/Sonner";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
    title: "JobTally",
    description: "Job application tracker",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <html lang="en" suppressHydrationWarning>
                <body>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Toaster />
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </SessionProvider>
    );
}
