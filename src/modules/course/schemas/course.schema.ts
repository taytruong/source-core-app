import z from 'zod';

export const CourseCommentFormSchema = z.object({
  content: z
    .string({
      message: 'Vui lòng nhập vào bình luận',
    })
    .min(10, { message: 'Bình luận ít nhất 10 ký tự' }),
});

export const CourseCreateSchema = z.object({
  title: z.string().min(10, 'Tên khóa học phải có ít nhất 10 ký tự'),
  slug: z.string().optional(),
});
