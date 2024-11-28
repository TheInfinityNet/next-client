"use client";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useCreateCommentReactionMutation } from "@/hooks/mutations/create-comment-reaction.mutation";
import { useDeleteCommentReactionMutation } from "@/hooks/mutations/delete-comment-reaction.mutation";
import {
  CommentReactionTypeSchema,
  commentReactionTypeSchema,
} from "@/lib/api/schemas/comment-reaction.schema";
import { ThumbsUpIcon } from "lucide-react";
import { useReaction } from "./post-card";
import { cn } from "@/lib/utils";

export const emotionOptions: Record<
  CommentReactionTypeSchema | string,
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

type CommentReactionButtonProps = {
  commentId: string;
};

export function CommentReactionButton({
  commentId: commentId,
}: CommentReactionButtonProps) {
  const { reaction, setReaction, setReactionCounts } = useReaction();

  const deleteCommentReactionMutation = useDeleteCommentReactionMutation({
    commentId,
  });
  const createCommentReactionMutation = useCreateCommentReactionMutation({
    commentId,
  });
  const onReaction = (reaction: CommentReactionTypeSchema | null) => {
    if (reaction) {
      createCommentReactionMutation.mutate(
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
      deleteCommentReactionMutation.mutate(undefined, {
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
          variant={"link"}
          className={cn("p-0", reaction && emotionOptions[reaction].color)}
          onClick={() =>
            onReaction(reaction ? null : commentReactionTypeSchema.enum.Like)
          }
        >
          {reaction ? emotionOptions[reaction].label : "Like"}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="flex gap-x-1 w-fit rounded-full p-2">
        {Object.entries(commentReactionTypeSchema.enum).map(
          ([reactionType]) => (
            <Button
              key={reactionType}
              size={"icon"}
              variant={"ghost"}
              className={cn("rounded-full text-xl", {
                "bg-gray-100": reaction === reactionType,
              })}
              color={emotionOptions[reactionType].color}
              onClick={() =>
                onReaction(reactionType as CommentReactionTypeSchema)
              }
            >
              {emotionOptions[reactionType].icon}
            </Button>
          ),
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
