// import Link from "next/link";
// import { buttonVariants } from "@/components/ui/Button";
import { getSingleJobAction } from "@/actions/getSingleJobAction";
// import { notFound } from "next/navigation";

import EditJobForm from "@/components/dashboard/EditJobForm";

import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";

type Params = Promise<{ id: string }>;

interface SingleJobPageProps {
    params: Params;
}

async function SingleJobPage({ params }: SingleJobPageProps) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // const { job } = await getSingleJobAction(id);

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["job", id],
        queryFn: () => getSingleJobAction(id),
    });

    // return (
    //     <div>
    //         <Link href="/jobs" className={`${buttonVariants()} mb-8`}>
    //             Back to Jobs
    //         </Link>

    //         <h1>
    //             Single Job Page: {job.position} at {job.company}
    //         </h1>
    //     </div>
    // );
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <EditJobForm jobId={id} />
        </HydrationBoundary>
    );
}
export default SingleJobPage;
