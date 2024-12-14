import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
// import LinksDropdown from "@/components/dashboard/LinksDropdown";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <main className="grid lg:grid-cols-5">
                {/* first column is hidden on small screen */}
                <div className="hidden lg:block lg:col-span-1 lg:min-h-screen">
                    <Sidebar />
                </div>

                {/* second column: hide the dropdown on big screen */}
                <div className="lg:col-span-4">
                    <Navbar />

                    <div className="py-16 px-4 sm:px-8 lg:px-16">
                        {children}
                    </div>
                </div>
            </main>
        </SessionProvider>
    );
}
export default DashboardLayout;
