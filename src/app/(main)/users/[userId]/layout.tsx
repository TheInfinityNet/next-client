import { getQueryClient } from "@/lib/query-client";
import { UserProfileLayout } from "./_components/user-profile-layout";
import { createGetUserProfileQueryOptions } from "@/hooks/queries/get-user-profile.query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
};
export default async function Layout({ children, params }: Props) {
  const { userId } = await params;
  return <UserProfileLayout userId={userId}>{children}</UserProfileLayout>;
}
