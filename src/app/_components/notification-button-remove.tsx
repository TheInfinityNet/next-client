import { Button } from "@/components/ui/button";
import { useRemoveNotificationMutation } from "@/hooks/mutations/remove-notification.mutation";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import React from "react";

type NotificationButtonRemoveProps = {
  notificationId: string;
};

const NotificationButtonRemove = React.forwardRef<
  HTMLButtonElement,
  NotificationButtonRemoveProps
>(({ notificationId, ...props }, ref) => {
  const { toast } = useToast();
  const removeNotificationMutation = useRemoveNotificationMutation();
  const queryClient = useQueryClient();

  const onRemoveNotification = async (notificationId: string) =>
    removeNotificationMutation.mutate(
      { notificationId },
      {
        onSuccess(data) {
          toast({
            title: "Removed notification!!!",
            description: data.message,
          });
          console.log(notificationId);
          queryClient.invalidateQueries({
            queryKey: ["notifications", { type: "All" }],
          });
        },
        onError(error) {
          toast({ title: "Error", description: error.message });
        },
      }
    );

  return (
    <Button
      ref={ref}
      variant={"ghost"}
      size={"sm"}
      {...props}
      onClick={() => onRemoveNotification(notificationId)}
    >
      <XIcon /> Remove Notification
    </Button>
  );
});

NotificationButtonRemove.displayName = "NotificationButtonRemove";

export { NotificationButtonRemove };
