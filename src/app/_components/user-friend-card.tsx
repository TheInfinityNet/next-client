import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserMinusIcon, UserPlusIcon, XCircleIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FriendStatusSchema } from "@/lib/api/schemas/friend-status.schema";
import { UserFriendButton } from "./user-friend-button";

type UserFriendCardProps = {
  userId: string;
  name: string;
  avatarUrl?: string;
  totalMutualFriend?: number;
  status: FriendStatusSchema;
  onClose?: () => void;
};

function formatMutualFriend(totalMutualFriend: number | undefined) {
  if (!totalMutualFriend) {
    return "No mutual friends";
  }
  if (totalMutualFriend === 1) {
    return "1 mutual friend";
  }
  if (totalMutualFriend > 1 && totalMutualFriend < 99) {
    return `${totalMutualFriend} mutual friends`;
  }
  return "99+ mutual friends";
}

export function UserFriendCard({
  userId,
  name,
  avatarUrl,
  totalMutualFriend,
  status,
  onClose,
}: UserFriendCardProps) {
  const renderStatusButton = () => {
    switch (status) {
      case "NotConnected":
        return (
          // TODO: Refactor to AddFriendButton(userId)
          // create createFriendRequestMutation
          // api: POST: /friends

          <Button
            variant="secondary"
            className="w-full"
            aria-label="Add friend"
          >
            <UserPlusIcon />
            Add friend
          </Button>
        );
      case "RequestSent":
        // TODO: Refactor to CancelRequestButton(userId)
        // create cancelFriendRequestMutation
        return (
          <Button
            variant="secondary"
            className="w-full"
            aria-label="Cancel friend request"
          >
            <XCircleIcon />
            Cancel Request
          </Button>
        );
      case "RequestReceived":
        // TODO: Refactor to DeclineRequestButton(userId)
        return (
          <>
            <Button
              variant="default"
              className="w-full"
              aria-label="Decline friend request"
            >
              <UserPlusIcon />
              Accept Request
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              aria-label="Decline friend request"
            >
              <XCircleIcon />
              Decline Request
            </Button>
          </>
        );
      case "Connected":
        // TODO: Refactor to RemoveFriendButton(userId)
        return (
          <Button
            variant="secondary"
            className="w-full"
            aria-label="Remove friend"
          >
            <UserMinusIcon />
            Remove Friend
          </Button>
        );
      default:
        return null;
    }
  };
  return (
    <Card aria-label="Profile card" className="overflow-hidden">
      <CardHeader className="aspect-square p-0 relative">
        <Avatar className="w-full h-full rounded-none object-fill">
          <AvatarImage src={avatarUrl} alt={`${name} avatar`} />
          <AvatarFallback className="rounded-none">
            {name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="p-2">
        <div className="font-bold my-1 line-clamp-1">{name}</div>
        <div className="flex my-1 h-6">
          <span>{formatMutualFriend(totalMutualFriend)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-2 grid gap-2">
        <UserFriendButton status={status} userId={userId} />
      </CardFooter>
    </Card>
  );
}
