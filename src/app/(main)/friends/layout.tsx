"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function Layout({
  allFriends,
  friendRequests,
  friendSuggestions,
  sentRequests,
}: {
  allFriends: React.ReactNode;
  friendRequests: React.ReactNode;
  friendSuggestions: React.ReactNode;
  sentRequests: React.ReactNode;
}) {
  return (
    <>
      <section aria-label="Friends management section" className="mt-2 mx-2">
        <Tabs defaultValue="friend-suggestions" className="">
          <TabsList aria-label="Tabs for managing friends">
            <TabsTrigger
              value="friend-suggestions"
              aria-label="Friend suggestions"
            >
              Friend suggestions
            </TabsTrigger>
            <TabsTrigger value="friend-requests" aria-label="Friend requests">
              Friend requests
            </TabsTrigger>
            <TabsTrigger value="sent-requests" aria-label="Sent requests">
              Sent requests
            </TabsTrigger>
            <TabsTrigger value="all-friends" aria-label="All friends">
              All friends
            </TabsTrigger>
          </TabsList>
          <TabsContent value="friend-suggestions">
            {friendSuggestions}
          </TabsContent>
          <TabsContent value="friend-requests">{friendRequests}</TabsContent>
          <TabsContent value="sent-requests">{sentRequests}</TabsContent>
          <TabsContent value="all-friends">{allFriends}</TabsContent>
        </Tabs>
      </section>
    </>
  );
}
