import { StatsSkeletonCard } from "@/components/dashboard/StatsCard";

function loading() {
    return (
        <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
            <StatsSkeletonCard />
            <StatsSkeletonCard />
            <StatsSkeletonCard />
        </div>
    );
}
export default loading;
