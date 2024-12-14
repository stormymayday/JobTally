export type JobType = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    position: string;
    company: string;
    location: string;
    status: string;
    mode: string;
};

export enum JobStatus {
    Pending = "pending",
    Interview = "interview",
    Declined = "declined",
}

export enum JobMode {
    FullTime = "full-time",
    PartTime = "part-time",
    Internship = "internship",
}
