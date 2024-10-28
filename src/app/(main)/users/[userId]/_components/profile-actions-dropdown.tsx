"use client";

import { Button } from "@/components/ui/button";
import {
  ActivityIcon,
  EllipsisIcon,
  FlagIcon,
  LockIcon,
  PenIcon,
  SearchIcon,
  UserPlusIcon,
  UserXIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { createGetProfileActionsQueryOptions } from "@/hooks/queries/get-profile-actions.query";
import { ActionGuard } from "@/components/layout/action-guard";
import { useState } from "react";

type ProfileActionsDropdownProps = {
  profileId: string;
};
export function ProfileActionsDropdown({
  profileId,
}: ProfileActionsDropdownProps) {
  const [open, setOpen] = useState(false);
  const { data: actions, isLoading } = useQuery(
    createGetProfileActionsQueryOptions({ profileId }, { enabled: open }),
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={() => setOpen(true)}>
        <Button size={"sm"} variant={"secondary"} className="ml-auto">
          <EllipsisIcon />
          <span className="sr-only">Actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <ActionGuard
          actions={actions}
          requiredActions={[
            "ProfilePostSearch",
            "ProfileDetailsUpdate",
            "ProfileActivityLog",
            "ProfileStatusLock",
            "ProfileReport",
            "ProfileDelete",
            "ProfileCreate",
          ]}
          loading={isLoading}
          loadingFallback={<DropdownMenuLabel>Loading...</DropdownMenuLabel>}
          fallback={<DropdownMenuLabel>No actions available</DropdownMenuLabel>}
        >
          <ActionGuard actions={actions} requiredActions={"ProfilePostSearch"}>
            <DropdownMenuItem>
              <SearchIcon />
              Search
            </DropdownMenuItem>
          </ActionGuard>
          <ActionGuard
            actions={actions}
            requiredActions={"ProfileDetailsUpdate"}
          >
            <DropdownMenuItem>
              <PenIcon />
              Edit Profile
            </DropdownMenuItem>
          </ActionGuard>
          <ActionGuard actions={actions} requiredActions={"ProfileActivityLog"}>
            <DropdownMenuItem>
              <ActivityIcon />
              Activity Log
            </DropdownMenuItem>
          </ActionGuard>
          <ActionGuard actions={actions} requiredActions={"ProfileStatusLock"}>
            <DropdownMenuItem>
              <LockIcon />
              Lock Profile
            </DropdownMenuItem>
          </ActionGuard>
          <ActionGuard actions={actions} requiredActions={"ProfileReport"}>
            <DropdownMenuItem>
              <FlagIcon />
              Report Profile
            </DropdownMenuItem>
          </ActionGuard>
          <ActionGuard actions={actions} requiredActions={"ProfileDelete"}>
            <DropdownMenuItem>
              <UserXIcon />
              Delete Profile
            </DropdownMenuItem>
          </ActionGuard>
          <ActionGuard actions={actions} requiredActions={"ProfileCreate"}>
            <DropdownMenuItem>
              <UserPlusIcon />
              Create another profile
            </DropdownMenuItem>
          </ActionGuard>
        </ActionGuard>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
