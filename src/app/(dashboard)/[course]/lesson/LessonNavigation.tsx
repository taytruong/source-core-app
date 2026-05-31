"use client";

import { Button } from "@/components/ui/button";
import { IconArrowLeft } from "@/src/components/icons";
import IconArrowRight from "@/src/components/icons/IconArrowRight";
import { ILesson } from "@/src/database/lesson.md";
import { useRouter } from "next/navigation";
import React from "react";

const LessonNavigation = ({
  nextLesson,
  prevLesson,
}: {
  nextLesson: string;
  prevLesson: string;
}) => {
  const router = useRouter();

  return (
    <div className="flex gap-3">
      <Button
        className="size-8 rounded-md border border-slate-200 flex items-center justify-center p-1.5 transition-all"
        onClick={() => (!prevLesson ? null : router.push(prevLesson))}
        disabled={!prevLesson}
      >
        <IconArrowLeft />
      </Button>
      <Button
        className="size-8 rounded-md border border-slate-200 flex items-center justify-center p-1.5 transition-all"
        onClick={() => (!nextLesson ? null : router.push(nextLesson))}
        disabled={!nextLesson}
      >
        <IconArrowRight />
      </Button>
    </div>
  );
};

export default LessonNavigation;
