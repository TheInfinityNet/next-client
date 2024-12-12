"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createGetUserProfileQueryOptions } from "@/hooks/queries/get-user-profile.query";
import { useQuery } from "@tanstack/react-query";

type UserProfileAboutPageProps = {
  userId: string;
  children: React.ReactNode;
};

export default function UserProfileAboutPage({
  children,
  userId,
}: UserProfileAboutPageProps) {
  const getUserProfileQuery = useQuery(
    createGetUserProfileQueryOptions({ userId })
  );

  return (
    <Tabs defaultValue="Overview" className="flex w-full">
      <TabsList className="flex flex-col w-1/4 space-y-2 h-full mt-2">
        <TabsTrigger
          value="Overview"
          className="w-full hover:bg-gray-200 justify-start"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="Work and education"
          className="w-full hover:bg-gray-200 justify-start"
        >
          Work and education
        </TabsTrigger>
        <TabsTrigger
          value="Places lived"
          className="w-full hover:bg-gray-200 justify-start"
        >
          Places lived
        </TabsTrigger>
        <TabsTrigger
          value="Contact and basic info"
          className="w-full hover:bg-gray-200 justify-start"
        >
          Contact and basic info
        </TabsTrigger>
        <TabsTrigger
          value="Family and relationships"
          className="w-full hover:bg-gray-200 justify-start"
        >
          Family and relationships
        </TabsTrigger>
        <TabsTrigger
          value="Life events"
          className="w-full hover:bg-gray-200 justify-start"
        >
          Life events
        </TabsTrigger>
      </TabsList>
      <div className="w-3/4 ml-4">
        <TabsContent value="Overview">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                ID: {getUserProfileQuery.data?.id}
              </CardDescription>
              <CardDescription>
                User name: {getUserProfileQuery.data?.username}
              </CardDescription>
              <CardDescription>
                Name: {getUserProfileQuery.data?.name}
              </CardDescription>
              <CardDescription>
                Status: {getUserProfileQuery.data?.status}
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="Work and education">
          <Card>
            <CardHeader>
              <CardTitle>Work and education</CardTitle>
              <CardDescription>
                ID: {getUserProfileQuery.data?.id}
              </CardDescription>
              <CardDescription>
                User name: {getUserProfileQuery.data?.username}
              </CardDescription>
              <CardDescription>
                Name: {getUserProfileQuery.data?.name}
              </CardDescription>
              <CardDescription>
                Status: {getUserProfileQuery.data?.status}
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="Places lived">
          <Card>
            <CardHeader>
              <CardTitle>Places lived</CardTitle>
              <CardDescription>
                ID: {getUserProfileQuery.data?.id}
              </CardDescription>
              <CardDescription>
                User name: {getUserProfileQuery.data?.username}
              </CardDescription>
              <CardDescription>
                Name: {getUserProfileQuery.data?.name}
              </CardDescription>
              <CardDescription>
                Status: {getUserProfileQuery.data?.status}
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="Contact and basic info">
          <Card>
            <CardHeader>
              <CardTitle>Contact and basic info</CardTitle>
              <CardDescription>
                ID: {getUserProfileQuery.data?.id}
              </CardDescription>
              <CardDescription>
                User name: {getUserProfileQuery.data?.username}
              </CardDescription>
              <CardDescription>
                Name: {getUserProfileQuery.data?.name}
              </CardDescription>
              <CardDescription>
                Status: {getUserProfileQuery.data?.status}
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="Family and relationships">
          <Card>
            <CardHeader>
              <CardTitle>Family and relationships</CardTitle>
              <CardDescription>
                ID: {getUserProfileQuery.data?.id}
              </CardDescription>
              <CardDescription>
                User name: {getUserProfileQuery.data?.username}
              </CardDescription>
              <CardDescription>
                Name: {getUserProfileQuery.data?.name}
              </CardDescription>
              <CardDescription>
                Status: {getUserProfileQuery.data?.status}
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="Life events">
          <Card>
            <CardHeader>
              <CardTitle>Life events</CardTitle>
              <CardDescription>
                ID: {getUserProfileQuery.data?.id}
              </CardDescription>
              <CardDescription>
                User name: {getUserProfileQuery.data?.username}
              </CardDescription>
              <CardDescription>
                Name: {getUserProfileQuery.data?.name}
              </CardDescription>
              <CardDescription>
                Status: {getUserProfileQuery.data?.status}
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  );
}
