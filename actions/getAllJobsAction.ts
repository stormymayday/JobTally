"use server";

// import * as z from "zod";
import { db } from "@/lib/db";
// import { createAndEditJobSchema } from "@/schemas";
import { Job, Prisma } from "@prisma/client";
import { currentUser } from "@/utils/server-current-user/currentUser";

type getAllJobsActionType = {
    search?: string;
    jobStatus?: string;
    page?: number;
    limit?: number;
};

export async function getAllJobsAction({
    search = "",
    jobStatus = "all",
    page = 1,
    limit = 10,
}: getAllJobsActionType): Promise<{
    jobs: Job[];
    count: number;
    page: number;
    totalPages: number;
    successMessage: string;
    errorMessage: string;
}> {
    const user = await currentUser();

    if (!user) {
        return {
            jobs: [],
            count: 0,
            page: 1,
            totalPages: 0,
            successMessage: "",
            errorMessage: "Unauthorized",
        };
    }

    try {
        // Constructing where clause:
        // 1. attaching the use ID
        let whereClause: Prisma.JobWhereInput = {
            userId: user.id,
        };

        // 2. If the search term was provided, check if position or company contains it
        if (search) {
            whereClause = {
                ...whereClause,
                OR: [
                    {
                        position: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        company: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                ],
            };
        }

        // 3. Checking job status if it was provided and is not equal to 'all'
        if (jobStatus && jobStatus !== "all") {
            whereClause = {
                ...whereClause,
                status: jobStatus,
            };
        }

        const skip = (page - 1) * limit;

        const jobs: Job[] = await db.job.findMany({
            where: whereClause,
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc",
            },
        });

        // Getting number of jobs based on whereClause
        const count: number = await db.job.count({
            where: whereClause,
        });

        // Calculating total number of pages
        const totalPages = Math.ceil(count / limit);

        return {
            jobs: jobs,
            count: count,
            page: page,
            totalPages: totalPages,
            successMessage: "Jobs fetched",
            errorMessage: "",
        };
    } catch {
        return {
            jobs: [],
            count: 0,
            page: 1,
            totalPages: 0,
            successMessage: "",
            errorMessage: "Failed to fetch the jobs",
        };
    }
}
