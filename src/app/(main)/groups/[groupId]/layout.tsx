// src/app/groups/[groupId]/layout.tsx
import { getQueryClient } from "@/lib/query-client";
import { GroupProfileLayout } from "./_components/group-layout";
import { createGetGroupProfileQueryOptions } from "@/hooks/queries/get-group-profile.query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
  params: { groupId: string };
};

export default async function Layout({ children, params }: Props) {
  const { groupId } = params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(createGetGroupProfileQueryOptions({ groupId }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GroupProfileLayout groupId={groupId}>{children}</GroupProfileLayout>
    </HydrationBoundary>
  );
}