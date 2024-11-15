export default function GroupPosts({ params }: { params: { groupId: string } }) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Thảo luận</h2>
      <p>Đây là nội dung của trang Thảo luận cho nhóm {params.groupId}.</p>
    </div>
  )
}