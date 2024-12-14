"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createAndEditJobSchema } from "@/schemas";

import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import { JobStatus, JobMode } from "@/types";
import {
    CustomFormInput,
    CustomFormSelect,
} from "@/components/CustomFormInputs";

function CreateJobForm() {
    // Form instance
    const form = useForm<z.infer<typeof createAndEditJobSchema>>({
        resolver: zodResolver(createAndEditJobSchema),
        defaultValues: {
            position: "",
            company: "",
            location: "",
            status: JobStatus.Pending,
            mode: JobMode.FullTime,
        },
    });

    function onSubmit(values: z.infer<typeof createAndEditJobSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-muted p-8 rounded"
            >
                <h2 className="capitalize font-semibold text-4xl mb-6">
                    add job
                </h2>
                {/* Grid Layout */}
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

                    <Button type="submit" className="self-end capitalize">
                        create job
                    </Button>
                </div>
            </form>
        </Form>
    );
}
export default CreateJobForm;
