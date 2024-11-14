import { Button } from "@/components/ui/button";
import { useNotificationReadStatusMutation } from "@/hooks/mutations/notification-read-unread.mutation";
import { useToast } from "@/hooks/use-toast";
import { CheckIcon } from "lucide-react";
import React, { useState } from "react";

type NotificationButtonMarkAsReadUnreadProps = {
  notificationId: string;
  isRead: boolean;
};

type NotificationButtonMarkAsReadUnreadPropsExtend = {
  notificationId: string;
  isRead: boolean;
  onIsReadChange: (newIsRead: boolean) => void;
};

const NotificationButtonMarkAsReadUnread = React.forwardRef<
  HTMLButtonElement,
  NotificationButtonMarkAsReadUnreadPropsExtend
>(
  (
    { notificationId, isRead: initialIsRead, onIsReadChange, ...props },
    ref
  ) => {
    const [isRead, setIsRead] = useState<boolean>(initialIsRead);
    const { toast } = useToast();

    const notificationReadStatusMutation = useNotificationReadStatusMutation();

    const onNotificationReadStatus = async (
      data: NotificationButtonMarkAsReadUnreadProps
    ) =>
      notificationReadStatusMutation.mutate(data, {
        onSuccess(data) {
          toast({
            title: "Changed read status to unread!!!",
            description: data.message,
          });
          setIsRead(data.isRead);
          onIsReadChange(data.isRead);
        },
        onError(error) {
          toast({ title: "Error", description: error.message });
        },
      });

    const handleClick = () => {
      const data: NotificationButtonMarkAsReadUnreadProps = {
        notificationId: notificationId,
        isRead: isRead,
      };
      onNotificationReadStatus(data);
    };

    switch (isRead) {
      case true:
        return (
          <Button
            ref={ref}
            variant={"ghost"}
            size={"sm"}
            {...props}
            onClick={() => handleClick()}
          >
            <CheckIcon /> Mark as Unread
          </Button>
        );
      case false:
        return (
          <Button
            ref={ref}
            variant={"ghost"}
            size={"sm"}
            {...props}
            onClick={() => handleClick()}
          >
            <CheckIcon /> Mark as Read
          </Button>
        );
      default:
        return (
          <Button ref={ref} variant={"ghost"} size={"sm"} {...props}>
            UnIdentified Button
          </Button>
        );
    }
  }
);

NotificationButtonMarkAsReadUnread.displayName =
  "NotificationButtonMarkAsReadUnread";

export { NotificationButtonMarkAsReadUnread };
