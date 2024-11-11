import { z } from 'zod';

// Schema phản hồi của API lấy thông tin nhóm
export const GetGroupProfileResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(), // Loại nhóm (ví dụ: nhóm công khai, nhóm kín)
  membersCount: z.number(), // Số lượng thành viên
  createdDate: z.string(), // Ngày tạo nhóm (định dạng ngày tháng)
  visibility: z.string(), // Tính khả dụng nhóm (public, private, v.v.)
  privacy: z.string(), // Cài đặt quyền riêng tư nhóm (ví dụ: chỉ thành viên mới xem được)
  activityStatus: z.object({
    newPostStatus: z.string().optional(), // Trạng thái bài đăng mới (ví dụ: "No new post today")
    monthlyPostCount: z.number().optional(), // Số lượng bài đăng trong tháng
  }).nullable(),
  coverImage: z.string().nullable(), // Ảnh bìa nhóm
  members: z.array(z.object({
    id: z.string(), // ID của thành viên
    name: z.string(), // Tên của thành viên
    avatar: z.string(), // Avatar của thành viên
  })),
});

// Schema cho tham số truy vấn khi lấy thông tin nhóm
export const GetGroupProfileParamsSchema = z.object({
  groupId: z.string(),
});

// Schema phản hồi lỗi khi lấy thông tin nhóm
export const GetGroupProfileErrorResponseSchema = z.object({
  message: z.string(),
});

// Các tham số tùy chọn cho truy vấn nhóm
export const GetGroupProfileQueriesSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

// Các loại để sử dụng trong ứng dụng
export type GetGroupProfileResponse = z.infer<typeof GetGroupProfileResponseSchema>;
export type GetGroupProfileParams = z.infer<typeof GetGroupProfileParamsSchema>;
export type GetGroupProfileQueries = z.infer<typeof GetGroupProfileQueriesSchema>;
export type GetGroupProfileErrorResponse = z.infer<typeof GetGroupProfileErrorResponseSchema>;
