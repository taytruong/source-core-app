/* eslint-disable simple-import-sort/imports */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@tinymce/tinymce-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import { updateLesson } from '@/src/modules/lesson/actions';
import { Button } from '@/src/shared/components/ui/button';
import {
  Field,
  FieldError,
  FieldLabel,
} from '@/src/shared/components/ui/field';
import { Input } from '@/src/shared/components/ui/input';
import { editorOptions } from '@/src/shared/constants';
import { LessonItemData } from '@/src/shared/types';

const formSchema = z.object({
  slug: z.string().optional(),
  duration: z.number().optional(),
  video_url: z.string().optional(),
  content: z.string().optional(),
});

interface UpdateContentLessonItemProps {
  lesson: LessonItemData;
}

const UpdateContentLessonItem = ({ lesson }: UpdateContentLessonItemProps) => {
  const editorRef = useRef<unknown>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: lesson.slug,
      duration: lesson.duration,
      video_url: lesson.video_url,
      content: lesson.content,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const respone = await updateLesson({
        lessonId: lesson._id.toString(),
        updateData: values,
      });

      if (respone?.success) {
        toast.success('Cập nhật tập này thành công!');
      }
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
    } finally {
    }
  }

  const { theme } = useTheme();

  return (
    <div>
      <form
        id="form-rhf-demo"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-8">
          <Controller
            control={form.control}
            name="slug"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Đường dẫn</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="bai-1-tong-quan"
                />
                {!!fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="duration"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Thời lượng</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  onChange={(event) =>
                    field.onChange(Number(event.target.value))
                  }
                />
                {!!fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="video_url"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Video URL</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="https://youtube.com/XYZ"
                />
                {!!fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div />
          <Controller
            control={form.control}
            name="content"
            render={({ field, fieldState }) => {
              return (
                <Field
                  className="col-start-1 col-end-3"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel>Nội dung</FieldLabel>
                  <Editor
                    licenseKey="gpl"
                    tinymceScriptSrc="/tinymce/tinymce.min.js"
                    value={field.value || ''}
                    onInit={(_event, editor) => {
                      (editorRef.current = editor).setContent(
                        lesson.content || '',
                      );
                    }}
                    {...editorOptions(field, theme)}
                  />
                  {!!fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-5">
          <Button
            className="w-full"
            type="submit"
          >
            Cập nhật
          </Button>
          <Link
            className="flexCenter rounded-md border border-slate-600 text-sm text-slate-600"
            href="/"
          >
            Xem trước
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateContentLessonItem;
