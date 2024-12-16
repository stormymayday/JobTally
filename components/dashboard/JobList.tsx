"use client";

import JobCard from "@/components/dashboard/JobCard";
import { useSearchParams } from "next/navigation";
import { getAllJobsAction } from "@/actions/getAllJobsAction";
import { useQuery } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";
import ButtonContainer from "@/components/dashboard/ButtonContainer";

function JobsList() {
    // Invoking useSearchParams to have access to the query parameters in the URL
    const searchParams = useSearchParams();

    // Accessing searchParams in the URL (if they exist)
    // Otherwise, setting default values
    const search = searchParams.get("search") || "";
    const jobStatus = searchParams.get("jobStatus") || "all";
    const pageNumber = Number(searchParams.get("page")) || 1;

    // React Query functionality
    const { data, isPending } = useQuery({
        queryKey: ["jobs", search ?? "", jobStatus, pageNumber],
        queryFn: () =>
            getAllJobsAction({ search, jobStatus, page: pageNumber }),
    });

    // Extracting jobs if they exist. Otherwise, providing an empty array
    const jobs = data?.jobs || [];

    const count = data?.count || 0;
    const page = data?.page || 0;
    const totalPages = data?.totalPages || 0;

    // Loading
    if (isPending) {
        return (
            <section className="flex items-center justify-center">
                <BeatLoader color="hsl(var(--muted-foreground))" />
            </section>
        );
    }

    // No Jobs
    if (jobs.length < 1) return <h2 className="text-xl">No Jobs Found...</h2>;

    return (
        <>
            {/* pagination container  */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold capitalize">
                    {count} jobs found
                </h2>
                {totalPages < 2 ? null : (
                    <ButtonContainer
                        currentPage={page}
                        totalPages={totalPages}
                    />
                )}
            </div>

            <div className="grid md:grid-cols-2  gap-8">
                {jobs.map((job) => {
                    return <JobCard key={job.id} job={job} />;
                })}
            </div>
        </>
    );
}
export default JobsList;
