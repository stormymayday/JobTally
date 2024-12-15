import { Job } from "@prisma/client";
import Link from "next/link";
// import { MapPin, Briefcase, CalendarDays, RadioTower } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/Button";
// import { Badge } from "@/components/ui/Badge";

// import JobInfo from "@/components/dashboard/JobInfo";
import DeleteJobButton from "@/components/dashboard/DeleteJobButton";

interface JobCardProps {
    job: Job;
}
function JobCard({ job }: JobCardProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const date = new Date(job.createdAt).toLocaleDateString();

    return (
        <Card className="bg-muted">
            <CardHeader>
                <CardTitle>{job.position}</CardTitle>
                <CardDescription>{job.company}</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent>{/* card info */}</CardContent>
            <CardFooter className="flex gap-4">
                <Button asChild size="sm">
                    <Link href={`/jobs/${job.id}`}>edit</Link>
                </Button>
                <DeleteJobButton />
            </CardFooter>
        </Card>
    );
}
export default JobCard;
