import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { createGetCommentsInfinityQueryOptions } from "@/lib/api/apis/get-comments.api";
import { CommentResponseSchema } from "@/lib/api/schemas/comment.schema";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CommentReactionButton } from "./comment-reaction-button";
import { ReactionProvider } from "./post-card";
import { CommentReactionCounts } from "./comment-reaction-count";

export function CommentCard({ comment }: { comment: CommentResponseSchema }) {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div key={comment.id} className="relative">
      {comment.replyCount > 0 && (
        <span
          className={"absolute border-l border-solid top-0 ml-5 bottom-5"}
        />
      )}

      <ReactionProvider
        initialReactionCounts={comment.reactionCounts}
        initialReaction={comment.reaction}
      >
        <div className="w-full flex gap-x-2 ">
          <Avatar>
            <AvatarImage
              src={comment.owner.avatar?.url}
              alt={comment.owner.name}
            />
            <AvatarFallback>{comment.owner.name}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex-col rounded-xl bg-muted p-2 w-fit relative">
              <div className="font-bold">{comment.owner.name}</div>
              <p>{comment.content.text}</p>
              <CommentReactionCounts commentId={comment.id} />
            </div>
            <div className="flex justify-between items-center text-sm mt-1">
              <div className="flex gap-x-3">
                <Button variant={"link"} className="p-0 ">
                  {comment.createdAt}
                </Button>
                <CommentReactionButton commentId={comment.id} />
                <Button variant={"link"} className="p-0 ">
                  Reply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ReactionProvider>

      {comment.replyCount > 0 && (
        <div className="relative">
          <div className="absolute top-0 border-t border-solid" />
          <Button
            variant={"link"}
            className="p-0 pl-12"
            onClick={() => setShowReplies(true)}
          >
            {comment.replyCount} replies
          </Button>

          {showReplies && (
            <div className="ml-12">
              <CommentList commentId={comment.id} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

type CommentListProps = {
  postId?: string;
  commentId?: string;
};

export function CommentList({ postId, commentId }: CommentListProps) {
  const [toggle, setToggle] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError } =
    useInfiniteQuery(
      createGetCommentsInfinityQueryOptions(
        { postId, commentId },
        { limit: 10 },
      ),
    );

  const comments = data?.pages.flatMap((page) => page.items);

  if (isError) {
    return <div className="p-4">Error loading comments. Please try again.</div>;
  }

  if (isLoading) {
    return <div className="p-4">Loading comments...</div>;
  }

  return (
    <div className="space-y-2 w-full">
      <Button
        onClick={() => setToggle((prev) => !prev)}
        className="p-0"
        variant={"link"}
        size={"sm"}
      >
        {toggle ? "Hide" : "Show"} comments
      </Button>

      {toggle && (
        <div>
          {comments?.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
          {hasNextPage && (
            <Button
              variant={"link"}
              className="w-full"
              onClick={() => fetchNextPage()}
              disabled={isFetching}
            >
              {isFetching ? "Loading..." : "Load more"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
