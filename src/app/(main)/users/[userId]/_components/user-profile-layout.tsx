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
  XIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Fragment } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createGetUserProfileQueryOptions } from "@/hooks/queries/get-user-profile.query";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

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
      <section aria-label="Profile cover image">
        {/* TODO: Refactor to ProfileCoverPhoto */}
        <AspectRatio ratio={3 / 1}>
          {userProfile.coverPhoto ? (
            <Image
              className="object-cover w-full h-full -z-10"
              src={userProfile.coverPhoto.url}
              width={600}
              height={200}
              alt={`${userProfile.name} cover photo`}
            />
          ) : (
            <div className="w-full h-full bg-accent-foreground/10" />
          )}
        </AspectRatio>
      </section>

      <section
        aria-label="Profile information"
        className="-mt-20 md:-mt-12 mx-2"
      >
        <div className="flex md:items-end z-0 flex-col md:flex-row items-center">
          <Avatar className="size-40">
            <AvatarImage
              src={userProfile.avatarPhoto?.url}
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
              {/* TODO: Refactor to ProfileFriendAvatarListWithCount({userId}) */}
              {/* API: /profile/users/:userId/friend-summary */}
              <div>
                <div className="font-bold" aria-label="Friends count">
                  60 friends
                </div>
                <div className="flex mr-2" aria-label="Friend avatars">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="h-10 w-8">
                      <Avatar className="size-10">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt={`Friend ${index + 1} avatar`}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                  ))}
                </div>
              </div>
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

      {/* TODO: Refactor to ProfileFriendSuggestionCarousel({userId}) */}
      {/* API: /profile/users/:userId/friend-suggestions */}
      <section aria-label="Friends suggestion" className="mt-2 mx-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              People you may know
              <Button
                variant={"link"}
                asChild
                className="p-0 h-fit font-semibold justify-end"
              >
                <Link href="/friends/suggestions">See all</Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
              orientation="horizontal"
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-3/5 min-[480px]:basis-2/5 md:basis-[calc(100%/3.5)]"
                  >
                    <Card aria-label="Profile card">
                      <CardHeader className="aspect-square p-0 relative">
                        <Avatar className="w-full h-full rounded-none object-fill">
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="Nguyen Minh Tuan avatar"
                          />
                          <AvatarFallback className="rounded-none">
                            CN
                          </AvatarFallback>
                        </Avatar>
                        <Button
                          className="absolute top-0 right-0 bg-accent-foreground/10 hover:bg-accent-foreground/20 rounded-full"
                          variant={"ghost"}
                          size={"icon"}
                        >
                          <XIcon />
                        </Button>
                      </CardHeader>
                      <CardContent className="p-2">
                        <div className="font-bold my-1">Nguyen Minh Tuan</div>
                        <div className="flex my-1 h-6">
                          <Avatar className="size-6">
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt="Nguyen Minh Tuan avatar"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <span className="ml-2">6 mutual friends</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-2">
                        <Button
                          variant={"secondary"}
                          className="w-full"
                          aria-label="Add friend"
                        >
                          <UserPlusIcon />
                          Add friend
                        </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 -translate-x-1/2" />
              <CarouselNext className="right-0 translate-x-1/2" />
            </Carousel>
          </CardContent>
        </Card>
      </section>

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
