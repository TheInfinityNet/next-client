"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useRef } from "react";
import { UserFriendCard } from "@/app/_components/user-friend-card";
import { UserFriendCardLoading } from "../../users/[userId]/_components/user-friend-card-loading";
import { GetFriendListResponseSchema } from "@/lib/api/schemas/get-friend-list.schema";
import { createGetFriendListQueryOptions } from "@/hooks/queries/get-friend-list.query";

export default function Page() {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError } =
    useInfiniteQuery(createGetFriendListQueryOptions({ limit: 10 }));

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

  const friendList = useMemo(() => {
    return data?.pages.reduce<GetFriendListResponseSchema["items"]>(
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
      {friendList?.map((friend, index) => (
        <UserFriendCard
          key={index}
          name={friend.name}
          userId={friend.id}
          avatarUrl={friend.avatar?.url}
          totalMutualFriend={friend.mutualFriendsCount}
          status="Connected"
        />
      ))}
      <div
        key={friendList?.length}
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
