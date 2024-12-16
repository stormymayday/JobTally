import { getStatsAction } from "@/actions/getStatsAction";

async function StatsPage() {
    const response = await getStatsAction();

    console.log(response);

    return <h1 className="text-4xl">StatsPage</h1>;
}
export default StatsPage;
