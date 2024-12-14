import { getAllJobsAction } from "@/actions/getAllJobsAction";
import JobList from "@/components/dashboard/JobList";
import JobSearchForm from "@/components/dashboard/JobSearchForm";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";

async function JobsPage() {
    const queryClient = new QueryClient();

    // Prefetching all jobs for a specific user
    await queryClient.prefetchQuery({
        // queryKey contains default values
        queryKey: ["jobs", "", "all", 1],
        queryFn: () => getAllJobsAction({}),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <JobSearchForm />
            <JobList />
        </HydrationBoundary>
    );
}
export default JobsPage;
