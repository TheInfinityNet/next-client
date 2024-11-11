// src/app/(main)/posts/[postId]/page.tsx

import { Suspense } from 'react';
import {PostCard} from './_components/post-layout';

export default function PostPage({ params }: { params: { postId: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostCard postId={params.postId}>
        <h2>đây là post</h2>
        <p>Post ID: {params.postId}</p>
      </PostCard>
    </Suspense>
  );
}