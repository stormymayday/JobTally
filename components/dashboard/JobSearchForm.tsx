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
    // Invoking useSearchParams to have access to the query parameters in the URL
    const searchParams = useSearchParams();

    // Accessing the router object
    const router = useRouter();

    // Accessing the current path of the URL
    const pathname = usePathname();

    // Accessing searchParams in the URL (if they exist) and setting them as form input values
    // Otherwise, setting default values
    const search = searchParams.get("search") || "";
    const jobStatus = searchParams.get("jobStatus") || "all";

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // New URLSearchParams instance
        const params = new URLSearchParams();

        // Accessing FormData and grabbing the values
        const formData = new FormData(e.currentTarget);
        const search = formData.get("search") as string;
        const jobStatus = formData.get("jobStatus") as string;

        // Setting urlParams using the formData values
        params.set("search", search);
        params.set("jobStatus", jobStatus);

        // Navigating to the same page appending params in the URL
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
