"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { cn } from "@/lib/utils";
import { createComment } from "@/src/modules/comment/services/comment.actions";
import { Button } from "@/src/shared/components/ui/button";
import { Field, FieldError } from "@/src/shared/components/ui/field";
import { Textarea } from "@/src/shared/components/ui/textarea";
import { ICommentItem } from "@/src/types";

interface CommentFormProps {
  userId: string;
  lessonId: string;
  comment?: ICommentItem;
  isReply?: boolean;
  closeReply?: () => void;
}

const formSchema = z.object({
  content: z
    .string({
      message: "Vui lòng nhập vào bình luận",
    })
    .min(10, { message: "Bình luận ít nhất 10 ký tự" }),
});

const CommentForm = ({
  closeReply,
  comment,
  isReply,
  lessonId,
  userId,
}: CommentFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const slug = useSearchParams().get("slug");
  const path = `${pathname}?slug=${slug}`;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const newComment = await createComment({
        content: values.content,
        lesson: lessonId,
        user: userId,
        level: comment && comment?.level >= 0 ? comment.level + 1 : 0,
        parentId: comment?._id.toString(),
        path,
      });

      if (!newComment) {
        toast.error("Đã comment thất bại");

        return;
      }
      toast.success("Đã comment thành công");
      form.setValue("content", "");
      closeReply?.();
    });
  }

  return (
    <>
      <form
        autoComplete="off"
        className="flex flex-col gap-5 relative"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Controller
          control={form.control}
          name="content"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Textarea
                placeholder="Comment vào đây nhen ..."
                className={cn("min-h-37.5", {
                  "bg-gray-50": isReply,
                })}
                {...field}
              />
              {!!fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button
          isLoading={isPending}
          type="submit"
          variant="primary"
          className={cn("w-35 ml-auto rounded-lg h-10", {
            "w-24": isReply,
          })}
        >
          {isReply ? "Trả lời" : "Đăng bình luận"}
        </Button>
      </form>
    </>
  );
};

export default CommentForm;
