"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createAndEditJobSchema } from "@/schemas";

import { JobStatus, JobMode } from "@/types";

import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";

import {
    CustomFormInput,
    CustomFormSelect,
} from "@/components/dashboard/CustomFormInputs";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import { getSingleJobAction } from "@/actions/getSingleJobAction";
import { updateJobAction } from "@/actions/updateJobAction";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { notFound } from "next/navigation";

function EditJobForm({ jobId }: { jobId: string }) {
    const queryClient = useQueryClient();
    const router = useRouter();

    // Accessing prefetched data
    const { data } = useQuery({
        queryKey: ["job", jobId],
        queryFn: () => getSingleJobAction(jobId),
    });

    // Updating the job
    const { mutate, isPending } = useMutation({
        mutationFn: (values: z.infer<typeof createAndEditJobSchema>) =>
            updateJobAction(jobId, values),
        onSuccess: (data) => {
            if (!data.job) {
                toast(data.error);
                return;
            }
            toast(data.success);

            queryClient.invalidateQueries({ queryKey: ["jobs"] });
            queryClient.invalidateQueries({ queryKey: ["job", jobId] });
            queryClient.invalidateQueries({ queryKey: ["stats"] });

            router.push("/jobs");
            // form.reset();
        },
    });

    // Defining the form
    const form = useForm<z.infer<typeof createAndEditJobSchema>>({
        resolver: zodResolver(createAndEditJobSchema),
        defaultValues: {
            position: data?.job?.position || "",
            company: data?.job?.company || "",
            location: data?.job?.location || "",
            status: (data?.job?.status as JobStatus) || JobStatus.Pending,
            mode: (data?.job?.mode as JobMode) || JobMode.FullTime,
        },
    });

    // Submit handler
    function onSubmit(values: z.infer<typeof createAndEditJobSchema>) {
        mutate(values);
    }

    if (!data?.job) {
        return notFound();
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-muted p-8 rounded"
            >
                <h2 className="capitalize font-semibold text-4xl mb-6">
                    edit job
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
                    {/* position */}
                    <CustomFormInput name="position" control={form.control} />
                    {/* company */}
                    <CustomFormInput name="company" control={form.control} />
                    {/* location */}
                    <CustomFormInput name="location" control={form.control} />

                    {/* job status */}
                    <CustomFormSelect
                        name="status"
                        control={form.control}
                        labelText="job status"
                        items={Object.values(JobStatus)}
                    />
                    {/* job  type */}
                    <CustomFormSelect
                        name="mode"
                        control={form.control}
                        labelText="job mode"
                        items={Object.values(JobMode)}
                    />

                    <Button
                        type="submit"
                        className="self-end capitalize"
                        disabled={isPending}
                    >
                        {isPending ? "updating..." : "edit job"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
export default EditJobForm;
