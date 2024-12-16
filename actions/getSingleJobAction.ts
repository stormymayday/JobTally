"use server";

import { db } from "@/lib/db";
import { Job } from "@prisma/client";
import { currentUser } from "@/utils/server-current-user/currentUser";

export async function getSingleJobAction(
    id: string
): Promise<{ job: Job | null; success: string; error: string }> {
    const user = await currentUser();

    if (!user) {
        return { job: null, success: "", error: "Unauthorized" };
    }

    let job: Job | null = null;

    try {
        job = await db.job.findUnique({
            where: {
                id,
                userId: user.id,
            },
        });

        if (job) {
            return { job: job, success: "Job fetched", error: "" };
        } else {
            return { job: null, success: "", error: "Failed to fetch the job" };
        }
    } catch {
        return { job: null, success: "", error: "Something went wrong" };
    }
}
