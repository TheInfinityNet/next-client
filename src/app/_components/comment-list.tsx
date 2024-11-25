import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { createGetCommentsInfinityQueryOptions } from "@/lib/api/apis/get-comments.api";
import { CommentResponseSchema } from "@/lib/api/schemas/comment.schema";
import { cn } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";

export function CommentCard({ comment }: { comment: CommentResponseSchema }) {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div key={comment.id} className="relative">
      {comment.replyCount > 0 && (
        <span
          className={"absolute border-l border-solid top-0 ml-5 bottom-5"}
        />
      )}
      <div className="w-full flex gap-x-2 ">
        <Avatar>
          <AvatarImage
            src={comment.owner.avatar?.url}
            alt={comment.owner.name}
          />
          <AvatarFallback>{comment.owner.name}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex-col rounded-xl bg-muted p-2 w-fit">
            <div className="font-bold">{comment.owner.name}</div>
            <p>{comment.content.text}</p>
          </div>
          <div className="flex justify-between items-center text-sm mt-1">
            <div className="flex gap-x-3">
              <Button variant={"link"} className="p-0 ">
                {comment.createdAt}
              </Button>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant={"link"} className="p-0 ">
                    Like
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent
                  className="p-1 flex space-x-2 rounded-full bg-white shadow-lg border"
                  align="center"
                  sideOffset={8}
                  style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                ></HoverCardContent>
              </HoverCard>
              <Button variant={"link"} className="p-0 ">
                Reply
              </Button>
            </div>
          </div>
        </div>
      </div>

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
  const [toggle, setToggle] = useState(true);

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
