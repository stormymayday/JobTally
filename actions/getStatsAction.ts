"use server";

import { currentUser } from "@/utils/server-current-user/currentUser";
import { db } from "@/lib/db";

export async function getStatsAction(): Promise<{
    pending: number;
    interview: number;
    declined: number;
    success: string;
    error: string;
}> {
    const user = await currentUser();

    if (!user) {
        return {
            pending: 0,
            interview: 0,
            declined: 0,
            success: "",
            error: "Unauthorized",
        };
    }
    // just to show Skeleton
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    try {
        const stats = await db.job.groupBy({
            by: ["status"],
            _count: {
                status: true,
            },
            where: {
                userId: user.id,
            },
        });

        const statsObject = stats.reduce((acc, curr) => {
            acc[curr.status] = curr._count.status;
            return acc;
        }, {} as Record<string, number>);

        return {
            pending: 0,
            interview: 0,
            declined: 0,
            ...statsObject,
            success: "Stats fetched successfully",
            error: "",
        };
    } catch {
        return {
            pending: 0,
            interview: 0,
            declined: 0,
            success: "",
            error: "Failed to fetch the stats",
        };
    }
}
