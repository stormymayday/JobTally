import { Job } from "@prisma/client";

interface JobCardProps {
    job: Job;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function JobCard({ job }: JobCardProps) {
    return <h1 className="text-4xl">Job Card</h1>;
}
export default JobCard;
