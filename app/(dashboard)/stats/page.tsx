// import { getStatsAction } from "@/actions/getStatsAction";
import { getChartsDataAction } from "@/actions/getChartsDataAction";

async function StatsPage() {
    // const response = await getStatsAction();
    const charts = await getChartsDataAction();

    console.log(charts);

    return <h1 className="text-4xl">StatsPage</h1>;
}
export default StatsPage;
