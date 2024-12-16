import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";

import { Skeleton } from "@/components/ui/skeleton";

interface StatsCardsProps {
    title: string;
    value: number;
}

function StatsCard({ title, value }: StatsCardsProps) {
    return (
        <Card className="bg-muted">
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="capitalize">{title}</CardTitle>
                <CardDescription className="text-4xl font-extrabold text-primary mt-[0px!important]">
                    {value}
                </CardDescription>
            </CardHeader>
        </Card>
    );
}

export function StatsSkeletonCard() {
    return (
        <Card className="bg-muted">
            <CardHeader className="flex flex-row justify-between items-center">
                <div className="w-full flex items-center justify-between">
                    <div className="space-y-2">
                        {/* <Skeleton className="h-4 w-[10rem]" /> */}
                        <Skeleton className="h-4 w-[5rem]" />
                    </div>
                    <Skeleton className="h-12 w-12 rounded-full" />
                </div>
            </CardHeader>
        </Card>
    );
}

export default StatsCard;
