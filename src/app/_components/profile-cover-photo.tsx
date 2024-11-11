import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CameraIcon, PencilIcon, TrashIcon } from "lucide-react";
import { createGetProfileActionsQueryOptions } from "@/hooks/queries/get-profile-actions.query";
import { ActionGuard } from "@/components/layout/action-guard";

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
    }),
  );
  const actions = profileActionsQuery.data;

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
                <DropdownMenuItem>
                  <PencilIcon />
                  Upload Cover Photo
                </DropdownMenuItem>
              </ActionGuard>
              <ActionGuard
                actions={actions}
                requiredActions={["ProfileCoverPhotoDelete"]}
              >
                <DropdownMenuItem>
                  <TrashIcon />
                  Delete Cover Photo
                </DropdownMenuItem>
              </ActionGuard>
            </DropdownMenuContent>
          </DropdownMenu>
        </ActionGuard>
      </AspectRatio>
    </section>
  );
}
