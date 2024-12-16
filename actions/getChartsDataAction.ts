"use server";

import { currentUser } from "@/utils/server-current-user/currentUser";
import { db } from "@/lib/db";
import dayjs from "dayjs";

export async function getChartsDataAction(): Promise<{
    applicationsPerMonth: Array<{ date: string; count: number }>;
    success: string;
    error: string;
}> {
    const user = await currentUser();

    if (!user) {
        return {
            applicationsPerMonth: [],
            success: "",
            error: "Unauthorized",
        };
    }

    const sixMonthsAgo = dayjs().subtract(6, "month").toDate();

    try {
        const jobs = await db.job.findMany({
            where: {
                userId: user.id,
                createdAt: {
                    gte: sixMonthsAgo,
                },
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        const applicationsPerMonth = jobs.reduce((acc, job) => {
            const date = dayjs(job.createdAt).format("MMM YY");

            const existingEntry = acc.find((entry) => entry.date === date);

            // Checking if an entry exists in the array
            if (existingEntry) {
                // Incrementing count
                existingEntry.count += 1;
            } else {
                // Creating new entry
                acc.push({ date, count: 1 });
            }

            return acc;
        }, [] as Array<{ date: string; count: number }>);

        // return applicationsPerMonth;
        return {
            applicationsPerMonth: applicationsPerMonth,
            success: "chart data fetched successfully",
            error: "",
        };
    } catch {
        // redirect("/jobs");
        return {
            applicationsPerMonth: [],
            success: "",
            error: "Failed to fetch chart data",
        };
    }
}
