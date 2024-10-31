"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

import { UserFriendCard } from "@/app/_components/user-friend-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { createGetFriendsSuggestionQueryOptions } from "@/hooks/queries/get-friends-suggestion.query";
import { GetFriendsSuggestionResponseSchema } from "@/lib/api/schemas/get-friends-suggestion.schema";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useRef } from "react";
import { UserFriendCardLoading } from "./user-friend-card-loading";

type ProfileFriendsSummaryPreviewProps = {
  userId: string;
};

export function ProfileFriendsSuggestionCarousel({
  userId,
}: ProfileFriendsSummaryPreviewProps) {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError } =
    useInfiniteQuery(
      createGetFriendsSuggestionQueryOptions({ userId, limit: 10 }),
    );
  console.log(userId);

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
    <section aria-label="Friends suggestion" className="mt-2 mx-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            People you may know
            <Button
              variant={"link"}
              asChild
              className="p-0 h-fit font-semibold justify-end"
            >
              <Link href="/friends">See all</Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
            orientation="horizontal"
          >
            <CarouselContent>
              {friendsSuggestion?.map((friend, index) => (
                <CarouselItem
                  key={index}
                  className="basis-3/5 min-[480px]:basis-2/5 md:basis-[calc(100%/3.5)]"
                >
                  <UserFriendCard
                    name={friend.name}
                    userId={friend.id}
                    avatarUrl={friend.avatar?.url}
                    totalMutualFriend={friend.mutualFriendsCount}
                    status="NotConnected"
                  />
                </CarouselItem>
              ))}
              <CarouselItem
                key={friendsSuggestion?.length}
                className="basis-3/5 min-[480px]:basis-2/5 md:basis-[calc(100%/3.5)]"
                ref={lastElementRef}
              >
                <UserFriendCardLoading />
              </CarouselItem>
              {isLoading && (
                <>
                  <CarouselItem className="basis-3/5 min-[480px]:basis-2/5 md:basis-[calc(100%/3.5)]">
                    <UserFriendCardLoading />
                  </CarouselItem>
                  <CarouselItem className="basis-3/5 min-[480px]:basis-2/5 md:basis-[calc(100%/3.5)]">
                    <UserFriendCardLoading />
                  </CarouselItem>
                  <CarouselItem className="basis-3/5 min-[480px]:basis-2/5 md:basis-[calc(100%/3.5)]">
                    <UserFriendCardLoading />
                  </CarouselItem>
                </>
              )}
            </CarouselContent>

            <CarouselPrevious className="left-0 -translate-x-1/2" />
            <CarouselNext className="right-0 translate-x-1/2" />
          </Carousel>
        </CardContent>
      </Card>
    </section>
  );
}
