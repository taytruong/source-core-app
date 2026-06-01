"use client";

import React from "react";
import { IconPlay } from "../icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { createHistory } from "@/src/lib/actions/history.action";

const LessonItem = ({
  lesson,
  url,
  isActive = false,
  isChecked = false,
}: {
  lesson: {
    title: string;
    duration: number;
    course: string;
    _id: string;
  };
  url?: string;
  isActive?: boolean;
  isChecked?: boolean;
}) => {
  const handleCompleteLesson = async (checked: boolean | string) => {
    try {
      await createHistory({
        course: lesson.course,
        lesson: lesson._id,
        checked,
        path: url || "/",
      });
    } catch (error) {
      console.log("🚀 ~ handleCompleteLesson ~ error:", error);
    }
  };
  return (
    <div
      className={cn(
        "flex items-center gap-2 bg-white border border-slate-300 rounded-lg p-4 text-base font-medium ",
        isActive ? "text-primary underline underline-offset-4" : "",
      )}
    >
      {url && (
        <Checkbox
          defaultChecked={isChecked}
          className="shirk-0 size-3.5 text-slate-400"
          onCheckedChange={(checked) => handleCompleteLesson(checked)}
        />
      )}

      <IconPlay className="size-5 shrink-0" />
      {url ? (
        <Link
          href={url}
          className={cn("line-clamp-1", isActive && "pointer-events-none")}
        >
          {lesson.title}
        </Link>
      ) : (
        <h4 className="line-clamp-1">{lesson.title}</h4>
      )}
      <span className="ml-auto text-xs font-medium shrink-0">
        {lesson.duration} phút
      </span>
    </div>
  );
};

export default LessonItem;
