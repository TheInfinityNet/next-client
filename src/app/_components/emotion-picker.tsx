"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

type Emotion = {
  id: number;
  label: string;
  icon: string;
  color: string;
};

const emotions: Emotion[] = [
  { id: 1, label: "Like", icon: "👍", color: "text-blue-500" },
  { id: 2, label: "Haha", icon: "😂", color: "text-yellow-500" },
  { id: 3, label: "Love", icon: "❤️", color: "text-red-500" },
];

type EmotionPickerProps = {
  initialEmotion?: Emotion | null;
  onEmotionChange?: (emotion: Emotion) => void;
};

export default function EmotionPicker({
  initialEmotion = null,
  onEmotionChange,
}: EmotionPickerProps) {
  const [currentEmotion, setCurrentEmotion] = useState<Emotion | null>(
    initialEmotion
  );

  const handleEmotionClick = (emotion: Emotion) => {
    setCurrentEmotion(emotion);
    if (onEmotionChange) {
      onEmotionChange(emotion);
    }
  };

  return (
    <div className="flex gap-2">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button
            variant={"ghost"}
            className={`rounded-full ${currentEmotion?.color || "text-gray-500"}`}
          >
            {currentEmotion?.icon || "😶"}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex space-x-2">
            {emotions.map((emotion) => (
              <Button
                key={emotion.id}
                onClick={() => handleEmotionClick(emotion)}
                className={`rounded-full p-2 ${emotion.color}`}
              >
                {emotion.icon}
              </Button>
            ))}
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
