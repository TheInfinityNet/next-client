import {useInfiniteQuery} from "@tanstack/react-query";
import {useCallback, useRef} from "react";
import {PostCard} from "@/app/_components/post-card";
import {createGetProfilePostsInfinityQueryOptions} from "@/hooks/queries/get-profile-posts.query";

export function ProfilePostList({ profileId }: { profileId: string }) {
    const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
        useInfiniteQuery(createGetProfilePostsInfinityQueryOptions({profileId}, { limit: 10 }));

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