"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { IconNext, IconPrevious } from "@/src/shared/components/icons";
import { Button } from "@/src/shared/components/ui/button";

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
        disabled={!prevLesson}
        onClick={() => (prevLesson ? router.push(prevLesson) : null)}
      >
        <IconPrevious />
      </Button>
      <Button
        className="size-8 rounded-md border border-slate-200 flex items-center justify-center p-1.5 transition-all"
        disabled={!nextLesson}
        onClick={() => (nextLesson ? router.push(nextLesson) : null)}
      >
        <IconNext />
      </Button>
    </div>
  );
};

export default LessonNavigation;
