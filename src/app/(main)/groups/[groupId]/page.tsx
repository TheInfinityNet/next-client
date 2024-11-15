import { Suspense } from 'react'
import { GroupProfileLayout } from './_components/group-layout'

export default function GroupPage({ params }: { params: { groupId: string } }) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Trang nhóm</h2>
      <p>Đây là nội dung chính của nhóm {params.groupId}.</p>
    </div>
  );
}