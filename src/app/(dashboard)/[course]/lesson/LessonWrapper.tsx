"use client";
import useGlobalStore from "@/src/store";
import React from "react";

const LessonWrapper = ({ children }: { children: React.ReactNode }) => {
  const { expandedPlayer } = useGlobalStore();
  return (
    <div
      className="grid xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-10 min-h-screen items-start"
      style={{
        display: expandedPlayer ? "block" : "grid",
      }}
    >
      {children}
    </div>
  );
};

export default LessonWrapper;
