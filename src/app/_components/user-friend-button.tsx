"use client";

import { Button } from "@/components/ui/button";
import { UserMinusIcon, UserPlusIcon, XCircleIcon } from "lucide-react";
import { FriendStatusSchema } from "@/lib/api/schemas/friend-status.schema";
import { useState } from "react";
import { useAddFriendMutation } from "@/hooks/mutations/add-friend.mutation";
import { useCancelFriendMutation } from "@/hooks/mutations/cancel-friend.mutation";
import { useAcceptFriendMutation } from "@/hooks/mutations/accept-friend.mutation";
import { useDeclineFriendMutation } from "@/hooks/mutations/decline-friend.mutation";
import { useRemoveFriendMutation } from "@/hooks/mutations/delete-friend.mutation";
import { useToast } from "@/hooks/use-toast";

type UserFriendButtonProps = {
  userId: string;
  status: FriendStatusSchema;
};

export function UserFriendButton({
  userId,
  status: initialStatus,
}: UserFriendButtonProps) {
  const [status, setStatus] = useState<FriendStatusSchema>(initialStatus);
  const { toast } = useToast();

  const addFriendMutation = useAddFriendMutation();
  const cancelFriendMutation = useCancelFriendMutation();
  const acceptFriendMutation = useAcceptFriendMutation();
  const declineFriendMutation = useDeclineFriendMutation();
  const removeFriendMutation = useRemoveFriendMutation();

  const onAddFriend = async (userId: string) =>
    addFriendMutation.mutate(
      { userId },
      {
        onSuccess(data) {
          toast({ title: "Friend request sent", description: data.message });
          setStatus(data.status);
        },
        onError(error) {
          toast({ title: "Error", description: error.message });
        },
      },
    );
  const onCancelRequest = async (userId: string) =>
    cancelFriendMutation.mutate(
      { userId },
      {
        onSuccess(data) {
          toast({
            title: "Friend request cancelled",
            description: data.message,
          });
          setStatus(data.status);
        },
        onError(error) {
          toast({ title: "Error", description: error.message });
        },
      },
    );
  const onAcceptRequest = async (userId: string) =>
    acceptFriendMutation.mutate(
      { userId },
      {
        onSuccess(data) {
          toast({
            title: "Friend request accepted",
            description: data.message,
          });
          setStatus(data.status);
        },
        onError(error) {
          toast({ title: "Error", description: error.message });
        },
      },
    );
  const onDeclineRequest = async (userId: string) =>
    declineFriendMutation.mutate(
      { userId },
      {
        onSuccess(data) {
          toast({
            title: "Friend request declined",
            description: data.message,
          });
          setStatus(data.status);
        },
        onError(error) {
          toast({ title: "Error", description: error.message });
        },
      },
    );
  const onRemoveFriend = async (userId: string) =>
    removeFriendMutation.mutate(
      { userId },
      {
        onSuccess(data) {
          toast({ title: "Friend removed", description: data.message });
          setStatus(data.status);
        },
        onError(error) {
          toast({ title: "Error", description: error.message });
        },
      },
    );

  const isPending =
    addFriendMutation.isPending ||
    cancelFriendMutation.isPending ||
    acceptFriendMutation.isPending ||
    declineFriendMutation.isPending ||
    removeFriendMutation.isPending;

  if (isPending) {
    return (
      <Button variant="secondary" className="w-full" disabled>
        Loading...
      </Button>
    );
  }

  switch (status) {
    case "NotConnected":
      return (
        <Button
          variant="secondary"
          className="w-full"
          aria-label="Add friend"
          onClick={() => onAddFriend(userId)}
        >
          <UserPlusIcon />
          Add friend
        </Button>
      );
    case "RequestSent":
      return (
        <Button
          variant="secondary"
          className="w-full"
          aria-label="Cancel friend request"
          onClick={() => onCancelRequest(userId)}
        >
          <XCircleIcon />
          Cancel Request
        </Button>
      );
    case "RequestReceived":
      return (
        <>
          <Button
            variant="default"
            className="w-full"
            aria-label="Accept friend request"
            onClick={() => onAcceptRequest(userId)}
          >
            <UserPlusIcon />
            Accept Request
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            aria-label="Decline friend request"
            onClick={() => onDeclineRequest(userId)}
          >
            <XCircleIcon />
            Decline Request
          </Button>
        </>
      );
    case "Connected":
      return (
        <Button
          variant="secondary"
          className="w-full"
          aria-label="Remove friend"
          onClick={() => onRemoveFriend(userId)}
        >
          <UserMinusIcon />
          Remove Friend
        </Button>
      );
    default:
      return null;
  }
}
