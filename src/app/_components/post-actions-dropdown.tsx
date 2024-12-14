import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {EllipsisIcon} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {createGetPostActionsQueryOptions} from "@/hooks/queries/get-post-actions.query";
import {useState} from "react";
import {ConfirmDialog} from "@/components/ui/confirm-dialog";
import {EditDialog} from "@/app/_components/edit-post-form";
import {useDeletePostMutation} from "@/hooks/mutations/delete-post.mutation";
import {toast} from "@/hooks/use-toast";

type PostActionsDropdownProps = {
    postId: string;
};

export function PostActionsDropdown({ postId } : PostActionsDropdownProps) {
    const { data: actions, isLoading } = useQuery(
        createGetPostActionsQueryOptions({ postId }),
    );

    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const deletePostMutation = useDeletePostMutation();
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button
                        className="rounded-full"
                        size={"icon"}
                        variant={"ghost"}
                    >
                        <EllipsisIcon />
                        <span className="sr-only">Actions</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {isLoading ? (
                        <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
                    ) : (
                        <>
                            <DropdownMenuItem>Turn on notifications</DropdownMenuItem>
                            {actions?.["PostEdit"] && (
                                <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
                                    Edit
                                </DropdownMenuItem>
                            )}
                            {actions?.["PostDelete"] && (
                                <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
                                    Delete
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Report</DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Delete Dialog */}
            {isDeleteDialogOpen && (
                <ConfirmDialog
                    title="Delete Post"
                    message="Are you sure you want to delete this post?"
                    onConfirm={() => {
                        deletePostMutation.mutate(
                            { id: postId },
                            {
                                onSuccess(data) {
                                    toast({
                                        title: "Post deleted successfully",
                                        description: data.id,
                                    });
                                },
                                onError(error) {
                                    toast({ title: "Delete post failed" });
                                },
                            },
                        );
                        console.log("Post deleted:", postId);
                        setDeleteDialogOpen(false);
                        // Add your delete logic here
                    }}
                    onCancel={() => setDeleteDialogOpen(false)}
                />
            )}

            {/* Edit Dialog */}
            {isEditDialogOpen && (
                <EditDialog
                    postId={postId}
                    onClose={() => setEditDialogOpen(false)}
                />
            )}
        </>
    );
}
