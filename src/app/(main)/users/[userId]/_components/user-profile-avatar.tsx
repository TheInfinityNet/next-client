import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CameraIcon } from "lucide-react";
import { useRef, type ChangeEvent } from "react";
import {useUploadAvatarMutation} from "@/hooks/mutations/upload-photo-profile.mutation";
import {useUploadPhotoMutation} from "@/lib/api/apis/upload-photo.api";
import {toast} from "@/hooks/use-toast";
import {mapFieldErrorToFormError} from "@/lib/utils";

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

  const onChangeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadPhotoMutation.mutate(
        {
          photo: file,
        },
        {
          onSuccess(data) {
            if (userProfile.avatar) {
              userProfile.avatar.url = data.url;
            }
            toast({
              title: "Success",
              description: "Photo uploaded successfully",
            });
            console.log("Photo uploaded successfully:", data);
          },
          onError(error) {
            toast({
              title: "Error",
              description: "Error uploading photo",
            });
            console.error("Error uploading photo:", error);
          },
        }
      );
    }
  };
  const uploadAvatarPhotoMutation = useUploadAvatarMutation();

    const handleUploadClick = () => {
        if (changeAvatarInputRef.current) {
            changeAvatarInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
