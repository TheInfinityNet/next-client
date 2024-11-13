"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { EarthIcon, EllipsisIcon, MessageCircleIcon, ShareIcon, ThumbsUpIcon } from "lucide-react";

type Emotion = {
  id: number;
  label: string;
  icon: string;
  color: string;
};

const emotions: Emotion[] = [
  { id: 1, label: "Like", icon: "👍", color: "text-blue-500" },
  { id: 2, label: "Love", icon: "❤️", color: "text-red-500" },
  { id: 3, label: "Haha", icon: "😂", color: "text-yellow-500" },
  { id: 4, label: "Wow", icon: "😮", color: "text-orange-500" },
  { id: 5, label: "Sad", icon: "😢", color: "text-gray-500" },
  { id: 6, label: "Angry", icon: "😡", color: "text-red-600" },
];

export default function PostCard() {
  const [reactionCount, setReactionCount] = useState<{ [key: number]: number }>({});
  const [modalOpen, setModalOpen] = useState(false);

  const handleLikeClick = () => {
    // Mặc định tăng 1 like
    setReactionCount((prev) => ({
      ...prev,
      1: (prev[1] || 0) + 1, // ID 1 là "Like"
    }));
  };

  const handleEmotionClick = (emotion: Emotion) => {
    // Tăng cảm xúc tương ứng
    setReactionCount((prev) => ({
      ...prev,
      [emotion.id]: (prev[emotion.id] || 0) + 1,
    }));
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
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
        <p>Content</p>
        <p>Image, Video, Shared Post, Multimedia, None</p>
      </CardContent>
      <CardFooter className="flex-col items-start">
        <div className="flex flex-col w-full items-start space-y-2">
          <div
            onClick={openModal}
            className="flex items-center text-muted-foreground space-x-2 cursor-pointer"
          >
            {Object.entries(reactionCount)
                .sort(([, countA], [, countB]) => countB - countA)
                .map(([emotionId, count]) => {
                    const emotion = emotions.find((e) => e.id === Number(emotionId));
                    return (
                    <div key={emotionId} className="flex items-center space-x-1">
                        <span className={`${emotion?.color}`}>{emotion?.icon}</span>
                        <span className="text-sm">{count}</span>
                    </div>
                    );
            })}
          </div>

          <div className="flex w-full justify-between">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  className="w-full"
                  variant={"ghost"}
                  onClick={handleLikeClick}
                >
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
                {emotions.map((emotion) => (
                  <Button
                    key={emotion.id}
                    variant={"ghost"}
                    className={`p-2 rounded-full ${emotion.color}`}
                    onClick={() => handleEmotionClick(emotion)}
                  >
                    {emotion.icon}
                  </Button>
                ))}
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

      {modalOpen && (
        <Dialog open={true} onOpenChange={closeModal}>
          <DialogContent className="w-[600px] h-[600px]">
            <DialogHeader>
              <div className="flex items-center space-x-10">
                <h3 className="text-xl text-blue-500 font-bold">Tất cả</h3>
                <div className="flex items-center space-x-5">
                  {Object.entries(reactionCount || {})
                    .sort(([, countA], [, countB]) => countB - countA)
                    .map(([emotionId, count]) => {
                      const emotion = emotions.find((e) => e.id === Number(emotionId));
                      return (
                        <div key={emotionId} className="flex items-center">
                          <span className={`text-lg ${emotion?.color}`}>{emotion?.icon}</span>
                          <span className="font-bold text-lg">{count}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </DialogHeader>
            <div>Danh sách user ...</div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}
