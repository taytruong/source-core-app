"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createCourse, updateCourse } from "@/src/lib/actions/course.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { ECourseLevel, ECourseStatus } from "@/src/types/enum";
import { ICourse } from "@/src/database/course.md";
import { useImmer } from "use-immer";
import { IconAdd } from "../icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { courseLevel, courseStatus } from "@/src/constanst";
import { UploadButton } from "@/src/utils/uploadthing";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(10, "Tên khóa học ít nhất có 10 ký tự"),
  slug: z.string().optional(),
  price: z.number().int().positive().optional(),
  sale_price: z.number().int().positive().optional(),
  intro_url: z.string().optional(),
  desc: z.string().optional(),
  image: z.string().optional(),
  views: z.number().int().optional(),
  status: z
    .enum([
      ECourseStatus.APPROVED,
      ECourseStatus.PENDING,
      ECourseStatus.REJECTED,
    ])
    .optional(),
  level: z
    .enum([
      ECourseLevel.BEGINNER,
      ECourseLevel.INTERMEDIATE,
      ECourseLevel.ADVANCED,
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

const CourseUpdate = ({ data }: { data: ICourse }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [courseInfo, setCourseInfo] = useImmer({
    requirements: data.info.requirements,
    benefits: data.info.benefits,
    qa: data.info.qa,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data.title,
      slug: data.slug,
      price: data.price,
      sale_price: data.sale_price,
      intro_url: data.intro_url,
      desc: data.desc,
      image: data.image,
      status: data.status,
      level: data.level,
      views: data.views,
      info: {
        requirements: data.info.requirements,
        benefits: data.info.benefits,
        qa: data.info.qa,
      },
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log("🚀 ~ onSubmit ~ values:", values);
    try {
      const res = await updateCourse({
        slug: data.slug,
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
      if (values.slug != data.slug) {
        router.replace(`/manage/course/update?slug=${values.slug}`);
      }
      if (res?.success) {
        toast.success(res.message);
      }
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const imageWatch = form.watch("image")
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-8 mt-10 mb-6">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Tên khóa học *</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="Tên khóa học"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="slug"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Đường dẫn khóa học</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="khoa-hoc-lap-trinh"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="price"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Giá khuyến mãi</FieldLabel>
              <Input
                {...field}
                type="number"
                placeholder="599.000"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="sale_price"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Giá gốc</FieldLabel>
              <Input
                {...field}
                type="number"
                placeholder="999.000"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="desc"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Mô tả chi tiết khóa học</FieldLabel>
              <Textarea
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="Nhập mô tả ..."
                autoComplete="off"
                className="h-50"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="image"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Ảnh bìa</FieldLabel>
              <>
                <div className="h-50 bg-white rounded border border-gray-200 flex items-center justify-center relative">
                  {!imageWatch ? (


                    <UploadButton
                      endpoint="imageUploader"
                      className="
                              ut-button:flex
                              ut-button:h-11
                              ut-button:w-full
                              ut-button:items-center
                              ut-button:justify-center
                              ut-button:rounded-xl

                              ut-button:px-5
                              ut-button:text-sm
                              ut-button:font-medium
                              ut-button:whitespace-nowrap
                              ut-button:text-white

                              ut-allowed-content:mt-2
                              ut-allowed-content:text-xs
                              ut-allowed-content:text-gray-500
                            "
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        form.setValue("image", res[0].ufsUrl)
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        console.error(`ERROR! ${error.message}`);
                      }}
                    />
                  ) : <Image alt="" src={imageWatch} fill className="w-full h-full object-cover" />}
                </div>

              </>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="intro_url"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Đường dẫn khóa học</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="https://www.youtube.com/watch?=abcxyz"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="views"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Số lượt xem</FieldLabel>
              <Input
                {...field}
                placeholder="1000"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="status"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Trạng thái</FieldLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {courseStatus.map((status) => (
                      <SelectItem value={status.value} key={status.value} className={status.className}>{status.title}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="level"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Trình độ</FieldLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Trình độ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {courseLevel.map((level) => (
                      <SelectItem value={level.value} key={level.value}>{level.title}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="info.requirements"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="flex items-center justify-between gap-5">
                <span>Yêu cầu</span>
                <button
                  className="text-primary"
                  onClick={() => {
                    setCourseInfo((draft) => {
                      draft.requirements.push(" ");
                    });
                  }}
                  type="button"
                >
                  <IconAdd className="size-5" />
                </button>
              </FieldLabel>
              {courseInfo.requirements.map((r, index) => (
                <Input
                  value={r}
                  key={index}
                  placeholder={`Yêu cầu số ${index + 1}`}
                  onChange={(e) => {
                    setCourseInfo((draft) => {
                      draft.requirements[index] = e.target.value;
                    });
                  }}
                />
              ))}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="info.benefits"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="flex items-center justify-between gap-5">
                <span>Lợi ích</span>
                <button
                  className="text-primary"
                  onClick={() => {
                    setCourseInfo((draft) => {
                      draft.benefits.push(" ");
                    });
                  }}
                  type="button"
                >
                  <IconAdd className="size-5" />
                </button>
              </FieldLabel>
              {courseInfo.benefits.map((r, index) => (
                <Input
                  value={r}
                  key={index}
                  placeholder={`Lợi ích số ${index + 1}`}
                  onChange={(e) => {
                    setCourseInfo((draft) => {
                      draft.benefits[index] = e.target.value;
                    });
                  }}
                />
              ))}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="info.qa"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="col-start-1 col-end-3">
              <FieldLabel className="flex items-center justify-between gap-5">
                <span>Hỏi đáp</span>
                <button
                  className="text-primary"
                  onClick={() => {
                    setCourseInfo((draft) => {
                      draft.qa.push({
                        question: "",
                        answer: "",
                      });
                    });
                  }}
                  type="button"
                >
                  <IconAdd className="size-5" />
                </button>
              </FieldLabel>
              {courseInfo.qa.map((item, index) => (
                <div className="grid grid-cols-2 gap-5" key={index}>
                  <Input
                    value={item.question}
                    key={index}
                    placeholder={`Câu hỏi số ${index + 1}`}
                    onChange={(e) => {
                      setCourseInfo((draft) => {
                        draft.qa[index].question = e.target.value;
                      });
                    }}
                  />
                  <Input
                    value={item.answer}
                    key={index}
                    placeholder={`Câu trả lời của câu hỏi số ${index + 1}`}
                    onChange={(e) => {
                      setCourseInfo((draft) => {
                        draft.qa[index].answer = e.target.value;
                      });
                    }}
                  />
                </div>
              ))}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <Button
        variant={"primary"}
        type="submit"
        isLoading={isSubmitting}
        className="w-37.5"
        disabled={isSubmitting}
      >
        Cập nhật khóa học
      </Button>
    </form >
  );
};

export default CourseUpdate;
