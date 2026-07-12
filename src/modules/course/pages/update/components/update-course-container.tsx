'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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

import { useMutationUpdateCourse } from '../../../libs/react-query';
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
  const muatationUpdateCourse = useMutationUpdateCourse();
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
    const respone = await muatationUpdateCourse.mutateAsync({
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
              <FieldLabel>Course Name *</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                placeholder="Course Name"
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
              <FieldLabel>Slug</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                placeholder="course-name"
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
              <FieldLabel>Sale Price</FieldLabel>
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
              <FieldLabel>Original Price</FieldLabel>
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
              <FieldLabel>Course Description</FieldLabel>
              <Textarea
                {...field}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                className="h-63"
                placeholder="Enter course description ..."
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
              <FieldLabel>Course Image</FieldLabel>
              <>
                <div className="group relative flex h-63 items-center justify-center rounded-lg bg-white shadow-sm">
                  {imageWatch ? (
                    <>
                      <Image
                        fill
                        alt=""
                        className="h-full w-full rounded-lg object-cover"
                        src={imageWatch}
                      />

                      <div className="absolute inset-0 rounded-lg bg-black/30 opacity-0 transition-opacity duration-200 group-hover:opacity-60" />

                      <div className="absolute inset-0 mr-2 mb-2 flex items-end justify-end gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <button
                          className="bg-logo rounded-full p-3 text-white transition hover:scale-110"
                          type="button"
                          onClick={() => {
                            form.setValue('image', '');
                          }}
                        >
                          <Trash2 className="size-5" />
                        </button>
                      </div>
                    </>
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
              <FieldLabel>Intro URL</FieldLabel>
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
              <FieldLabel>Number of Views</FieldLabel>
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
              <FieldLabel>Status</FieldLabel>
              <Select
                defaultValue={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger size="lg">
                  <SelectValue placeholder="Status" />
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
              <FieldLabel>Level</FieldLabel>
              <Select
                defaultValue={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger size="lg">
                  <SelectValue placeholder="Level" />
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
                <span>Requirements</span>
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
                  placeholder={`Requirement ${index + 1}`}
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
                <span>Benefits</span>
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
                  placeholder={`Benefit ${index + 1}`}
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
        {/* <Controller
          control={form.control}
          name="info.qa"
          render={({ fieldState }) => (
            <Field
              className="col-start-1 col-end-3"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex items-center justify-between gap-5">
                <span>Questions & Answers</span>
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
                    placeholder={`Question ${index + 1}`}
                    value={item.question}
                    onChange={(event) => {
                      setCourseInfo((draft) => {
                        draft.qa[index].question = event.target.value;
                      });
                    }}
                  />
                  <Input
                    key={index}
                    placeholder={`Answer to Question ${index + 1}`}
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
        /> */}
      </div>
      <Button
        className="w-37.5"
        disabled={muatationUpdateCourse.isPending}
        isLoading={muatationUpdateCourse.isPending}
        type="submit"
        variant={'primary'}
      >
        Update Course
      </Button>
    </form>
  );
};

export default UpdateCourseContainer;
