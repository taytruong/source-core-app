"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import slugify from "slugify";

import { Button } from "@/src/shared/components/ui/button";

import {
  Field,
  FieldError,
  FieldLabel,
} from "@/src/shared/components/ui/field";
import { Input } from "@/src/shared/components/ui/input";
import { createCourse } from "@/src/lib/actions/course.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IUser } from "@/src/database/user.md";

const formSchema = z.object({
  title: z.string().min(10, "Tên khóa học ít nhất có 10 ký tự"),
  slug: z.string().optional(),
});

function CourseNewAdd({ user }: { user: IUser }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const data = {
        title: values.title,
        slug:
          values.slug ||
          slugify(values.title, {
            lower: true,
            locale: "vi",
          }),
        author: user._id,
      };
      const res = await createCourse(data);
      if (!res?.success) {
        toast.error(res?.message);
        return;
      }
      toast.success("Tạo khóa học thành công");
      if (res?.data) {
        router.push(`/manage/course/update?slug=${res.data.slug}`);
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
    console.log(values);
  }

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
      </div>
      <Button
        variant={"primary"}
        type="submit"
        isLoading={isSubmitting}
        className="w-30"
        disabled={isSubmitting}
      >
        Tạo khóa học
      </Button>
    </form>
  );
}
export default CourseNewAdd;
