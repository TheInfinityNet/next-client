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
import { createGetGroupActionsQueryOptions } from "@/hooks/queries/get-group-actions.query";
import { ActionGuard } from "@/components/layout/action-guard";

export type GroupCoverPhotoProps = {
  groupId: string;
  url?: string;
  alt?: string;
};
export function GroupCoverPhoto({
  groupId,
  url,
  alt,
}: GroupCoverPhotoProps) {
  const groupActionsQuery = useQuery(
    createGetGroupActionsQueryOptions({
      groupId,
    }),
  );
  const actions = groupActionsQuery.data;

  return (
    <section aria-label="Group cover image">
      <AspectRatio ratio={3 / 1} className="relative">
        {url ? (
          <Image
            className="object-cover w-full h-full -z-10"
            src={url}
            width={600}
            height={200}
            alt={alt || `Group cover photo`}
          />
        ) : (
          <div className="w-full h-full bg-accent-foreground/10" />
        )}
        <ActionGuard
          actions={actions}
          requiredActions={[
            "GroupCoverPhotoUpload",
            "GroupCoverPhotoDelete",
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
                requiredActions={["GroupCoverPhotoUpload"]}
              >
                <DropdownMenuItem>
                  <PencilIcon />
                  Upload Cover Photo
                </DropdownMenuItem>
              </ActionGuard>
              <ActionGuard
                actions={actions}
                requiredActions={["GroupCoverPhotoDelete"]}
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
