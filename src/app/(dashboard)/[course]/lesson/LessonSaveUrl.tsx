"use client";
import React, { useEffect } from "react";

import { lastLessonKey } from "@/src/shared/constants";

const LessonSaveUrl = ({ course, url }: { url: string; course: string }) => {
  useEffect(() => {
    let results: any[] =
      JSON.parse(localStorage?.getItem(lastLessonKey) || "[]") || [];
    const item = {
      course,
      lesson: url,
    };

    results = results.filter((element) => element.course !== course);
    results.push(item);
    localStorage?.setItem(lastLessonKey, JSON.stringify(results));
  }, [url, course]);

  return null;
};

export default LessonSaveUrl;
