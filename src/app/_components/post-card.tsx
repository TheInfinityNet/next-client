"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  EarthIcon,
  EllipsisIcon,
  MessageCircleIcon,
  ShareIcon,
  ThumbsUpIcon,
} from "lucide-react";
import { PostResponseSchema } from "@/lib/api/schemas/post.schema";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { DialogTrigger } from "@radix-ui/react-dialog";

const enum EmotionType {
  Like,
  Love,
  Haha,
  Wow,
  Sad,
  Angry,
}

type Emotion = {
  label: string;
  icon: string;
  color: string;
};

const emotionOptions: Record<EmotionType, Emotion> = {
  [EmotionType.Like]: {
    label: "Like",
    icon: "👍",
    color: "text-blue-500",
  },
  [EmotionType.Love]: {
    label: "Love",
    icon: "❤️",
    color: "text-red-500",
  },
  [EmotionType.Haha]: {
    label: "Haha",
    icon: "😂",
    color: "text-yellow-500",
  },
  [EmotionType.Wow]: {
    label: "Wow",
    icon: "😮",
    color: "text-orange-500",
  },
  [EmotionType.Sad]: {
    label: "Sad",
    icon: "😢",
    color: "text-gray-500",
  },
  [EmotionType.Angry]: {
    label: "Angry",
    icon: "😡",
    color: "text-red-600",
  },
};

type PostCardProps = {
  post: PostResponseSchema;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row space-y-0 gap-x-2">
        <div>
          <Avatar>
            <AvatarImage src={post?.owner?.avatar?.url} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <Link
            className="font-bold"
            href={
              post.owner.type === "User"
                ? `/users/${post.owner.id}`
                : `/page/${post.owner.id}`
            }
          >
            {post?.owner.name}
          </Link>
          <div className="flex text-muted-foreground text-sm items-center gap-x-1">
            <div className="font-semibold">{post.createdAt}</div>
            {post.audiance.type === "Public" ? (
              <EarthIcon className="size-4" />
            ) : post.audiance.type === "Friend" ? (
              <EarthIcon className="size-4" />
            ) : post.audiance.type === "OnlyMe" ? (
              <EarthIcon className="size-4" />
            ) : post.audiance.type === "Custom" ||
              post.audiance.type === "Include" ||
              post.audiance.type === "Exclude" ? (
              <EarthIcon className="size-4" />
            ) : null}
          </div>
        </div>
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size={"icon"} variant={"ghost"}>
                <EllipsisIcon />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Turn on notifications</DropdownMenuItem>
              <DropdownMenuItem>Turn off notifications</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {post.content && <div className="">{post.content.text}</div>}

        {post.type === "Photo" ? (
          <AspectRatio ratio={1 / 1}>
            <Image
              src={post.photo.url}
              layout="fill"
              objectFit="cover"
              alt={post.photo.id}
            />
          </AspectRatio>
        ) : post.type === "Video" ? (
          <video src={post.video.url} controls className="w-full" />
        ) : post.type === "Audio" ? (
          <audio src={post.audio.url} controls className="w-full" />
        ) : post.type === "File" ? (
          <div>{post.file.url}</div>
        ) : null}
      </CardContent>
      <CardFooter className="flex-col items-start">
        <div className="flex flex-col w-full items-start space-y-2">
          <Dialog>
            <DialogTrigger>
              <div className="flex items-center text-muted-foreground space-x-2 cursor-pointer">
                {
                  // Object.entries(reactionCount)
                  // .sort(([, countA], [, countB]) => countB - countA)
                  // .map(([emotionId, count]) => {
                  //   const emotion = emotions.find(
                  //     (e) => e.id === Number(emotionId),
                  //   );
                  //   return (
                  //     <div key={emotionId} className="flex items-center space-x-1">
                  //       <span className={`${emotion?.color}`}>{emotion?.icon}</span>
                  //       <span className="text-sm">{count}</span>
                  //     </div>
                  //   );
                  // })
                }
              </div>
            </DialogTrigger>
            <DialogContent className="w-full max-w-screen-md">
              <DialogHeader>
                <div className="flex items-center space-x-10">
                  <h3 className="text-xl text-blue-500 font-bold">Tất cả</h3>
                  <div className="flex items-center space-x-5">
                    {
                      // Object.entries(reactionCount || {})
                      // .sort(([, countA], [, countB]) => countB - countA)
                      // .map(([emotionId, count]) => {
                      //   const emotion = emotions.find(
                      //     (e) => e.id === Number(emotionId),
                      //   );
                      //   return (
                      //     <div key={emotionId} className="flex items-center">
                      //       <span className={`text-lg ${emotion?.color}`}>
                      //         {emotion?.icon}
                      //       </span>
                      //       <span className="font-bold text-lg">{count}</span>
                      //     </div>
                      //   );
                      // })
                    }
                  </div>
                </div>
              </DialogHeader>
              <div>Danh sách user ...</div>
            </DialogContent>
          </Dialog>

          <div className="flex w-full justify-between">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button className="w-full" variant={"ghost"}>
                  <ThumbsUpIcon />
                  Like
                </Button>
              </HoverCardTrigger>
              <HoverCardContent
                className="p-1 flex space-x-2 rounded-full bg-white shadow-lg border"
                align="center"
                sideOffset={8}
                style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
              >
                {
                  //   emotions.map((emotion) => (
                  //   <Button
                  //     key={emotion.id}
                  //     variant={"ghost"}
                  //     className={`p-2 rounded-full ${emotion.color}`}
                  //     onClick={() => handleEmotionClick(emotion)}
                  //   >
                  //     {emotion.icon}
                  //   </Button>
                  // ))
                }
              </HoverCardContent>
            </HoverCard>
            <Button className="w-full" variant={"ghost"}>
              <MessageCircleIcon />
              Comment
            </Button>
            <Button className="w-full" variant={"ghost"}>
              <ShareIcon />
              Share
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
