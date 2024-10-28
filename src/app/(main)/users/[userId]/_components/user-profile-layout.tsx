"use client";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ActivityIcon,
  ChevronDownIcon,
  ChevronsUpIcon,
  EllipsisIcon,
  EyeIcon,
  FlagIcon,
  GroupIcon,
  ImageIcon,
  ListPlusIcon,
  LockIcon,
  NotepadTextIcon,
  PenIcon,
  PlusIcon,
  RssIcon,
  SearchIcon,
  ThumbsUpIcon,
  UserPlusIcon,
  UsersIcon,
  UserXIcon,
  VideoIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

import { Fragment } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createGetUserProfileQueryOptions } from "@/hooks/queries/get-user-profile.query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ProfileCoverPhoto } from "@/app/_components/profile-cover-photo";
import { ProfileFriendsSummaryPreview } from "./profile-friends-summary-preview";
import { ProfileFriendsSuggestionCarousel } from "./profile-friends-suggestion-carousel";

type UserProfileLayoutProps = {
  userId: string;
  children: React.ReactNode;
};
export function UserProfileLayout({
  children,
  userId,
}: UserProfileLayoutProps) {
  const getUserProfileQuery = useSuspenseQuery(
    createGetUserProfileQueryOptions({ userId }),
  );

  const { data: userProfile } = getUserProfileQuery;

  return (
    <Fragment>
      <ProfileCoverPhoto profileId={userId} url={userProfile.cover?.url} />
      <section
        aria-label="Profile information"
        className="-mt-20 md:-mt-12 mx-2"
      >
        <div className="flex md:items-end z-0 flex-col md:flex-row items-center">
          <Avatar className="size-40">
            <AvatarImage
              src={userProfile.avatar?.url}
              className="object-cover"
              alt={`${userProfile.name} avatar`}
            />
            <AvatarFallback>
              {userProfile.username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="md:ml-4 mt-4 flex justify-between w-full gap-4 flex-col md:flex-row">
            <div
              className="flex items-center md:items-start flex-col space-y-1"
              aria-labelledby="user-info"
            >
              <div
                className="text-2xl md:mt-10 text-center md:text-start"
                id="user-info"
                style={{
                  wordBreak: "break-word",
                }}
              >
                {userProfile.name}
              </div>
              <div className="font-medium text-muted-foreground">
                {`@${userProfile.username}`}
              </div>
              <ProfileFriendsSummaryPreview userId={userId} />
            </div>
            {/* TODO: Refactor to ProfileActionButtons({userId}) */}
            {/* API: /profile/users/:userId/actions */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-end items-end mt-auto">
              <Button
                variant={"default"}
                className="flex-grow sm:flex-none"
                aria-label="Add to post"
              >
                <PlusIcon /> Add to Post
              </Button>
              <Button
                variant={"secondary"}
                className="flex-grow sm:flex-none"
                aria-label="Edit profile"
              >
                <PenIcon /> Edit Profile
              </Button>
              <Button
                variant={"secondary"}
                className="w-full sm:w-fit"
                aria-label="Hide friends suggestion"
              >
                <ChevronsUpIcon />
                <span className="sr-only">Hide friends suggestion</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ProfileFriendsSuggestionCarousel userId={userId} />

      {/* TODO: Refactor to ProfileNavigation({userId}) */}
      {/* API: /profile/users/:userId/navigation */}
      <section className="mt-2 mx-2" aria-label="Profile navigation">
        <Card>
          <CardContent className="py-2 px-1 mx-1 overflow-x-scroll">
            <div className="gap-1 flex">
              <Button size={"sm"} variant={"default"} asChild>
                <Link href="/users/1">
                  <RssIcon /> Posts
                </Link>
              </Button>
              <Button size={"sm"} variant={"secondary"} asChild>
                <Link href="/users/1/about">
                  <NotepadTextIcon /> About
                </Link>
              </Button>
              <Button size={"sm"} variant={"secondary"} asChild>
                <Link href="/users/1/friends">
                  <UsersIcon /> Friends
                </Link>
              </Button>
              <Button size={"sm"} variant={"secondary"} asChild>
                <Link href="/users/1/photos">
                  <ImageIcon /> Photos
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size={"sm"} variant={"secondary"}>
                    More
                    <ChevronDownIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/users/1/videos">
                      <VideoIcon />
                      Videos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/users/1/likes">
                      <ThumbsUpIcon />
                      Likes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/users/1/following">
                      <ListPlusIcon />
                      Following
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/users/1/groups">
                      <GroupIcon />
                      Groups
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* TODO: Refactor to ProfileActionDropdown({userId}) */}
              {/* API: /profile/users/:userId/actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size={"sm"} variant={"secondary"} className="ml-auto">
                    <EllipsisIcon />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <EyeIcon /> View As
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SearchIcon />
                    Search
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <PenIcon />
                    Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ActivityIcon />
                    Activity Log
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LockIcon />
                    Lock Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FlagIcon />
                    Report Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserXIcon />
                    Delete Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserPlusIcon />
                    Create another profile
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      </section>

      {children}
    </Fragment>
  );
}
