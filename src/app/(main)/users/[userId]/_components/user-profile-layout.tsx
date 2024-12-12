"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useRef, Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CameraIcon,
  ChevronDownIcon,
  ChevronsDownIcon,
  ChevronsUpIcon,
  GroupIcon,
  ImageIcon,
  ListPlusIcon,
  NotepadTextIcon,
  PenIcon,
  PlusIcon,
  RssIcon,
  ThumbsUpIcon,
  UsersIcon,
  VideoIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createGetUserProfileQueryOptions } from "@/hooks/queries/get-user-profile.query";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { ProfileCoverPhoto } from "@/app/_components/profile-cover-photo";
import { ProfileFriendsSummaryPreview } from "./profile-friends-summary-preview";
import { ProfileFriendsSuggestionCarousel } from "./profile-friends-suggestion-carousel";
import { ProfileActionsDropdown } from "./profile-actions-dropdown";
import UserProfileAvatar from "./user-profile-avatar";

type UserProfileLayoutProps = {
  userId: string;
  children: React.ReactNode;
};

export function UserProfileLayout({
  children,
  userId,
}: UserProfileLayoutProps) {
  const getUserProfileQuery = useQuery(
    createGetUserProfileQueryOptions({ userId }),
  );

  const [isShowFriendSuggestion, setIsShowFriendSuggestion] =
    useState<boolean>(true);

  useEffect(() => {
    console.log(isShowFriendSuggestion);
  }, [isShowFriendSuggestion]);

  const { data: userProfile } = getUserProfileQuery;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log("Selected file:", file);
    }
  };

  if (!userProfile) {
    return null;
  }

  return (
    <Fragment>
      <ProfileCoverPhoto profileId={userId} url={userProfile?.cover?.url} />
      <section
        aria-label="Profile information"
        className="-mt-20 md:-mt-12 mx-2"
      >
        <div className="flex md:items-end z-0 flex-col md:flex-row items-center">
          <UserProfileAvatar
            userProfile={userProfile}
            handleUploadClick={handleUploadClick}
            handleFileChange={handleFileChange}
          />

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
            <div className="flex flex-wrap gap-2 justify-center md:justify-end items-end mt-auto">
              {/*<Button*/}
              {/*  variant={"default"}*/}
              {/*  className="flex-grow sm:flex-none"*/}
              {/*  aria-label="Add to post"*/}
              {/*>*/}
              {/*  <PlusIcon /> Add to Post*/}
              {/*</Button>*/}
              <Link href={`/users/${userId}/edit-profile#edit-form`} passHref>
                <Button
                  variant={"secondary"}
                  className="flex-grow sm:flex-none"
                  aria-label="Edit profile"
                >
                  <PenIcon /> Edit Profile
                </Button>
              </Link>
              <Button
                variant={"secondary"}
                className="w-full sm:w-fit"
                aria-label="Hide friends suggestion"
                onClick={() => setIsShowFriendSuggestion((prev) => !prev)}
              >
                {isShowFriendSuggestion ? (
                  <ChevronsUpIcon />
                ) : (
                  <ChevronsDownIcon />
                )}

                <span className="sr-only">
                  {isShowFriendSuggestion
                    ? "Hide friends suggestion"
                    : "Show friends suggestion"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {isShowFriendSuggestion ? (
        <ProfileFriendsSuggestionCarousel userId={userId} />
      ) : null}

      <section className="mt-2 mx-2" aria-label="Profile navigation">
        <Card>
          <CardContent className="py-2 px-1 mx-1 overflow-x-scroll">
            <div className="gap-1 flex">
              <Button size={"sm"} variant={"default"} asChild>
                <Link href={`/users/${userId}`}>
                  <RssIcon /> Posts
                </Link>
              </Button>
              <Button size={"sm"} variant={"secondary"} asChild>
                <Link href={`/users/${userId}/about`}>
                  <NotepadTextIcon /> About
                </Link>
              </Button>
              <Button size={"sm"} variant={"secondary"} asChild>
                <Link href={`/users/${userId}/friends`}>
                  <UsersIcon /> Friends
                </Link>
              </Button>
              <Button size={"sm"} variant={"secondary"} asChild>
                <Link href={`/users/${userId}/photos`}>
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
                    <Link href={`/users/${userId}/video`}>
                      <VideoIcon />
                      Videos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/users/${userId}/likes`}>
                      <ThumbsUpIcon />
                      Likes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/users/${userId}/following`}>
                      <ListPlusIcon />
                      Following
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/users/${userId}/groups`}>
                      <GroupIcon />
                      Groups
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <ProfileActionsDropdown profileId={userId} />
            </div>
          </CardContent>
        </Card>
      </section>

      {children}
    </Fragment>
  );
}
