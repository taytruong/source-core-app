"use client";
import { lastLessonKey } from "@/src/shared/constants";
import React, { useEffect } from "react";

const LessonSaveUrl = ({ url, course }: { url: string; course: string }) => {
  useEffect(() => {
    let results: any[] =
      JSON.parse(localStorage?.getItem(lastLessonKey) || "[]") || [];
    const item = {
      course,
      lesson: url,
    };
    results = results.filter((el) => el.course !== course);
    results.push(item);
    localStorage?.setItem(lastLessonKey, JSON.stringify(results));
  }, [url, course]);
  return null;
};

export default LessonSaveUrl;
