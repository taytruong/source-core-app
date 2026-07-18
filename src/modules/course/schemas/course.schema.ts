import z from 'zod';

export const CourseCommentFormSchema = z.object({
  content: z
    .string({
      message: 'Please enter a comment',
    })
    .min(10, { message: 'Comment must be at least 10 characters long' }),
});

export const CourseCreateSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters long'),
  slug: z.string().optional(),
});

export const UpdateContentLessonFormSchema = z.object({
  slug: z.string().optional(),
  duration: z.number().optional(),
  video_url: z.string().optional(),
  content: z.string().optional(),
});
