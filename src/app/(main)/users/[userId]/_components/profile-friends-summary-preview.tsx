"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {useGetUserProfileQuery} from "@/hooks/queries/get-profile-friends-summary";
type ProfileFriendsSummaryPreviewProps = {
  userId: string;
};

export function ProfileFriendsSummaryPreview({
                                                 userId,
                                             }: ProfileFriendsSummaryPreviewProps) {
    // Fetch friend avatars from query
    const { data, isLoading } = useGetUserProfileQuery({ userId });
    const friendAvatars = data?.items ??[];
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="font-bold" aria-label="Friends count">
                {friendAvatars?.length || 0} friends
            </div>
            <div className="flex mr-2" aria-label="Friend avatars">
                {friendAvatars?.slice(0, 8).map((friend, index) => (
                    <div key={friend.id || index} className="h-10 w-8">
                        <Avatar className="size-10">
                            <AvatarImage
                                src={friend.avatar?.url || "https://via.placeholder.com/40"}
                                alt={`${friend.name || "Friend"}'s avatar`}
                            />
                            <AvatarFallback>{friend.name || "?"}</AvatarFallback>
                        </Avatar>
                    </div>
                ))}
            </div>
        </div>
    );
}

