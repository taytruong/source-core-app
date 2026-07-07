'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { createComment } from '@/src/modules/comment/actions';
import { CourseCommentFormSchema } from '@/src/modules/course/schemas';
import { CourseCommentFormValues } from '@/src/modules/course/types';
import { Button } from '@/src/shared/components/ui/button';
import { Field, FieldError } from '@/src/shared/components/ui/field';
import { Textarea } from '@/src/shared/components/ui/textarea';
import { useUserContext } from '@/src/shared/contexts';
import { CommentItemData } from '@/src/shared/types';
import { cn } from '@/src/shared/utils';

interface CommentFormProps {
  lessonId: string;
  comment?: CommentItemData;
  isReply?: boolean;
  closeReply?: () => void;
}

const CommentForm = ({
  closeReply,
  comment,
  isReply,
  lessonId,
}: CommentFormProps) => {
  const { userInfo } = useUserContext();
  const userId = userInfo?._id.toString() || '';

  const commentForm = useForm<CourseCommentFormValues>({
    resolver: zodResolver(CourseCommentFormSchema),
    defaultValues: {},
  });

  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const slug = useSearchParams().get('slug');
  const path = `${pathname}?slug=${slug}`;

  async function onSubmit(values: CourseCommentFormValues) {
    const hasComment = await createComment({
      content: values.content,
      lesson: lessonId,
      user: userId,
      level: comment && comment?.level >= 0 ? comment.level + 1 : 0,
      parentId: comment?._id.toString(),
      path,
    });

    startTransition(() => {
      if (!hasComment) {
        toast.error('Đã comment thất bại');

        return;
      }
      toast.success('Đã comment thành công');
      commentForm.setValue('content', '');
      closeReply?.();
    });
  }

  return (
    <>
      <form
        autoComplete="off"
        className="relative flex flex-col gap-5"
        onSubmit={commentForm.handleSubmit(onSubmit)}
      >
        <Controller
          control={commentForm.control}
          name="content"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Textarea
                placeholder="Comment vào đây nhen ..."
                className={cn('min-h-37.5', {
                  'bg-gray-50': isReply,
                })}
                {...field}
              />
              {!!fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Button
          isLoading={isPending}
          type="submit"
          variant="primary"
          className={cn('ml-auto h-10 w-35 rounded-lg', {
            'w-24': isReply,
          })}
        >
          {isReply ? 'Trả lời' : 'Đăng bình luận'}
        </Button>
      </form>
    </>
  );
};

export default CommentForm;
