import { getStatsAction } from "@/actions/getStatsAction";
import { getChartsDataAction } from "@/actions/getChartsDataAction";
import StatsContainer from "@/components/dashboard/StatsContainer";
import ChartsContainer from "@/components/dashboard/ChartsContainer";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";

async function StatsPage() {
    const queryClient = new QueryClient();

    // Prefetching stats
    await queryClient.prefetchQuery({
        queryKey: ["stats"],
        queryFn: () => getStatsAction(),
    });

    // Prefetching chart data
    await queryClient.prefetchQuery({
        queryKey: ["charts"],
        queryFn: () => getChartsDataAction(),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <StatsContainer />
            <ChartsContainer />
        </HydrationBoundary>
    );
}
export default StatsPage;
