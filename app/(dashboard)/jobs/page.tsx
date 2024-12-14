import { getAllJobsAction } from "@/actions/getAllJobsAction";

async function JobsPage() {
    const result = await getAllJobsAction({});

    console.log(result);

    return <h1 className="text-4xl">Jobs Page</h1>;
}
export default JobsPage;
