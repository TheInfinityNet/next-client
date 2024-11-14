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
import PostCard from '../_components/post-card';
import CommentList from '../_components/comment-list';

export default function Home() {
  const comments = [
    {
      id: 1,
      author: "Tuan Hao",
      avatarUrl: "https://via.placeholder.com/150",
      content: "Great post! Thanks for sharing.",
      timeAgo: "1 hour ago",
    },
    {
      id: 2,
      author: "Minh Anh",
      avatarUrl: "https://via.placeholder.com/150",
      content: "Really helpful content!",
      timeAgo: "2 hours ago",
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <PostCard />
      <CommentList comments={comments} />
    </div>
  );
}
