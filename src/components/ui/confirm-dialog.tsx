import {Button} from "@/components/ui/button";

type ConfirmDialogProps = {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export function ConfirmDialog({ title, message, onConfirm, onCancel }: ConfirmDialogProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-lg font-bold">{title}</h2>
                <p className="mt-2">{message}</p>
                <div className="mt-4 flex justify-end space-x-2">
                    <Button onClick={onCancel} variant="ghost">
                        No
                    </Button>
                    <Button onClick={onConfirm} variant="secondary">
                        Yes
                    </Button>
                </div>
            </div>
        </div>
    );
}
