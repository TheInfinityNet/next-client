import { Smile } from 'lucide-react';
import { Camera } from 'lucide-react';
import { ImagePlay } from 'lucide-react';
import { Drama } from 'lucide-react';
import { Sticker } from 'lucide-react';
import { PostComposer } from "../_components/post-composer";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BellMinusIcon,
  BellPlusIcon,
  EarthIcon,
  EllipsisIcon,
  FlagIcon,
  MessageCircleIcon,
  ShareIcon,
  SquareMinusIcon,
  SquarePlusIcon,
  ThumbsUpIcon,
  UserPlusIcon,
  UserRoundXIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { link } from "fs";

export default function Home() {
  return (
    <div>
      <Card>
        <CardHeader className="flex-row space-y-0 gap-x-2">
          <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div className="font-bold">Nguyen Minh Tuan</div>
            <div className="flex text-muted-foreground text-sm items-center gap-x-1">
              <div className="font-semibold">5 hours ago</div>
              <EarthIcon className="size-4" />
            </div>
          </div>
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-full"
                  size={"icon"}
                  variant={"ghost"}
                >
                  <EllipsisIcon />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <BellPlusIcon />
                  Turn on notifications for this post
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BellMinusIcon />
                  Turn off notifications for this post
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <SquareMinusIcon />
                  Unfollow Tuan
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SquarePlusIcon />
                  Follow Tuan
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FlagIcon />
                  Report
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserRoundXIcon />
                  {`Block Tuan's profile`}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserPlusIcon />
                  {`Unblock Tuan's profile`}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <p>Content</p>
          <p>Image, Video, Shared Post, Multimedia, None</p>
        </CardContent>
        <CardFooter className="flex-col items-start">
          <div className="flex w-full justify-between">
            <div className="flex gap-x-2">
              <div className="flex">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant={"ghost"}
                      className="size-6 bg-yellow-500 border-background border-2 border-solid rounded-full p-0 h-fit"
                    >
                      Haha
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <ul>
                      <li>Nguyen Minh Tuan</li>
                      <li>Nguyen Minh Tuan</li>
                      <li>Nguyen Minh Tuan</li>
                      <li>Nguyen Minh Tuan</li>
                      <li>Nguyen Minh Tuan</li>
                      <li>Nguyen Minh Tuan</li>
                      <li>and 733 more…</li>
                    </ul>
                  </HoverCardContent>
                </HoverCard>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant={"ghost"}
                      className="size-6 bg-yellow-500 border-background border-2 border-solid rounded-full -ml-2 p-0 h-fit"
                    >
                      Haha
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <ul>
                      <li>Nguyen Minh Tuan</li>
                      <li>Nguyen Minh Tuan</li>
                      <li>Nguyen Minh Tuan</li>
                      <li>Nguyen Minh Tuan</li>
                      <li>Nguyen Minh Tuan</li>
                      <li>Nguyen Minh Tuan</li>
                      <li>and 733 more…</li>
                    </ul>
                  </HoverCardContent>
                </HoverCard>

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant={"ghost"}
                      className="size-6 bg-yellow-500 border-background border-2 border-solid rounded-full -ml-2 p-0 h-fit"
                    >
                      Haha
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <ul>
                      <li>Nguyen Minh Tuan</li>
                      <li>Nguyen Minh Tuan</li>
                      <li>Nguyen Minh Tuan</li>
                      <li>Nguyen Minh Tuan</li>
                      <li>Nguyen Minh Tuan</li>
                      <li>Nguyen Minh Tuan</li>
                      <li>and 733 more…</li>
                    </ul>
                  </HoverCardContent>
                </HoverCard>
              </div>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant={"link"} className="p-0 h-fit">
                    999
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <ul>
                    <li>Nguyen Minh Tuan</li>
                    <li>Nguyen Minh Tuan</li>
                    <li>Nguyen Minh Tuan</li>
                    <li>Nguyen Minh Tuan</li>
                    <li>Nguyen Minh Tuan</li>
                    <li>Nguyen Minh Tuan</li>
                    <li>and 733 more…</li>
                  </ul>
                </HoverCardContent>
              </HoverCard>
            </div>
            <div className="space-x-2">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant={"link"} className="p-0 h-fit">
                    18 comments
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <ul>
                    <li>Nguyen Minh Tuan</li>
                    <li>Nguyen Minh Tuan</li>
                    <li>Nguyen Minh Tuan</li>
                    <li>Nguyen Minh Tuan</li>
                    <li>Nguyen Minh Tuan</li>
                    <li>Nguyen Minh Tuan</li>
                    <li>and 733 more…</li>
                  </ul>
                </HoverCardContent>
              </HoverCard>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant={"link"} className="p-0 h-fit">
                    300 Shares
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <ul>
                    <li>Nguyen Minh Tuan</li>
                    <li>Nguyen Minh Tuan</li>
                    <li>Nguyen Minh Tuan</li>
                    <li>Nguyen Minh Tuan</li>
                    <li>Nguyen Minh Tuan</li>
                    <li>Nguyen Minh Tuan</li>
                    <li>and 733 more…</li>
                  </ul>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
          <div className="flex w-full gap-x-2 border-y-muted-foreground border-y py-1">
            <Button className="w-full" variant={"ghost"}>
              <ThumbsUpIcon />
              Like
            </Button>
            <Button className="w-full" variant={"ghost"}>
              <MessageCircleIcon />
              Comment
            </Button>
            <Button className="w-full" variant={"ghost"}>
              <ShareIcon />
              Share
            </Button>
          </div>
          <div className="w-full">
            <Button className="hover:no-underline px-0" variant={"link"}>
              Xem thêm bình luận
            </Button>
          </div>
          <div className="w-full flex gap-x-1">
            <div>

              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1">
              <div className="flex-col rounded-xl bg-gray-500 text-white p-2">
                <div className="font-bold">tuan hao</div>
                comment content comment content
                comment content comment content
                comment content comment content
                comment content comment content
              </div>
              <div className="item-center flex justify-between text-muted-foreground text-sm">
                <div className="flex justify-start flex-1 gap-x-3">
                  <Button variant={"link"} className="text-muted-foreground p-0">1 hour</Button>
                  <Button variant={"link"} className="text-muted-foreground p-0">like</Button>
                  <Button variant={"link"} className="text-muted-foreground p-0">response</Button>
                  <Button variant={"link"} className="text-muted-foreground p-0">share</Button>
                </div>
                <div className="flex gap-x-2 items-center">
                  <div>
                    733
                  </div>
                  <div className="">

                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className="size-6 bg-yellow-500 border-background border-2 border-solid rounded-full p-0 h-fit"
                        >
                          Haha
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <ul>
                          <li>Nguyen Minh Tuan</li>
                          <li>Nguyen Minh Tuan</li>
                          <li>Nguyen Minh Tuan</li>
                          <li>Nguyen Minh Tuan</li>
                          <li>Nguyen Minh Tuan</li>
                          <li>Nguyen Minh Tuan</li>
                          <li>and 733 more…</li>
                        </ul>
                      </HoverCardContent>
                    </HoverCard>

                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className="size-6 bg-yellow-500 border-background border-2 border-solid rounded-full -ml-2 p-0 h-fit"
                        >
                          Haha
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <ul>
                          <li>Nguyen Minh Tuan</li>
                          <li>Nguyen Minh Tuan</li>
                          <li>Nguyen Minh Tuan</li>
                          <li>Nguyen Minh Tuan</li>
                          <li>Nguyen Minh Tuan</li>
                          <li>Nguyen Minh Tuan</li>
                          <li>and 733 more…</li>
                        </ul>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex gap-x-1">
            <div>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 relative">
              <Input type="text" placeholder="Comment as Nguyen Minh Tuan" className="rounded-full" />
              <div className="absolute top-0 right-0 flex items-center justify-end gap-x-1 h-full mx-2">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant={"ghost"} className="size-6 rounded-full my-auto">
                      <Sticker />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="rounded-xl shadow-md w-fit">
                    <div className="text-sm text-muted-foreground">
                      comment with avatar sticker
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant={"ghost"} className="size-6 rounded-full my-auto">
                      <Smile />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="rounded-xl shadow-md w-fit">
                    <div className="text-sm text-muted-foreground">
                      comment with emote
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant={"ghost"} className="size-6 rounded-full my-auto">
                      <Camera />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="rounded-xl shadow-md w-fit">
                    <div className="text-sm text-muted-foreground">
                      comment with photo or video
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <HoverCard>
                  <HoverCardTrigger asChild>

                    <Button variant={"ghost"} className="size-6 rounded-full my-auto">
                      <ImagePlay />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="rounded-xl shadow-md w-fit">
                    <div className="text-sm text-muted-foreground">
                      comment with gif file
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant={"ghost"} className="size-6 rounded-full my-auto">
                      <Drama />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="rounded-xl shadow-md w-fit">
                    <div className="text-sm text-muted-foreground">
                      comment with sticker
                    </div>
                  </HoverCardContent>
                </HoverCard>

              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
