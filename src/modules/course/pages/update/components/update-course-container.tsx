'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useImmer } from 'use-immer';
import * as z from 'zod';

import { IconAdd } from '@/src/shared/components/icons';
import { Button } from '@/src/shared/components/ui/button';
import {
  Field,
  FieldError,
  FieldLabel,
} from '@/src/shared/components/ui/field';
import { Input } from '@/src/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/shared/components/ui/select';
import { Textarea } from '@/src/shared/components/ui/textarea';
import {
  CourseLevel,
  courseLevel,
  CourseStatus,
  courseStatus,
} from '@/src/shared/constants';
import { UploadButton } from '@/src/shared/utils';

import { updateCourse } from '../../../actions';
import { CourseItemData } from '../../../types';

const formSchema = z.object({
  title: z.string().min(10, 'Tên khóa học ít nhất có 10 ký tự'),
  slug: z.string().optional(),
  price: z.number().int().positive().optional(),
  sale_price: z.number().int().positive().optional(),
  intro_url: z.string().optional(),
  desc: z.string().optional(),
  image: z.string().optional(),
  views: z.number().int().optional(),
  status: z
    .enum([CourseStatus.APPROVED, CourseStatus.PENDING, CourseStatus.REJECTED])
    .optional(),
  level: z
    .enum([
      CourseLevel.BEGINNER,
      CourseLevel.INTERMEDIATE,
      CourseLevel.ADVANCED,
    ])
    .optional(),
  info: z.object({
    requirements: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
    qa: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .optional(),
  }),
});

interface UpdateCourseContainerProps {
  course: CourseItemData;
}

const UpdateCourseContainer = ({ course }: UpdateCourseContainerProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [courseInfo, setCourseInfo] = useImmer({
    requirements: course.info.requirements,
    benefits: course.info.benefits,
    qa: course.info.qa,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title,
      slug: course.slug,
      price: course.price,
      sale_price: course.sale_price,
      intro_url: course.intro_url,
      desc: course.desc,
      image: course.image,
      status: course.status,
      level: course.level,
      views: course.views,
      info: {
        requirements: course.info.requirements,
        benefits: course.info.benefits,
        qa: course.info.qa,
      },
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const respone = await updateCourse({
        slug: course.slug,
        updateData: {
          title: values.title,
          slug: values.slug,
          price: values.price,
          sale_price: values.sale_price,
          intro_url: values.intro_url,
          desc: values.desc,
          views: values.views,
          info: {
            requirements: courseInfo.requirements,
            benefits: courseInfo.benefits,
            qa: courseInfo.qa,
          },
          status: values.status,
          level: values.level,
          image: values.image,
        },
      });

      if (values.slug != course.slug) {
        router.replace(`/manage/course/update?slug=${values.slug}`);
      }
      if (respone?.success) {
        toast.success(respone.message);
      }
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const imageWatch = form.watch('image');

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

        <Controller
          control={form.control}
          name="price"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Giá khuyến mãi</FieldLabel>
              <Input
                {...field}
                placeholder="599.000"
                type="number"
                onChange={(event) => field.onChange(Number(event.target.value))}
              />
              {!!fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="sale_price"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Giá gốc</FieldLabel>
              <Input
                {...field}
                placeholder="999.000"
                type="number"
                onChange={(event) => field.onChange(Number(event.target.value))}
              />
              {!!fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="desc"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Mô tả chi tiết khóa học</FieldLabel>
              <Textarea
                {...field}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                className="h-63"
                placeholder="Nhập mô tả ..."
              />
              {!!fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="image"
          render={({ fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Ảnh bìa</FieldLabel>
              <>
                <div className="relative flex h-63 items-center justify-center rounded border border-gray-200 bg-white">
                  {imageWatch ? (
                    <Image
                      fill
                      alt=""
                      className="h-full w-full rounded-md object-cover"
                      src={imageWatch}
                    />
                  ) : (
                    <UploadButton
                      className="ut-button:flex ut-button:h-11 ut-button:w-full ut-button:items-center ut-button:justify-center ut-button:rounded-xl ut-button:px-5 ut-button:text-sm ut-button:font-medium ut-button:whitespace-nowrap ut-button:text-white ut-allowed-content:mt-2 ut-allowed-content:text-xs ut-allowed-content:text-gray-500"
                      endpoint="imageUploader"
                      onClientUploadComplete={(respone) => {
                        // Do something with the response
                        form.setValue('image', respone[0].ufsUrl);
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        console.error(`ERROR! ${error.message}`);
                      }}
                    />
                  )}
                </div>
              </>
              {!!fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="intro_url"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Đường dẫn khóa học</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                placeholder="https://www.youtube.com/watch?=abcxyz"
              />
              {!!fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="views"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Số lượt xem</FieldLabel>
              <Input
                {...field}
                placeholder="1000"
                onChange={(event) => field.onChange(Number(event.target.value))}
              />
              {!!fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="status"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Trạng thái</FieldLabel>
              <Select
                defaultValue={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger size="lg">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {courseStatus.map((status) => (
                      <SelectItem
                        key={status.value}
                        className={status.className}
                        value={status.value}
                      >
                        {status.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {!!fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="level"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Trình độ</FieldLabel>
              <Select
                defaultValue={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger size="lg">
                  <SelectValue placeholder="Trình độ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {courseLevel.map((level) => (
                      <SelectItem
                        key={level.value}
                        value={level.value}
                      >
                        {level.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {!!fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="info.requirements"
          render={({ fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="flex items-center justify-between gap-5">
                <span>Yêu cầu</span>
                <button
                  className="text-primary"
                  type="button"
                  onClick={() => {
                    setCourseInfo((draft) => {
                      draft.requirements.push(' ');
                    });
                  }}
                >
                  <IconAdd className="size-5" />
                </button>
              </FieldLabel>
              {courseInfo.requirements.map((r, index) => (
                <Input
                  key={index}
                  placeholder={`Yêu cầu số ${index + 1}`}
                  value={r}
                  onChange={(event) => {
                    setCourseInfo((draft) => {
                      draft.requirements[index] = event.target.value;
                    });
                  }}
                />
              ))}
              {!!fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="info.benefits"
          render={({ fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="flex items-center justify-between gap-5">
                <span>Lợi ích</span>
                <button
                  className="text-primary"
                  type="button"
                  onClick={() => {
                    setCourseInfo((draft) => {
                      draft.benefits.push(' ');
                    });
                  }}
                >
                  <IconAdd className="size-5" />
                </button>
              </FieldLabel>
              {courseInfo.benefits.map((r, index) => (
                <Input
                  key={index}
                  placeholder={`Lợi ích số ${index + 1}`}
                  value={r}
                  onChange={(event) => {
                    setCourseInfo((draft) => {
                      draft.benefits[index] = event.target.value;
                    });
                  }}
                />
              ))}
              {!!fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="info.qa"
          render={({ fieldState }) => (
            <Field
              className="col-start-1 col-end-3"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex items-center justify-between gap-5">
                <span>Hỏi đáp</span>
                <button
                  className="text-primary"
                  type="button"
                  onClick={() => {
                    setCourseInfo((draft) => {
                      draft.qa.push({
                        question: '',
                        answer: '',
                      });
                    });
                  }}
                >
                  <IconAdd className="size-5" />
                </button>
              </FieldLabel>
              {courseInfo.qa.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 gap-5"
                >
                  <Input
                    key={index}
                    placeholder={`Câu hỏi số ${index + 1}`}
                    value={item.question}
                    onChange={(event) => {
                      setCourseInfo((draft) => {
                        draft.qa[index].question = event.target.value;
                      });
                    }}
                  />
                  <Input
                    key={index}
                    placeholder={`Câu trả lời của câu hỏi số ${index + 1}`}
                    value={item.answer}
                    onChange={(event) => {
                      setCourseInfo((draft) => {
                        draft.qa[index].answer = event.target.value;
                      });
                    }}
                  />
                </div>
              ))}
              {!!fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </div>
      <Button
        className="w-37.5"
        disabled={isSubmitting}
        isLoading={isSubmitting}
        type="submit"
        variant={'primary'}
      >
        Cập nhật khóa học
      </Button>
    </form>
  );
};

export default UpdateCourseContainer;
