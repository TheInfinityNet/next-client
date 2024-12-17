"use client"

import {PostComposer} from "@/app/_components/post-composer";
import {ProfilePostList} from "@/app/_components/profile-post-list";
import {useParams} from "next/navigation";

export default function UserProfilePostsPage() {
    const { userId } = useParams<{ userId: string }>();
  return (
    <>
      <section aria-label="Post composer"><PostComposer /></section>
      <section aria-label="Posts management profile view">

      </section>
        <section aria-label="Posts list">
            <ProfilePostList profileId={userId} />
        </section>
    </>
  );
}
