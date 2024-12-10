"use client";

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
import {
  EarthIcon,
  EllipsisIcon,
  MessageCircleIcon,
  ShareIcon,
} from "lucide-react";
import { PostResponseSchema } from "@/lib/api/schemas/post.schema";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PostReactionButton } from "./post-reaction-button";
import { createContext, useContext, useState } from "react";
import { PostReactionTypeSchema } from "@/lib/api/schemas/post-reaction.schema";
import { PostReactionCounts } from "./post-reaction-counts";
import { CommentList } from "./comment-list";
import {PostActionsDropdown} from "@/app/_components/post-actions-dropdown";
import {CommentDialog} from "@/app/_components/comment-form";

type PostCardProps = {
  post: PostResponseSchema;
};

type ReactionContextType = {
  reactionCounts: Partial<Record<PostReactionTypeSchema, number>>;
  setReactionCounts: (
    reactionCounts: Partial<Record<PostReactionTypeSchema, number>>,
  ) => void;
  reaction?: PostReactionTypeSchema | null;
  setReaction: (reaction?: PostReactionTypeSchema) => void;
};

export const ReactionContext = createContext<ReactionContextType | undefined>(
  undefined,
);

export function ReactionProvider({
  children,
  initialReactionCounts = {},
  initialReaction,
}: {
  children: React.ReactNode;
  initialReactionCounts?: Partial<Record<PostReactionTypeSchema, number>>;
  initialReaction?: PostReactionTypeSchema;
}) {
  const [reactionCounts, setReactionCounts] = useState(initialReactionCounts);
  const [reaction, setReaction] = useState(initialReaction);
  return (
    <ReactionContext.Provider
      value={{
        reactionCounts,
        setReactionCounts,
        reaction,
        setReaction,
      }}
    >
      {children}
    </ReactionContext.Provider>
  );
}

export function useReaction() {
  const context = useContext(ReactionContext);
  if (context === undefined) {
    throw new Error("useReaction must be used within a ReactionProvider");
  }
  return context;
}

export function PostCard({ post }: PostCardProps) {
  const [isCommentDialogOpen, setCommentDialogOpen] = useState(false);

  return (
      <>
    <ReactionProvider
      initialReactionCounts={post.reactionCounts}
      initialReaction={post.reaction}
    >
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
              {post.audience.type === "Public" ? (
                <EarthIcon className="size-4" />
              ) : post.audience.type === "Friend" ? (
                <EarthIcon className="size-4" />
              ) : post.audience.type === "OnlyMe" ? (
                <EarthIcon className="size-4" />
              ) : post.audience.type === "Custom" ||
                post.audience.type === "Include" ||
                post.audience.type === "Exclude" ? (
                <EarthIcon className="size-4" />
              ) : null}
            </div>
          </div>
          <div className="ml-auto">
            <PostActionsDropdown postId={post.id} />
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
          ) : post.type === "Share" ? (
            <div>
              <PostCard post={post.share} />
            </div>
          ) : post.type === "MultiMedia" ? (
            <div
              className={cn("grid", {
                "grid-cols-2 gap-2": post.aggregates.length >= 2,
                "[&>*:nth-child(3)]:col-span-2": post.aggregates.length === 3,
              })}
            >
              {post.aggregates.slice(0, 4).map((aggregate, index) => (
                <Link
                  key={aggregate.id}
                  className="relative"
                  href={`/posts/${aggregate.id}`}
                >
                  {aggregate.type === "Photo" ? (
                    <AspectRatio ratio={1 / 1}>
                      <Image
                        src={aggregate.photo.url}
                        layout="fill"
                        objectFit="cover"
                        alt={aggregate.photo.id}
                      />
                    </AspectRatio>
                  ) : aggregate.type === "Video" ? (
                    <AspectRatio
                      ratio={
                        post.aggregates.length === 3 && index === 2
                          ? 2 / 1
                          : 1 / 1
                      }
                      className="bg-muted-foreground"
                    >
                      <video
                        src={aggregate.video.url}
                        controls
                        className="w-full h-full"
                      />
                    </AspectRatio>
                  ) : null}
                  {post.aggregates.length > 4 && index === 3 && (
                    <Button
                      variant={"ghost"}
                      className="absolute top-0 left-0 right-0 bottom-0 w-full h-full rounded-none"
                    >
                      View more
                    </Button>
                  )}
                </Link>
              ))}
            </div>
          ) : null}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-x-2">
              <PostReactionCounts postId={post.id} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start">
          <div className="flex flex-col w-full items-start space-y-2">
            <div className="flex w-full justify-between">
              <PostReactionButton postId={post.id} />
              <Button
                  className="w-full"
                  variant={"ghost"}
                  onClick={() => setCommentDialogOpen(true)}
              >
                <MessageCircleIcon />
                Comment
              </Button>
              <Button className="w-full" variant={"ghost"}>
                <ShareIcon />
                Share
              </Button>
            </div>
          </div>

          <CommentList postId={post.id} />
        </CardFooter>
      </Card>
    </ReactionProvider>

        {/* Dialog Nhập Bình Luận */}
        {isCommentDialogOpen && (
            <CommentDialog
                postId={post.id}
                onClose={() => setCommentDialogOpen(false)}
            />
        )}
        </>
  );
}
