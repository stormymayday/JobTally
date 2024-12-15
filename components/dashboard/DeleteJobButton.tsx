import { Button } from "@/components/ui/Button";
// import { Badge } from "@/components/ui/badge";
// import JobInfo from "@/components/dashboard/JobInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJobAction } from "@/actions/deleteJobAction";
import { toast } from "sonner";

interface DeleteJobBtnProps {
    id: string;
}

function DeleteJobBtn({ id }: DeleteJobBtnProps) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => deleteJobAction(id),
        onSuccess: (data) => {
            if (!data.job) {
                toast(data.error);
                return;
            }

            queryClient.invalidateQueries({ queryKey: ["jobs"] });
            queryClient.invalidateQueries({ queryKey: ["stats"] });
            queryClient.invalidateQueries({ queryKey: ["charts"] });

            toast(data.success);
        },
    });
    return (
        <Button
            size="sm"
            disabled={isPending}
            onClick={() => {
                mutate(id);
            }}
        >
            {isPending ? "deleting..." : "delete"}
        </Button>
    );
}
export default DeleteJobBtn;
