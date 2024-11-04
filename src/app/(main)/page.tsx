import { PostComposer } from "../_components/post-composer";
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
          <div className="flex w-full">
            <div className="mr-auto flex gap-x-2">
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
            <div>comment counts</div>
            <div>share counts</div>
          </div>
          <div className="flex w-full gap-x-2">
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
          <div>List popular commments in this post</div>
          <div>CommentComposer</div>
        </CardFooter>
      </Card>
    </div>
  );
}
