"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Link from "next/link";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { emotionOptions } from "./comment-reaction-button";
import { useCallback, useRef, useState } from "react";
import { useReaction } from "./post-card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { createGetCommentReactionsInfinityQueryOptions } from "@/hooks/queries/get-comment-reactions.query";
import { CommentReactionTypeSchema } from "@/lib/api/schemas/comment-reaction.schema";
import { PostReactionProfileCard } from "./post-reaction-counts";

type CommentReactionCountsProps = {
  commentId: string;
};

export function CommentReactionCounts({
  commentId,
}: CommentReactionCountsProps) {
  const { reactionCounts } = useReaction();
  const [selectedTab, setSelectedTab] = useState<
    CommentReactionTypeSchema | "all"
  >("all");

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery(
      createGetCommentReactionsInfinityQueryOptions(
        { commentId },
        { type: selectedTab === "all" ? undefined : selectedTab, limit: 10 },
      ),
    );

  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading],
  );

  const reactions = data?.pages.flatMap((page) => page.items) ?? [];
  const reactionCountsSum = Object.entries(reactionCounts).reduce(
    (acc, [_, count]) => acc + count,
    0,
  );

  console.debug(reactionCounts);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center text-muted-foreground space-x-2 cursor-pointer">
          {reactionCounts &&
            Object.entries(reactionCounts)
              ?.sort(([, countA], [, countB]) => countB ?? 0 - countA ?? 0)
              ?.slice(0, 3)
              ?.map(([reactionType]) => (
                <div key={reactionType}>
                  {emotionOptions[reactionType].icon}
                </div>
              ))}
          {reactionCountsSum > 0 && <div>{reactionCountsSum} reactions</div>}
        </div>
      </DialogTrigger>

      <DialogContent className="w-full max-w-screen-md h-[80vh] max-h-screen">
        <Tabs
          value={selectedTab}
          onValueChange={(value) =>
            setSelectedTab(value as CommentReactionTypeSchema | "all")
          }
          className="overflow-y-scroll mt-4"
        >
          <TabsList className="w-full justify-start sticky top-0 z-10">
            <TabsTrigger value="all">All</TabsTrigger>
            {reactionCounts && (
              <>
                {Object.entries(reactionCounts)
                  ?.sort(([, countA], [, countB]) => countB - countA)
                  ?.map(([reactionType]) => {
                    console.debug(reactionType);
                    return (
                      <TabsTrigger key={reactionType} value={reactionType}>
                        {emotionOptions[reactionType].label}
                      </TabsTrigger>
                    );
                  })}
              </>
            )}
          </TabsList>
          <div className="mt-2 space-y-1">
            {reactions?.map((reaction) => (
              <PostReactionProfileCard
                key={reaction.id}
                id={reaction.profile.id}
                reaction={reaction.reaction}
                name={reaction.profile.name}
                type={reaction.profile.type}
                avatarUrl={reaction.profile.avatar?.url ?? ""}
              />
            ))}
            {
              <div ref={lastElementRef} className="w-full h-10">
                {isFetching ? "Loading..." : "Load more"}
              </div>
            }
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
