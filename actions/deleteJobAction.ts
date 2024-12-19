"use server";

import { db } from "@/lib/db";
import { Job } from "@prisma/client";
import { currentUser } from "@/utils/server-current-user/currentUser";

export async function deleteJobAction(
    id: string
): Promise<{ job: Job | null; success: string; error: string }> {
    const user = await currentUser();

    if (!user) {
        return { job: null, success: "", error: "Unauthorized" };
    }

    try {
        const job: Job = await db.job.delete({
            where: {
                id,
                userId: user.id,
            },
        });

        // return job;
        return { job: job, success: "Job application deleted", error: "" };
    } catch {
        // return null;
        return { job: null, success: "", error: "Something went wrong!" };
    }
}
