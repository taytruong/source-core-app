"use client";
import { ILesson } from "@/src/database/lesson.md";
import React, { useEffect, useRef } from "react";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/src/shared/components/ui/field";
import { Input } from "@/src/shared/components/ui/input";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/src/shared/components/ui/button";
import Link from "next/link";
import { updateLesson } from "@/src/lib/actions/lesson.action";
import { toast } from "sonner";
import { Editor } from "@tinymce/tinymce-react";
import { editorOptions } from "@/src/shared/constants";
import { useTheme } from "next-themes";

const formSchema = z.object({
  slug: z.string().optional(),
  duration: z.number().optional(),
  video_url: z.string().optional(),
  content: z.string().optional(),
});

const LessonItemUpdate = ({ lesson }: { lesson: ILesson }) => {
  const editorRef = useRef<any>(null);
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
    console.log("🚀 ~ onSubmit ~ values:", values);
    try {
      const res = await updateLesson({
        lessonId: lesson._id.toString(),
        updateData: values,
      });
      if (res?.success) {
        toast.success("Cập nhật tập này thành công!");
      }
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    } finally {
    }
  }

  const { theme } = useTheme();
  return (
    <div>
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-8">
          <Controller
            name="slug"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Đường dẫn</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="bai-1-tong-quan"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="duration"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Thời lượng</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="video_url"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Video URL</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="https://youtube.com/XYZ"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div></div>
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => {
              return (
                <Field
                  data-invalid={fieldState.invalid}
                  className="col-start-1 col-end-3"
                >
                  <FieldLabel>Nội dung</FieldLabel>
                  <Editor
                    tinymceScriptSrc="/tinymce/tinymce.min.js"
                    licenseKey="gpl"
                    value={field.value || ""}
                    onInit={(_evt, editor) => {
                      (editorRef.current = editor).setContent(
                        lesson.content || "",
                      );
                    }}
                    {...editorOptions(field, theme)}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-5 mt-8">
          <Button type="submit" className="w-full">
            Cập nhật
          </Button>
          <Link
            href="/"
            className="text-sm text-slate-600 border border-slate-600 rounded-md flexCenter"
          >
            Xem trước
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LessonItemUpdate;
