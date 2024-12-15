"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";
import { JobStatus } from "@/types";

function JobSearchForm() {
    // Setting default values
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || "";
    const jobStatus = searchParams.get("jobStatus") || "all";

    const router = useRouter();
    const pathname = usePathname();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams();

        const formData = new FormData(e.currentTarget);
        const search = formData.get("search") as string;
        const jobStatus = formData.get("jobStatus") as string;

        params.set("search", search);
        params.set("jobStatus", jobStatus);

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <form
            className="bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3  gap-4 rounded-sm"
            onSubmit={handleSubmit}
        >
            <Input
                type="text"
                placeholder="Search Jobs"
                name="search"
                className="bg-background"
                defaultValue={search}
            />
            <Select defaultValue={jobStatus} name="jobStatus">
                <SelectTrigger className="bg-background">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {["all", ...Object.values(JobStatus)].map((jobStatus) => {
                        return (
                            <SelectItem key={jobStatus} value={jobStatus}>
                                {jobStatus}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
            <Button type="submit">Search</Button>
        </form>
    );
}
export default JobSearchForm;
