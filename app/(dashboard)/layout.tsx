import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <main>{children}</main>
        </SessionProvider>
    );
}
export default DashboardLayout;
