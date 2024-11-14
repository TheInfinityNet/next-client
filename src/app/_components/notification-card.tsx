import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  EllipsisIcon,
  FileText,
  Megaphone,
  MessageCircle,
  SmilePlus,
  Tag,
  UserRound,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationButtonMarkAsReadUnread } from "./notification-button-mark-as-read-unread";
import { NotificationButtonRemove } from "./notification-button-remove";
import { NotificationTypeSchema } from "@/lib/api/schemas/notification.schema";
import { useState } from "react";

type NotificationCardProps = {
  id: string;
  type: NotificationTypeSchema;
  thumbnail?: string;
  title: string;
  content: string;
  isRead: boolean;
  permalink: string;
};

export function NotificationCard({
  id,
  type,
  thumbnail,
  title,
  content,
  isRead: initialIsRead,
  permalink,
}: NotificationCardProps) {
  const [isRead, setIsRead] = useState<boolean>(initialIsRead);

  const renderNotificationType = () => {
    switch (type) {
      case "TaggedInPost":
      case "TaggedInComment":
        return <Tag />;
        break;
      case "NewFollowerPost":
      case "NewGroupPost":
        return <FileText />;
        break;
      case "FriendInvitation":
        return <UserRound />;
        break;
      case "PostReaction":
      case "CommentReaction":
        return <SmilePlus />;
        break;
      case "ReplyToPost":
      case "ReplyToComment":
        return <MessageCircle />;
        break;
      case "Miscellaneous":
        return <Megaphone />;
        break;
      default:
        return null;
    }
  };

  const handleIsReadChange = (newIsRead: boolean) => {
    setIsRead(newIsRead);
  };

  const renderNotificationStatus = () => {
    switch (isRead) {
      case false:
        return (
          <Badge
            variant={"destructive"}
            className="absolute top-0 right-0 size-2 p-0"
          ></Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid gap-2">
      <Card className="flex flex-row">
        <CardHeader className="w-fit">
          <div className="relative">
            <Avatar className="size-14">
              <AvatarImage src={thumbnail} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <Badge className="absolute -bottom-2 -right-2 size-8 p-2">
              {renderNotificationType()}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-4 pl-2 w-full justify-center px-0">
          <Link className="line-clamp-2 break-all" href={permalink}>
            <span className="text-sm font-bold">{title}</span>{" "}
            <span>{content}</span>
          </Link>
          <div className="mt-0 text-sm text-muted-foreground font-semibold">
            <span>1 day</span>
          </div>
        </CardContent>

        <CardFooter className="w-fit relative pt-4 pl-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size={"icon"}
                variant={"ghost"}
                className="relative rounded-full"
              >
                <EllipsisIcon />
                {renderNotificationStatus()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild className="w-full flex justify-start">
                <NotificationButtonMarkAsReadUnread
                  notificationId={id}
                  isRead={isRead}
                  onIsReadChange={handleIsReadChange}
                />
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="w-full flex justify-start">
                <NotificationButtonRemove notificationId={id} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </div>
  );
}
