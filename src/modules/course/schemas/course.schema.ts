import z from 'zod';

export const CourseCommentFormSchema = z.object({
  content: z
    .string({
      message: 'Vui lòng nhập vào bình luận',
    })
    .min(10, { message: 'Bình luận ít nhất 10 ký tự' }),
});
