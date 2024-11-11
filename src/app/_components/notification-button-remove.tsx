import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import React from "react";

const NotificationButtonRemove = React.forwardRef<HTMLButtonElement>(
  (props, ref) => {
    return (
      <Button ref={ref} variant={"ghost"} size={"sm"} {...props}>
        <XIcon /> Remove Notification
      </Button>
    );
  }
);

NotificationButtonRemove.displayName = "NotificationButtonRemove";

export { NotificationButtonRemove };
