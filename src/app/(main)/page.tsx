"use client";
import { PostCard } from "../_components/post-card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { createGetTimelinePostsInfinityQueryOptions } from "@/hooks/queries/get-timeline-posts.query";
import { useCallback, useRef } from "react";

export function PostTimelineList() {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery(createGetTimelinePostsInfinityQueryOptions({ limit: 10 }));

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

  const posts = data?.pages.flatMap((page) => page.items);

  return (
    <div className="p-4 space-y-4">
      {posts?.map((post) => (
        <div key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
      <div ref={lastElementRef}>Loading...</div>
    </div>
  );
}

export default function Home() {
  const comments = [
    {
      id: 1,
      author: "Tuan Hao",
      avatarUrl: "https://via.placeholder.com/150",
      content: "Great post! Thanks for sharing.",
      timeAgo: "1 hour ago",
    },
    {
      id: 2,
      author: "Minh Anh",
      avatarUrl: "https://via.placeholder.com/150",
      content: "Really helpful content!",
      timeAgo: "2 hours ago",
    },
  ];

  return <PostTimelineList />;
}
