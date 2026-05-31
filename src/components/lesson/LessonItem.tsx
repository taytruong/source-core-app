import React from "react";
import { IconPlay } from "../icons";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LessonItem = ({
  lesson,
  url,
  isActive,
}: {
  lesson: {
    title: string;
    duration: number;
  };
  url?: string;
  isActive?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 bg-white border border-slate-300 rounded-lg p-4 text-base font-medium ",
        isActive ? "text-primary pointer-events-none" : "",
      )}
    >
      <IconPlay className="size-5 shrink-0" />
      {url ? (
        <Link href={url} className="line-clamp-1">
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
