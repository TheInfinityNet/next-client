"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
type ProfileFriendsSummaryPreviewProps = {
  userId: string;
};

export function ProfileFriendsSummaryPreview({
  userId,
}: ProfileFriendsSummaryPreviewProps) {
  return (
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
  );
}
