"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

type Comment = {
  id: number;
  author: string;
  avatarUrl: string;
  content: string;
  timeAgo: string;
};

type CommentListProps = {
  comments: Comment[];
};

export default function CommentList({ comments }: CommentListProps) {
  const [reactionCounts, setReactionCounts] = useState<{ [commentId: number]: { [key: number]: number } }>({});
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);

  const handleEmotionClick = (commentId: number, emotion: Emotion) => {
    setReactionCounts((prev) => ({
      ...prev,
      [commentId]: {
        ...(prev[commentId] || {}),
        [emotion.id]: (prev[commentId]?.[emotion.id] || 0) + 1,
      },
    }));
  };

  const totalReactions = Object.values(reactionCounts).reduce((total, commentReactions) => {
    return total + Object.values(commentReactions).reduce((sum, count) => sum + count, 0);
  }, 0);

  const openModal = (commentId: number) => {
    setSelectedCommentId(commentId);
  };

  const closeModal = () => {
    setSelectedCommentId(null);
  };

  return (
    <div className="w-full space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="w-full flex gap-x-2">
          <Avatar>
            <AvatarImage src={comment.avatarUrl} alt={comment.author} />
            <AvatarFallback>{comment.author[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex-col rounded-xl bg-gray-500 text-white p-2">
              <div className="font-bold">{comment.author}</div>
              <p>{comment.content}</p>
            </div>
            <div className="flex justify-between items-center text-muted-foreground text-sm mt-1">
              <div className="flex gap-x-3">
                <Button variant={"link"} className="p-0 text-muted-foreground">
                  {comment.timeAgo}
                </Button>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant={"link"} className="p-0 text-muted-foreground">
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
                        className={`p-2 text-lg rounded-full ${emotion.color}`}
                        onClick={() => handleEmotionClick(comment.id, emotion)}
                      >
                        {emotion.icon}
                      </Button>
                    ))}
                  </HoverCardContent>
                </HoverCard>
                <Button variant={"link"} className="p-0 text-muted-foreground">
                  Reply
                </Button>
              </div>
              {Object.values(reactionCounts[comment.id] || {}).reduce((a, b) => a + b, 0) > 0 && (
                <div
                    className="flex items-center space-x-1 text-sm cursor-pointer"
                    onClick={() => openModal(comment.id)}
                >
                    <span className="font-bold">
                    {Object.values(reactionCounts[comment.id] || {}).reduce((a, b) => a + b, 0)}
                    </span>
                    <div className="flex space-x-[-8px]">
                    {Object.entries(reactionCounts[comment.id] || {})
                        .sort(([, countA], [, countB]) => countB - countA) // Sắp xếp theo số lượng giảm dần
                        .map(([emotionId]) => {
                        const emotion = emotions.find((e) => e.id === Number(emotionId));
                        return (
                            <span
                            key={emotionId}
                            className={`rounded-full p-1 ${emotion?.color} bg-white border border-gray-200`}
                            >
                            {emotion?.icon}
                            </span>
                        );
                        })}
                    </div>
                </div>
                )}

            </div>
          </div>
        </div>
      ))}

        {selectedCommentId !== null && (
        <Dialog open={true} onOpenChange={closeModal}>
            <DialogContent className="w-[600px] h-[600px]">
            <DialogHeader>
                <div className="flex items-center space-x-10">
                    <h3 className="text-xl text-blue-500 font-bold">Tất cả</h3>
                    <div className="flex items-center space-x-5">
                        {Object.entries(reactionCounts[selectedCommentId] || {})
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
            <div>
                Danh sách user ...
            </div>
            </DialogContent>
        </Dialog>
        )}

    </div>
  );
}
