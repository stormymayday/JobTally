"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";

function ErrorPage() {
    return (
        <section className="h-[60vh] flex flex-col gap-y-5 items-center justify-center">
            <h1 className="font-bold text-3xl text-center">
                Oops! Something went wrong!
            </h1>
            <Link href="/jobs" className={buttonVariants()}>
                Back to Jobs
            </Link>
        </section>
    );
}
export default ErrorPage;
