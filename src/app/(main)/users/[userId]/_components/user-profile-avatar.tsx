import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUploadPhotoMutation } from "@/lib/api/apis/upload-photo.api";
import { CameraIcon } from "lucide-react";
import { useRef } from "react";
import {useUploadAvatarMutation} from "@/hooks/mutations/upload-photo-profile.mutation";

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
}: UserProfileAvatarProps) {
  const { toast } = useToast();
  const changeAvatarInputRef = useRef<HTMLInputElement>(null);

  const uploadPhotoMutation = useUploadPhotoMutation();
  const uploadAvatarPhotoMutation = useUploadAvatarMutation();

    const onChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (!files) return;

        const fileArray = Array.from(files);

        fileArray.forEach((file) => {
            if (file.type.startsWith("image/")) {
                uploadPhotoMutation.mutate(
                    { photo: file },
                    {
                        onSuccess: (data) => {
                            toast({
                                title: "Upload avatar succeeded"
                            });
                            uploadAvatarPhotoMutation.mutate(
                                { photoId: data.id },
                                {
                                    onSuccess: (data) => {
                                        toast({
                                            title: "Upload avatar succeeded"
                                        });
                                    },
                                    onError: (error) => {
                                        toast({
                                            title: "Upload avatar failed",
                                            description: error.message,
                                        });
                                    },
                                },
                            );
                        },
                        onError: (error) => {
                            toast({
                                title: "Upload avatar failed",
                                description: error.message,
                            });
                        },
                    },
                );
            }
        });
    };

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
        onClick={() => changeAvatarInputRef.current?.click()}
      >
        <CameraIcon className="w-4 h-4" />
        <span className="sr-only">Change Avatar</span>
      </Button>
      <input
        type="file"
        className="hidden"
        ref={changeAvatarInputRef}
        onChange={onChangeAvatar}
      />
    </div>
  );
}
