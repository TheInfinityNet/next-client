import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPlusIcon, XIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

type ProfileSuggestionCardProps = {
  userId: string;
  name: string;
  avatarUrl?: string;
  totalMutualFriend?: number;
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

export function ProfileSuggestionCard({
  userId,
  name,
  avatarUrl,
  totalMutualFriend,
  onClose,
}: ProfileSuggestionCardProps) {
  // create createFriendRequestMutation
  // api: POST: /friends
  const onAddFriend = () => {
    console.log(`Add friend ${userId}`);
  };

  return (
    <Card aria-label="Profile card">
      <CardHeader className="aspect-square p-0 relative">
        <Avatar className="w-full h-full rounded-none object-fill">
          <AvatarImage src={avatarUrl} alt={`${name} avatar`} />
          <AvatarFallback className="rounded-none">
            {name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Button
          className="absolute top-0 right-0 bg-accent-foreground/10 hover:bg-accent-foreground/20 rounded-full"
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close card"
        >
          <XIcon />
        </Button>
      </CardHeader>
      <CardContent className="p-2">
        <div className="font-bold my-1 line-clamp-1">{name}</div>
        <div className="flex my-1 h-6">
          <span>{formatMutualFriend(totalMutualFriend)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-2">
        <Button
          variant="secondary"
          className="w-full"
          aria-label="Add friend"
          onClick={onAddFriend}
        >
          <UserPlusIcon />
          Add friend
        </Button>
      </CardFooter>
    </Card>
  );
}
