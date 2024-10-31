"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { createGetFriendsSuggestionQueryOptions } from "@/hooks/queries/get-friends-suggestion.query";
import { useCallback, useMemo, useRef } from "react";
import { GetFriendsSuggestionResponseSchema } from "@/lib/api/schemas/get-friends-suggestion.schema";
import { UserFriendCardLoading } from "../../users/[userId]/_components/user-friend-card-loading";
import { UserFriendCard } from "@/app/_components/user-friend-card";

export default function Page() {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError } =
    useInfiniteQuery(createGetFriendsSuggestionQueryOptions({ limit: 10 }));

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

  const friendsSuggestion = useMemo(() => {
    return data?.pages.reduce<GetFriendsSuggestionResponseSchema["items"]>(
      (acc, page) => {
        return [...acc, ...page.items];
      },
      [],
    );
  }, [data]);

  if (isError) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {friendsSuggestion?.map((friend, index) => (
        <UserFriendCard
          key={index}
          name={friend.name}
          userId={friend.id}
          avatarUrl={friend.avatar?.url}
          totalMutualFriend={friend.mutualFriendsCount}
          status={friend.status}
        />
      ))}
      <div
        key={friendsSuggestion?.length}
        ref={lastElementRef}
        className="basis-3/5 min-[480px]:basis-2/5 md:basis-[calc(100%/3.5)]"
      >
        <UserFriendCardLoading />
      </div>
      {isLoading && (
        <>
          <UserFriendCardLoading />
          <UserFriendCardLoading />
          <UserFriendCardLoading />
        </>
      )}
    </div>
  );
}
