import {Button} from "@/components/ui/button";
import React from "react";
import {Textarea} from "@/components/ui/textarea";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/hooks/use-toast";
import {mapFieldErrorToFormError} from "@/lib/utils";
import {
    createCommentBodySchema,
    CreateCommentBodySchema,
    useCreateCommentMutation
} from "@/lib/api/apis/create-comment.api";

type CommentDialogProps = {
    postId: string;
    onClose: () => void;
};

export function CommentDialog({ postId, onClose }: CommentDialogProps) {

    const createCommentMutation = useCreateCommentMutation();

    const {
        control,
        handleSubmit,
        setValue,
        setError,
        watch,
        formState: { errors },
    } = useForm<CreateCommentBodySchema>({
        resolver: zodResolver(createCommentBodySchema),
        defaultValues: {
            postId : postId,
            content: { text: "", facets: [] },
            type: "Text",
        },
    });

    console.log(errors);

    const onSubmit = (data: CreateCommentBodySchema) =>
        createCommentMutation.mutate(data, {
            onSuccess: () => {
                setValue("content.text", "");
                toast({
                    title: "Comment succeeded"
                });
            },
            onError: (error) => {
                toast({
                    title: "Comment failed",
                    description: error.message,
                });
                switch (error.type) {
                    case "ValidationError":
                        mapFieldErrorToFormError(setError, error.errors);
                }
            },
        });

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/2">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex items-start space-x-4">
                        <div className="flex-grow">
                            <Controller
                                name="content.text"
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        placeholder="What's on your mind?"
                                        className="w-full min-h-[100px] text-lg border-none resize-none focus:ring-0"
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end space-x-2">
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                        >
                            Send
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    );
}
