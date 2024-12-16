"use client";

import { useQuery } from "@tanstack/react-query";
import { getStatsAction } from "@/actions/getStatsAction";
import StatsCard from "@/components/dashboard/StatsCard";

function StatsContainer() {
    const { data } = useQuery({
        queryKey: ["stats"],
        queryFn: () => getStatsAction(),
    });

    return (
        <section className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
            <StatsCard title="pending jobs" value={data?.pending || 0} />
            <StatsCard title="interviews set" value={data?.interview || 0} />
            <StatsCard title="jobs declined" value={data?.declined || 0} />
        </section>
    );
}
export default StatsContainer;
