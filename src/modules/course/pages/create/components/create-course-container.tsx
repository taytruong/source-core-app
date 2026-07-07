'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import slugify from 'slugify';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/src/shared/components/ui/button';
import {
  Field,
  FieldError,
  FieldLabel,
} from '@/src/shared/components/ui/field';
import { Input } from '@/src/shared/components/ui/input';
import { useUserContext } from '@/src/shared/contexts';

import { createCourse } from '../../../actions';

const formSchema = z.object({
  title: z.string().min(10, 'Tên khóa học ít nhất có 10 ký tự'),
  slug: z.string().optional(),
});

function CreateCourseContainer() {
  const { userInfo } = useUserContext();

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!userInfo) return;
    setIsSubmitting(true);
    try {
      const data = {
        title: values.title,
        slug:
          values.slug ||
          slugify(values.title, {
            lower: true,
            locale: 'vi',
          }),
        author: userInfo?._id,
      };
      const respone = await createCourse(data);

      if (!respone?.success) {
        toast.error(respone?.message);

        return;
      }
      toast.success('Tạo khóa học thành công');
      if (respone?.data) {
        router.push(`/manage/course/update?slug=${respone.data.slug}`);
      }
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
    } finally {
      setIsSubmitting(false);
    }
    console.log(values);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="mt-10 mb-6 grid grid-cols-2 gap-8">
        <Controller
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Tên khóa học *</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                placeholder="Tên khóa học"
              />
              {!!fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="slug"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Đường dẫn khóa học</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                placeholder="khoa-hoc-lap-trinh"
              />
              {!!fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </div>
      <Button
        className="w-30"
        disabled={isSubmitting}
        isLoading={isSubmitting}
        type="submit"
        variant={'primary'}
      >
        Tạo khóa học
      </Button>
    </form>
  );
}
export default CreateCourseContainer;
