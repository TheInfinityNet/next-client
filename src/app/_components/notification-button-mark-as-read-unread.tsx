import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import React from "react";

type NotificationButtonMarkAsReadUnreadProps = {
  id: string;
  isRead: boolean;
};

const NotificationButtonMarkAsReadUnread = React.forwardRef<
  HTMLButtonElement,
  NotificationButtonMarkAsReadUnreadProps
>(({ isRead, ...props }, ref) => {
  const renderTypeOfButton = () => {
    if (isRead) {
      return (
        <Button ref={ref} variant={"ghost"} size={"sm"} {...props}>
          <CheckIcon /> Mark as Unread
        </Button>
      );
    } else {
      return (
        <Button ref={ref} variant={"ghost"} size={"sm"} {...props}>
          <CheckIcon /> Mark as Read
        </Button>
      );
    }
  };

  return renderTypeOfButton();
});

NotificationButtonMarkAsReadUnread.displayName =
  "NotificationButtonMarkAsReadUnread";

export { NotificationButtonMarkAsReadUnread };
