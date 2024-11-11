import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CameraIcon } from "lucide-react";
import { useRef } from "react";

type UserProfileAvatarProps = {
  userProfile: {
    avatar?: { url: string };
    name: string;
    username: string;
  };
  handleUploadClick: () => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function UserProfileAvatar({
  userProfile,
  handleUploadClick,
  handleFileChange,
}: UserProfileAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      <Avatar className="size-40">
        <AvatarImage
          src={userProfile.avatar?.url}
          className="object-cover"
          alt={`${userProfile.name} avatar`}
        />
        <AvatarFallback>
          {userProfile.username?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <Button
        className="absolute bottom-0 right-0 p-1 rounded-full"
        size={"icon"}
        onClick={handleUploadClick}
      >
        <CameraIcon className="w-4 h-4" />
        <span className="sr-only">Change Avatar</span>
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}
