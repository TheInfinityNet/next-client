"use client";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useCreatePostReactionMutation } from "@/hooks/mutations/create-post-reaction.mutation";
import { useDeletePostReactionMutation } from "@/hooks/mutations/delete-post-reaction.mutation";
import {
  PostReactionTypeSchema,
  postReactionTypeSchema,
} from "@/lib/api/schemas/post-reaction.schema";
import { ThumbsUpIcon } from "lucide-react";
import { useReaction } from "./post-card";
import { cn } from "@/lib/utils";

export const emotionOptions: Record<
  PostReactionTypeSchema | string,
  {
    label: string;
    icon: string;
    color: string;
  }
> = {
  Like: {
    label: "Like",
    icon: "👍",
    color: "text-blue-500",
  },
  Love: {
    label: "Love",
    icon: "❤️",
    color: "text-red-500",
  },
  Haha: {
    label: "Haha",
    icon: "😂",
    color: "text-yellow-500",
  },
  Wow: {
    label: "Wow",
    icon: "😮",
    color: "text-orange-500",
  },
  Sad: {
    label: "Sad",
    icon: "😢",
    color: "text-gray-500",
  },
  Angry: {
    label: "Angry",
    icon: "😡",
    color: "text-red-600",
  },
};

type PostReactionButtonProps = {
  postId: string;
};

export function PostReactionButton({ postId }: PostReactionButtonProps) {
  const { reaction, setReaction, setReactionCounts } = useReaction();

  const deletePostReactionMutation = useDeletePostReactionMutation({ postId });
  const createPostReactionMutation = useCreatePostReactionMutation({ postId });
  const onReaction = (reaction: PostReactionTypeSchema | null) => {
    if (reaction) {
      createPostReactionMutation.mutate(
        {
          reaction,
        },
        {
          onSuccess(data) {
            setReaction(data.reaction);
            setReactionCounts(data.reactionCounts);
          },
          onError() {
            // I'm too lazy to handle this error
          },
        },
      );
    } else {
      deletePostReactionMutation.mutate(undefined, {
        onSuccess(data) {
          setReaction();
          setReactionCounts(data.reactionCounts);
        },
        onError() {
          // I'm too lazy to handle this error
        },
      });
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn("w-full", reaction && emotionOptions[reaction].color, {
            "bg-muted": reaction,
          })}
          onClick={() =>
            onReaction(reaction ? null : postReactionTypeSchema.enum.Like)
          }
        >
          <div className="mr-1">
            {reaction
              ? emotionOptions[reaction].icon
              : emotionOptions[postReactionTypeSchema.enum.Like].icon}
          </div>

          {reaction ? emotionOptions[reaction].label : "Like"}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="flex gap-x-1 w-fit rounded-full p-2">
        {Object.entries(postReactionTypeSchema.enum).map(([reactionType]) => (
          <Button
            key={reactionType}
            size={"icon"}
            variant={"ghost"}
            className={cn("rounded-full text-xl", {
              "bg-gray-100": reaction === reactionType,
            })}
            color={emotionOptions[reactionType].color}
            onClick={() => onReaction(reactionType as PostReactionTypeSchema)}
          >
            {emotionOptions[reactionType].icon}
          </Button>
        ))}
      </HoverCardContent>
    </HoverCard>
  );
}
