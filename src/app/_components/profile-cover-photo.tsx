import React, { useRef } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CameraIcon, PencilIcon, TrashIcon } from "lucide-react";
import { createGetProfileActionsQueryOptions } from "@/hooks/queries/get-profile-actions.query";
import { ActionGuard } from "@/components/layout/action-guard";
import {useUploadPhotoMutation} from "@/lib/api/apis/upload-photo.api";
import {useUploadAvatarMutation, useUploadCoverMutation} from "@/hooks/mutations/upload-photo-profile.mutation";
import {toast} from "@/hooks/use-toast";

export type ProfileCoverPhotoProps = {
  profileId: string;
  url?: string;
  alt?: string;
};
export function ProfileCoverPhoto({
  profileId,
  url,
  alt,
}: ProfileCoverPhotoProps) {
  const profileActionsQuery = useQuery(
    createGetProfileActionsQueryOptions({
      profileId,
    })
  );
  const actions = profileActionsQuery.data;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadPhotoMutation = useUploadPhotoMutation();
  const uploadCoverPhotoMutation = useUploadCoverMutation();

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
                  title: "Upload cover succeeded"
                });
                uploadCoverPhotoMutation.mutate(
                    { photoId: data.id },
                    {
                      onSuccess: (data) => {
                        toast({
                          title: "Upload cover succeeded"
                        });
                      },
                      onError: (error) => {
                        toast({
                          title: "Upload cover failed",
                          description: error.message,
                        });
                      },
                    },
                );
              },
              onError: (error) => {
                toast({
                  title: "Upload cover failed",
                  description: error.message,
                });
              },
            },
        );
      }
    });
  };

  return (
    <section aria-label="Profile cover image">
      <AspectRatio ratio={3 / 1} className="relative">
        {url ? (
          <Image
            className="object-cover w-full h-full -z-10"
            src={url}
            width={600}
            height={200}
            alt={alt || `Profile cover photo`}
          />
        ) : (
          <div className="w-full h-full bg-accent-foreground/10" />
        )}
        <ActionGuard
          actions={actions}
          requiredActions={[
            "ProfileCoverPhotoUpload",
            "ProfileCoverPhotoDelete",
          ]}
          condition="ANY"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="absolute bottom-2 right-2">
                <CameraIcon />
                <span className="sr-only">Edit Cover Photo</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <ActionGuard
                actions={actions}
                requiredActions={["ProfileCoverPhotoUpload"]}
              >
                <DropdownMenuItem onClick={handleUploadClick}>
                  <PencilIcon />
                  Upload Cover Photo
                </DropdownMenuItem>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </ActionGuard>
              <ActionGuard
                actions={actions}
                requiredActions={["ProfileCoverPhotoDelete"]}
              >
                <DropdownMenuItem asChild>
                  <AlertDialog>
                    <AlertDialogTrigger
                      asChild
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                      onSelect={(event) => {
                        event.preventDefault();
                      }}
                    >
                      <DropdownMenuItem>
                        <TrashIcon />
                        Delete Cover Photo
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete this photo?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuItem>
              </ActionGuard>
            </DropdownMenuContent>
          </DropdownMenu>
        </ActionGuard>
      </AspectRatio>
    </section>
  );
}
