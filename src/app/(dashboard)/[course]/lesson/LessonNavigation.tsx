"use client";

import { Button } from "@/components/ui/button";
import { IconNext, IconPrevious } from "@/src/components/icons";

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
        <IconPrevious />
      </Button>
      <Button
        className="size-8 rounded-md border border-slate-200 flex items-center justify-center p-1.5 transition-all"
        onClick={() => (!nextLesson ? null : router.push(nextLesson))}
        disabled={!nextLesson}
      >
        <IconNext />
      </Button>
    </div>
  );
};

export default LessonNavigation;
