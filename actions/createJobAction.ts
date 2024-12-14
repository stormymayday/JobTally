"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { createAndEditJobSchema } from "@/schemas";
import { Job } from "@prisma/client";
import { currentUser } from "@/utils/server-current-user/currentUser";

export async function createJobAction(
    values: z.infer<typeof createAndEditJobSchema>
): Promise<{ job: Job | null; success: string; error: string }> {
    const user = await currentUser();

    if (!user) {
        return { job: null, success: "", error: "Unauthorized" };
    }

    const validatedFields = createAndEditJobSchema.safeParse(values);

    // Checking if the fields are valid
    if (!validatedFields.success) {
        return { job: null, success: "", error: "Invalid fields" };
    }

    // Extracting validated fields
    const { company, location, mode, position, status } = validatedFields.data;

    try {
        const job: Job = await db.job.create({
            data: {
                position,
                company,
                location,
                status,
                mode,
                user: {
                    // Connecting to user via userId
                    connect: { id: user.id },
                },
            },
        });
        return { job: job, success: "Job created successfully.", error: "" };
    } catch {
        return {
            job: null,
            success: "",
            error: "Failed to create job. Please try again.",
        };
    }
}
