// src/app/about/page.tsx

'use client';

import { useParams } from 'next/navigation';
import { Card, CardHeader, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Eye, Clock5, Users, MessageSquare } from "lucide-react";
import { useGetGroupAboutQuery } from "@/hooks/queries/get-group-about";

export default function GroupAbout() {
  const params = useParams();
  const groupId = params.groupId as string;
  const { data, error, isLoading } = useGetGroupAboutQuery({ groupId });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading group data</p>;

  return (
    <div className="space-y-6 mx-auto max-w-[500px]">
      <Card>
        <CardHeader>
          <span className="font-bold">About this group</span>
        </CardHeader>
        <CardContent className="space-y-4">
          <hr />
          <div className="flex items-center space-x-2">
            <Lock />
            <div className="flex-col">
              <span className="font-bold">{data?.privacy}</span>
              <CardDescription>
                {data?.privacy === "Private"
                  ? "Only members can see who's in the group and what they post."
                  : "Anyone can see who's in the group and what they post."}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Eye />
            <div className="flex-col">
              <span className="font-bold">{data?.visibility}</span>
              <CardDescription>Anyone can find this group.</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock5 />
            <div className="flex-col">
              <span className="font-bold">History</span>
              <CardDescription>Group created on {data?.createdDate}</CardDescription>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <span className="font-bold">Members • {data?.totalMembers}</span>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription>{data?.description}</CardDescription>
          <Button variant="outline" className="w-full">See all</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <span className="font-bold">Activity</span>
        </CardHeader>
        <CardContent className="space-y-4">
          <hr />
          <div className="flex items-center space-x-2">
            <MessageSquare />
            <div className="flex-col">
              <span>{data?.recentPosts} new posts this month</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Users />
            <div className="flex-col">
              <span>{data?.totalMembers} total members</span>
              <CardDescription>+ {data?.recentMembers} in the last week</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock5 />
            <div className="flex-col">
              <span>Created {data?.history}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
