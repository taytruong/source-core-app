"use client";
import React from "react";
import LessonNavigation from "../LessonNavigation";
import useGlobalStore from "@/src/store";
import { Button } from "@/components/ui/button";

const VideoPlayer = ({
  videoId,
  nextLesson,
  prevLesson,
}: {
  videoId: string | undefined;
  nextLesson: string;
  prevLesson: string;
}) => {
  const { expandedPlayer, setExpandedPlayer } = useGlobalStore();
  return (
    <>
      <div className="relative mb-5 aspect-video">
        <iframe
          className="w-full h-full object-fill rounded-xl"
          src={`https://www.youtube.com/embed/${videoId}`}
        ></iframe>
      </div>
      <div className="flex items-center justify-between mb-5">
        <LessonNavigation nextLesson={nextLesson} prevLesson={prevLesson} />
        <Button onClick={() => setExpandedPlayer(!expandedPlayer)}>
          {expandedPlayer ? "Mặc định" : "Chế độ rạp chiếu"}
        </Button>
      </div>
    </>
  );
};

export default VideoPlayer;
