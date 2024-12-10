import {Button} from "@/components/ui/button";

type EditDialogProps = {
    postId: string;
    onClose: () => void;
};

export function EditDialog({ postId, onClose }: EditDialogProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-lg font-bold">Edit Post</h2>
                <p className="mt-2">Post ID: {postId}</p>
                {/* Add your edit form logic here */}
                <div className="mt-4 flex justify-end">
                    <Button onClick={onClose} variant="secondary">
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
}
