"use client";
import { createGetNotificationQueryOptions } from "@/hooks/queries/get-notifications.query";
import { GetNotificationsResponseSchema } from "@/lib/api/schemas/get-notifications.schema";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useRef } from "react";
import { NotificationCard } from "@/app/_components/notification-card";
import { NotificationCardLoading } from "@/app/_components/notification-card-loading";

export default function NotificationsUnreadPage() {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError } =
    useInfiniteQuery(
      createGetNotificationQueryOptions({ limit: 10, type: "Unread" })
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
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  const notifications = useMemo(() => {
    return data?.pages.reduce<GetNotificationsResponseSchema["items"]>(
      (acc, page) => {
        return [...acc, ...page.items];
      },
      []
    );
  }, [data]);

  if (isError) {
    return null;
  }

  return (
    <div className="grid gap-2">
      {notifications?.map((notification, index) => (
        <NotificationCard
          key={index}
          id={notification.id}
          type={notification.type}
          thumbnail={notification.thumbnail?.url}
          title={notification.title}
          content={notification.content}
          isRead={notification.isRead}
          permalink={notification.permalink}
        />
      ))}
      <div key={notifications?.length} ref={lastElementRef}>
        <NotificationCardLoading />
      </div>
      {isLoading && (
        <>
          <NotificationCardLoading />
          <NotificationCardLoading />
        </>
      )}
    </div>
  );
}
